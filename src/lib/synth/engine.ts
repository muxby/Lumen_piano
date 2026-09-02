import {
  type SynthParams,
  type Waveform,
  WAVE_GAIN,
  arpIntervalSec,
  cutoffHz,
  delaySeconds,
  detuneCents,
  envSeconds,
  lfoDepthHz,
  lfoHz,
  midiToFreq,
  resonanceQ,
  volumeGain,
} from "./notes";

const MAX_VOICES = 12;

type SourceNode = OscillatorNode | AudioBufferSourceNode;

type Voice = {
  midi: number;
  sources: SourceNode[];
  filter: BiquadFilterNode;
  env: GainNode;
};

function createAudioContext(): AudioContext {
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  return new Ctor({ latencyHint: "interactive" });
}

function isOscillator(node: SourceNode): node is OscillatorNode {
  return "frequency" in node;
}

export class SynthEngine {
  readonly ctx: AudioContext;
  readonly analyser: AnalyserNode;
  private readonly master: GainNode;
  private readonly compressor: DynamicsCompressorNode;
  private readonly voiceBus: GainNode;
  private readonly dry: GainNode;
  private readonly wet: GainNode;
  private readonly delay: DelayNode;
  private readonly feedback: GainNode;
  private readonly lfo: OscillatorNode;
  private readonly lfoDepth: GainNode;
  private readonly noiseBuffer: AudioBuffer;
  private readonly live = new Map<number, Voice>();
  private params: SynthParams;
  private visibilityHandler: (() => void) | null = null;
  private arpNotes: number[] = [];
  private arpIndex = 0;
  private arpTimer: number | null = null;
  private arpNext = 0;
  private arpSounding: number | null = null;
  private arpListeners = new Set<(midi: number | null) => void>();

  constructor(params: SynthParams) {
    this.params = params;
    this.ctx = createAudioContext();

    this.voiceBus = this.ctx.createGain();
    this.voiceBus.gain.value = 1;

    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -10;
    this.compressor.knee.value = 8;
    this.compressor.ratio.value = 3.5;
    this.compressor.attack.value = 0.004;
    this.compressor.release.value = 0.12;

    this.dry = this.ctx.createGain();
    this.wet = this.ctx.createGain();
    this.delay = this.ctx.createDelay(1);
    this.feedback = this.ctx.createGain();

    this.master = this.ctx.createGain();
    this.master.gain.value = volumeGain(params.volume);

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.45;

    this.lfo = this.ctx.createOscillator();
    this.lfo.type = "sine";
    this.lfo.frequency.value = lfoHz(params.lfoRate);
    this.lfoDepth = this.ctx.createGain();
    this.lfoDepth.gain.value = lfoDepthHz(params.lfoAmount);
    this.lfo.connect(this.lfoDepth);
    this.lfo.start();

    this.noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }

    this.voiceBus.connect(this.compressor);
    this.compressor.connect(this.dry);
    this.compressor.connect(this.delay);
    this.delay.connect(this.wet);
    this.delay.connect(this.feedback);
    this.feedback.connect(this.delay);
    this.dry.connect(this.master);
    this.wet.connect(this.master);
    this.master.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.applyFx(params, 0);

    this.visibilityHandler = () => {
      if (document.visibilityState === "visible") this.resume();
    };
    document.addEventListener("visibilitychange", this.visibilityHandler);
    window.addEventListener("focus", this.visibilityHandler);
  }

  /** Must be called synchronously inside a user gesture. */
  resume(): void {
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
  }

  subscribeArp(listener: (midi: number | null) => void): () => void {
    this.arpListeners.add(listener);
    listener(this.arpSounding);
    return () => {
      this.arpListeners.delete(listener);
    };
  }

  setParams(params: SynthParams): void {
    const arpWasOn = this.params.arp;
    this.params = params;
    const now = this.ctx.currentTime;
    this.applyFx(params, now);

    const hz = cutoffHz(params.cutoff);
    const q = resonanceQ(params.resonance);
    const cents = detuneCents(params.detune);
    for (const voice of this.live.values()) {
      voice.filter.type = params.filterType;
      voice.filter.frequency.setTargetAtTime(hz, now, 0.025);
      voice.filter.Q.setTargetAtTime(q, now, 0.025);
      voice.sources.forEach((source, index) => {
        const sign = index === 0 ? 1 : -1;
        if (isOscillator(source) && params.waveform !== "noise") {
          source.type = params.waveform;
          source.detune.setTargetAtTime(sign * cents, now, 0.03);
        }
      });
    }

    if (params.arp && this.arpNotes.length > 0) this.startArpClock();
    if (!params.arp && arpWasOn) this.stopArpClock(true);
  }

  setArpNotes(notes: number[]): void {
    this.arpNotes = [...notes];
    if (this.params.arp && this.arpNotes.length > 0) {
      this.startArpClock();
      return;
    }
    this.stopArpClock(true);
  }

  noteOn(midi: number, when?: number): void {
    this.resume();
    const startAt = when ?? this.ctx.currentTime;
    this.noteOff(midi, 0.01, startAt);

    if (this.live.size >= MAX_VOICES) {
      const oldest = this.live.keys().next().value;
      if (typeof oldest === "number") this.noteOff(oldest, 0.01, startAt);
    }

    const filter = this.ctx.createBiquadFilter();
    filter.type = this.params.filterType;
    filter.frequency.value = cutoffHz(this.params.cutoff);
    filter.Q.value = resonanceQ(this.params.resonance);

    const env = this.ctx.createGain();
    env.gain.value = 0;

    const cents = detuneCents(this.params.detune);
    const unison = cents > 0.4;
    const sources: SourceNode[] = [
      this.createSource(this.params.waveform, midi, unison ? cents : 0),
    ];
    if (unison) {
      sources.push(this.createSource(this.params.waveform, midi, -cents));
    }

    const peak =
      0.2 * WAVE_GAIN[this.params.waveform] * (unison ? 0.7 : 1);
    const attack = envSeconds(this.params.attack, 2);
    const decay = envSeconds(this.params.decay, 2.2);
    const sustain = peak * this.params.sustain;

    env.gain.cancelScheduledValues(startAt);
    env.gain.setValueAtTime(0, startAt);
    env.gain.linearRampToValueAtTime(peak, startAt + attack);
    env.gain.linearRampToValueAtTime(sustain, startAt + attack + decay);

    for (const source of sources) {
      source.connect(filter);
      try {
        source.start(startAt);
      } catch {
        /* already started */
      }
    }
    filter.connect(env);
    env.connect(this.voiceBus);
    this.lfoDepth.connect(filter.frequency);

    this.live.set(midi, { midi, sources, filter, env });
  }

  noteOff(midi: number, releaseOverride?: number, when?: number): void {
    const voice = this.live.get(midi);
    if (!voice) return;
    this.live.delete(midi);

    const at = when ?? this.ctx.currentTime;
    const release = releaseOverride ?? envSeconds(this.params.release, 3.2);
    const hold = Math.max(release, 0.01);

    try {
      voice.env.gain.cancelAndHoldAtTime(at);
    } catch {
      voice.env.gain.cancelScheduledValues(at);
      voice.env.gain.setValueAtTime(voice.env.gain.value, at);
    }
    voice.env.gain.linearRampToValueAtTime(0.0001, at + hold);

    for (const source of voice.sources) {
      try {
        source.stop(at + hold + 0.04);
      } catch {
        /* already stopped */
      }
    }

    const first = voice.sources[0];
    if (first) {
      first.onended = () => {
        try {
          this.lfoDepth.disconnect(voice.filter.frequency);
        } catch {
          /* already disconnected */
        }
        try {
          for (const source of voice.sources) source.disconnect();
          voice.filter.disconnect();
          voice.env.disconnect();
        } catch {
          /* already disconnected */
        }
      };
    }
  }

  allNotesOff(): void {
    this.stopArpClock(true);
    for (const midi of [...this.live.keys()]) {
      this.noteOff(midi, 0.04);
    }
  }

  dispose(): void {
    this.allNotesOff();
    this.stopArpClock(true);
    if (this.visibilityHandler) {
      document.removeEventListener("visibilitychange", this.visibilityHandler);
      window.removeEventListener("focus", this.visibilityHandler);
    }
    try {
      this.lfo.stop();
    } catch {
      /* already stopped */
    }
    void this.ctx.close();
  }

  private applyFx(params: SynthParams, now: number): void {
    this.master.gain.setTargetAtTime(volumeGain(params.volume), now, 0.03);
    this.delay.delayTime.setTargetAtTime(delaySeconds(params.delayTime), now, 0.04);
    this.feedback.gain.setTargetAtTime(params.delayFeedback * 0.86, now, 0.04);
    this.wet.gain.setTargetAtTime(params.delayMix * 0.7, now, 0.04);
    this.dry.gain.setTargetAtTime(1 - params.delayMix * 0.25, now, 0.04);
    this.lfo.frequency.setTargetAtTime(lfoHz(params.lfoRate), now, 0.05);
    this.lfoDepth.gain.setTargetAtTime(lfoDepthHz(params.lfoAmount), now, 0.05);
  }

  private createSource(waveform: Waveform, midi: number, cents: number): SourceNode {
    if (waveform === "noise") {
      const source = this.ctx.createBufferSource();
      source.buffer = this.noiseBuffer;
      source.loop = true;
      source.playbackRate.value = 2 ** (cents / 1200);
      return source;
    }
    const osc = this.ctx.createOscillator();
    osc.type = waveform;
    osc.frequency.value = midiToFreq(midi);
    osc.detune.value = cents + (Math.random() - 0.5) * 3;
    return osc;
  }

  private startArpClock(): void {
    if (this.arpTimer !== null) return;
    this.arpNext = this.ctx.currentTime;
    this.tickArp();
  }

  private stopArpClock(silence: boolean): void {
    if (this.arpTimer !== null) {
      window.clearTimeout(this.arpTimer);
      this.arpTimer = null;
    }
    if (silence && this.arpSounding !== null) {
      this.noteOff(this.arpSounding, 0.05);
      this.arpSounding = null;
      this.emitArp(null);
    }
  }

  private tickArp = (): void => {
    if (!this.params.arp || this.arpNotes.length === 0) {
      this.stopArpClock(true);
      return;
    }
    const now = this.ctx.currentTime;
    const horizon = now + 0.12;
    const step = arpIntervalSec(this.params.arpRate);
    while (this.arpNext < horizon) {
      if (this.arpNext >= now - 0.02) this.stepArp(this.arpNext);
      this.arpNext += step;
    }
    this.arpTimer = window.setTimeout(this.tickArp, 25);
  };

  private stepArp(when: number): void {
    const notes = this.arpNotes;
    if (notes.length === 0) return;
    const midi = this.nextArpMidi(notes);
    if (this.arpSounding !== null) this.noteOff(this.arpSounding, 0.04, when);
    this.noteOn(midi, when);
    this.arpSounding = midi;
    this.emitArp(midi);
  }

  private nextArpMidi(notes: number[]): number {
    const sorted = [...notes].sort((a, b) => a - b);
    const mode = this.params.arpMode;
    if (mode === "random") {
      return sorted[Math.floor(Math.random() * sorted.length)] ?? sorted[0]!;
    }
    if (mode === "up") {
      this.arpIndex = this.arpIndex % sorted.length;
      const midi = sorted[this.arpIndex]!;
      this.arpIndex += 1;
      return midi;
    }
    if (mode === "down") {
      const rev = [...sorted].reverse();
      this.arpIndex = this.arpIndex % rev.length;
      const midi = rev[this.arpIndex]!;
      this.arpIndex += 1;
      return midi;
    }
    if (sorted.length === 1) return sorted[0]!;
    const cycle = [...sorted, ...sorted.slice(1, -1).reverse()];
    this.arpIndex = this.arpIndex % cycle.length;
    const midi = cycle[this.arpIndex]!;
    this.arpIndex += 1;
    return midi;
  }

  private emitArp(midi: number | null): void {
    for (const listener of this.arpListeners) listener(midi);
  }
}

let engine: SynthEngine | null = null;

export function unlockEngine(params: SynthParams): SynthEngine {
  if (!engine) {
    engine = new SynthEngine(params);
  }
  engine.resume();
  engine.setParams(params);
  return engine;
}

export function getEngine(): SynthEngine | null {
  return engine;
}
