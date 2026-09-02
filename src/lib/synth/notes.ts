export type Waveform = "sine" | "triangle" | "sawtooth" | "square" | "noise";
export type FilterType = "lowpass" | "highpass" | "bandpass";
export type ArpMode = "up" | "down" | "updown" | "random";

export type SynthParams = {
  waveform: Waveform;
  cutoff: number;
  resonance: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  volume: number;
  octave: number;
  filterType: FilterType;
  detune: number;
  lfoRate: number;
  lfoAmount: number;
  delayTime: number;
  delayFeedback: number;
  delayMix: number;
  arp: boolean;
  arpHold: boolean;
  arpRate: number;
  arpMode: ArpMode;
  preset: string;
};

export const DEFAULT_PARAMS: SynthParams = {
  waveform: "sawtooth",
  cutoff: 0.72,
  resonance: 0.18,
  attack: 0.08,
  decay: 0.28,
  sustain: 0.68,
  release: 0.32,
  volume: 0.72,
  octave: 0,
  filterType: "lowpass",
  detune: 0.12,
  lfoRate: 0.28,
  lfoAmount: 0,
  delayTime: 0.32,
  delayFeedback: 0.35,
  delayMix: 0.12,
  arp: false,
  arpHold: false,
  arpRate: 0.58,
  arpMode: "up",
  preset: "init",
};

export type FactoryPreset = {
  id: string;
  name: string;
  params: Partial<SynthParams>;
};

export const PRESETS: FactoryPreset[] = [
  { id: "init", name: "Init", params: { ...DEFAULT_PARAMS, preset: "init" } },
  {
    id: "bass",
    name: "Bass",
    params: {
      waveform: "sawtooth",
      filterType: "lowpass",
      cutoff: 0.3,
      resonance: 0.46,
      attack: 0.02,
      decay: 0.42,
      sustain: 0.32,
      release: 0.16,
      detune: 0.28,
      lfoRate: 0.12,
      lfoAmount: 0.06,
      delayTime: 0.22,
      delayFeedback: 0.18,
      delayMix: 0.06,
      arp: false,
    },
  },
  {
    id: "lead",
    name: "Lead",
    params: {
      waveform: "sawtooth",
      filterType: "lowpass",
      cutoff: 0.66,
      resonance: 0.28,
      attack: 0.04,
      decay: 0.22,
      sustain: 0.72,
      release: 0.28,
      detune: 0.48,
      lfoRate: 0.42,
      lfoAmount: 0.18,
      delayTime: 0.38,
      delayFeedback: 0.42,
      delayMix: 0.28,
      arp: false,
    },
  },
  {
    id: "pad",
    name: "Pad",
    params: {
      waveform: "triangle",
      filterType: "lowpass",
      cutoff: 0.48,
      resonance: 0.12,
      attack: 0.62,
      decay: 0.4,
      sustain: 0.82,
      release: 0.72,
      detune: 0.36,
      lfoRate: 0.22,
      lfoAmount: 0.32,
      delayTime: 0.55,
      delayFeedback: 0.48,
      delayMix: 0.42,
      arp: false,
    },
  },
  {
    id: "pluck",
    name: "Pluck",
    params: {
      waveform: "square",
      filterType: "lowpass",
      cutoff: 0.58,
      resonance: 0.22,
      attack: 0.01,
      decay: 0.38,
      sustain: 0.08,
      release: 0.2,
      detune: 0.08,
      lfoRate: 0.2,
      lfoAmount: 0,
      delayTime: 0.3,
      delayFeedback: 0.46,
      delayMix: 0.34,
      arp: false,
    },
  },
  {
    id: "keys",
    name: "Keys",
    params: {
      waveform: "triangle",
      filterType: "lowpass",
      cutoff: 0.7,
      resonance: 0.1,
      attack: 0.05,
      decay: 0.32,
      sustain: 0.58,
      release: 0.36,
      detune: 0.16,
      lfoRate: 0.18,
      lfoAmount: 0.04,
      delayTime: 0.28,
      delayFeedback: 0.22,
      delayMix: 0.16,
      arp: false,
    },
  },
  {
    id: "arp",
    name: "Sequence",
    params: {
      waveform: "sawtooth",
      filterType: "lowpass",
      cutoff: 0.6,
      resonance: 0.34,
      attack: 0.03,
      decay: 0.28,
      sustain: 0.18,
      release: 0.14,
      detune: 0.2,
      lfoRate: 0.38,
      lfoAmount: 0.22,
      delayTime: 0.36,
      delayFeedback: 0.4,
      delayMix: 0.3,
      arp: true,
      arpHold: true,
      arpRate: 0.64,
      arpMode: "up",
    },
  },
];

export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

/** C3 — the default keyboard start. MIDI 60 is C4. */
export const BASE_MIDI = 48;

export const MIN_OCTAVE = -2;
export const MAX_OCTAVE = 3;

export function midiToFreq(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12);
}

export function midiToName(midi: number): string {
  const pc = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[pc]}${octave}`;
}

export function isBlackKey(midi: number): boolean {
  const pc = ((midi % 12) + 12) % 12;
  return pc === 1 || pc === 3 || pc === 6 || pc === 8 || pc === 10;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 40 Hz → ~10 kHz, exponential. */
export function cutoffHz(normalized: number): number {
  return 40 * 250 ** clamp(normalized, 0, 1);
}

export function resonanceQ(normalized: number): number {
  return 0.35 + clamp(normalized, 0, 1) * 16.65;
}

/** Quadratic ease so the low end of the knob is usable. */
export function envSeconds(normalized: number, max: number): number {
  const n = clamp(normalized, 0, 1);
  return 0.004 + n * n * max;
}

export function volumeGain(normalized: number): number {
  const n = clamp(normalized, 0, 1);
  return n * n * 0.85;
}

export function delaySeconds(normalized: number): number {
  return 0.05 + clamp(normalized, 0, 1) * 0.75;
}

export function lfoHz(normalized: number): number {
  return 0.08 * 90 ** clamp(normalized, 0, 1);
}

export function detuneCents(normalized: number): number {
  return clamp(normalized, 0, 1) * 38;
}

export function arpIntervalSec(normalized: number): number {
  const n = clamp(normalized, 0, 1);
  return 0.07 + (1 - n) * (1 - n) * 0.5;
}

export function lfoDepthHz(amount: number): number {
  return clamp(amount, 0, 1) * 2200;
}

export const WAVE_GAIN: Record<Waveform, number> = {
  sine: 1,
  triangle: 0.9,
  sawtooth: 0.52,
  square: 0.42,
  noise: 0.38,
};

export type KeyBinding = {
  code: string;
  offset: number;
  label: string;
};

/** Physical key positions (e.code) — Ableton / FL-style two-octave layout. */
export const KEY_BINDINGS: KeyBinding[] = [
  { code: "KeyZ", offset: 0, label: "Z" },
  { code: "KeyS", offset: 1, label: "S" },
  { code: "KeyX", offset: 2, label: "X" },
  { code: "KeyD", offset: 3, label: "D" },
  { code: "KeyC", offset: 4, label: "C" },
  { code: "KeyV", offset: 5, label: "V" },
  { code: "KeyG", offset: 6, label: "G" },
  { code: "KeyB", offset: 7, label: "B" },
  { code: "KeyH", offset: 8, label: "H" },
  { code: "KeyN", offset: 9, label: "N" },
  { code: "KeyJ", offset: 10, label: "J" },
  { code: "KeyM", offset: 11, label: "M" },
  { code: "KeyQ", offset: 12, label: "Q" },
  { code: "Digit2", offset: 13, label: "2" },
  { code: "KeyW", offset: 14, label: "W" },
  { code: "Digit3", offset: 15, label: "3" },
  { code: "KeyE", offset: 16, label: "E" },
  { code: "KeyR", offset: 17, label: "R" },
  { code: "Digit5", offset: 18, label: "5" },
  { code: "KeyT", offset: 19, label: "T" },
  { code: "Digit6", offset: 20, label: "6" },
  { code: "KeyY", offset: 21, label: "Y" },
  { code: "Digit7", offset: 22, label: "7" },
  { code: "KeyU", offset: 23, label: "U" },
  { code: "KeyI", offset: 24, label: "I" },
];

export const BINDING_BY_CODE = new Map(KEY_BINDINGS.map((b) => [b.code, b]));
export const BINDING_BY_OFFSET = new Map(KEY_BINDINGS.map((b) => [b.offset, b]));

export type PianoKey = {
  midi: number;
  name: string;
  black: boolean;
  offset: number;
  computerLabel?: string;
};

export function buildPianoKeys(startMidi: number, octaves: 1 | 2): PianoKey[] {
  const count = octaves * 12 + 1;
  const keys: PianoKey[] = [];
  for (let offset = 0; offset < count; offset += 1) {
    const midi = startMidi + offset;
    keys.push({
      midi,
      name: midiToName(midi),
      black: isBlackKey(midi),
      offset,
      computerLabel: BINDING_BY_OFFSET.get(offset)?.label,
    });
  }
  return keys;
}

export const STORAGE_KEY = "lumen-synth-params-v2";

export function loadStoredParams(): SynthParams {
  if (typeof window === "undefined") return DEFAULT_PARAMS;
  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ??
      window.localStorage.getItem("lumen-synth-params-v1");
    if (!raw) return DEFAULT_PARAMS;
    const parsed = JSON.parse(raw) as Partial<SynthParams>;
    return {
      ...DEFAULT_PARAMS,
      ...parsed,
      octave: clamp(Math.round(parsed.octave ?? 0), MIN_OCTAVE, MAX_OCTAVE),
      preset: parsed.preset ?? "custom",
    };
  } catch {
    return DEFAULT_PARAMS;
  }
}

export function saveStoredParams(params: SynthParams): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    /* ignore quota / private mode */
  }
}

export function applyPreset(
  current: SynthParams,
  preset: FactoryPreset,
): SynthParams {
  return {
    ...DEFAULT_PARAMS,
    ...preset.params,
    octave: current.octave,
    volume: current.volume,
    preset: preset.id,
  };
}

export function formatHz(hz: number): string {
  if (hz >= 1000) return `${(hz / 1000).toFixed(1)} kHz`;
  return `${Math.round(hz)} Hz`;
}

export function formatSeconds(seconds: number): string {
  if (seconds < 1) return `${Math.round(seconds * 1000)} ms`;
  return `${seconds.toFixed(2)} s`;
}

export function formatPercent(normalized: number): string {
  return `${Math.round(clamp(normalized, 0, 1) * 100)}%`;
}

export function formatLfo(normalized: number): string {
  const hz = lfoHz(normalized);
  if (hz < 1) return `${hz.toFixed(2)} Hz`;
  return `${hz.toFixed(1)} Hz`;
}
