import { Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Keyboard } from "@/components/synth/keyboard";
import { Knob } from "@/components/synth/knob";
import { ScopePanel } from "@/components/synth/scope-panel";
import { Segmented } from "@/components/synth/segmented";
import { UnlockGate } from "@/components/synth/unlock-gate";
import { WaveformSelect } from "@/components/synth/waveform-select";
import { getEngine, unlockEngine, type SynthEngine } from "@/lib/synth/engine";
import {
  BASE_MIDI,
  BINDING_BY_CODE,
  DEFAULT_PARAMS,
  MAX_OCTAVE,
  MIN_OCTAVE,
  PRESETS,
  type ArpMode,
  type FilterType,
  type SynthParams,
  type Waveform,
  applyPreset,
  arpIntervalSec,
  clamp,
  cutoffHz,
  delaySeconds,
  detuneCents,
  envSeconds,
  formatHz,
  formatLfo,
  formatPercent,
  formatSeconds,
  loadStoredParams,
  midiToName,
  resonanceQ,
  saveStoredParams,
} from "@/lib/synth/notes";

const FILTER_OPTIONS: { id: FilterType; label: string }[] = [
  { id: "lowpass", label: "LP" },
  { id: "highpass", label: "HP" },
  { id: "bandpass", label: "BP" },
];

const ARP_OPTIONS: { id: ArpMode; label: string }[] = [
  { id: "up", label: "Up" },
  { id: "down", label: "Down" },
  { id: "updown", label: "Bounce" },
  { id: "random", label: "Rand" },
];

export function SynthApp() {
  const [params, setParams] = useState<SynthParams>(DEFAULT_PARAMS);
  const [unlocked, setUnlocked] = useState(false);
  const [activeNotes, setActiveNotes] = useState<Set<number>>(() => new Set());
  const [octaves, setOctaves] = useState<1 | 2>(2);
  const [lastNote, setLastNote] = useState("—");
  const [arpNote, setArpNote] = useState<number | null>(null);
  const [sustainOn, setSustainOn] = useState(false);
  const [midiLabel, setMidiLabel] = useState<string | null>(null);
  const engineRef = useRef<SynthEngine | null>(null);
  const paramsRef = useRef(params);
  const startMidiRef = useRef(BASE_MIDI);
  const countsRef = useRef(new Map<number, number>());
  const heldCodesRef = useRef(new Set<string>());
  const physicalRef = useRef(new Set<number>());
  const activeNotesRef = useRef(activeNotes);
  const sustainRef = useRef(false);

  paramsRef.current = params;
  activeNotesRef.current = activeNotes;
  const startMidi = BASE_MIDI + params.octave * 12;
  startMidiRef.current = startMidi;
  const topMidi = startMidi + octaves * 12;

  const litNotes = useMemo(() => {
    const next = new Set(activeNotes);
    if (arpNote !== null) next.add(arpNote);
    return next;
  }, [activeNotes, arpNote]);

  const unlock = useCallback(() => {
    const existing = engineRef.current ?? getEngine();
    if (existing) {
      existing.resume();
      existing.setParams(paramsRef.current);
      engineRef.current = existing;
      setUnlocked(true);
      return existing;
    }
    const engine = unlockEngine(paramsRef.current);
    engineRef.current = engine;
    setUnlocked(true);
    return engine;
  }, []);

  const patch = useCallback((partial: Partial<SynthParams>, fromPreset = false) => {
    setParams((prev) => {
      const keys = Object.keys(partial);
      const performanceOnly = keys.every((key) => key === "octave" || key === "volume");
      const next: SynthParams = {
        ...prev,
        ...partial,
        preset: fromPreset || performanceOnly ? (partial.preset ?? prev.preset) : "custom",
      };
      engineRef.current?.setParams(next);
      saveStoredParams(next);
      return next;
    });
  }, []);

  const heldForLatch = useCallback(() => {
    const held = new Set(physicalRef.current);
    if (sustainRef.current || paramsRef.current.arpHold) {
      for (const midi of activeNotesRef.current) held.add(midi);
    }
    return [...held];
  }, []);

  const noteOn = useCallback(
    (midi: number) => {
      const engine = engineRef.current ?? unlock();
      const nextCount = (countsRef.current.get(midi) ?? 0) + 1;
      countsRef.current.set(midi, nextCount);
      physicalRef.current.add(midi);
      if (nextCount === 1) {
        setActiveNotes((prev) => {
          const next = new Set(prev);
          next.add(midi);
          return next;
        });
        if (paramsRef.current.arp) {
          engine.setArpNotes(heldForLatch());
        } else {
          engine.noteOn(midi);
        }
      }
      setLastNote(midiToName(midi));
    },
    [heldForLatch, unlock],
  );

  const flushReleased = useCallback(() => {
    const keep = sustainRef.current || paramsRef.current.arpHold;
    if (keep) {
      if (paramsRef.current.arp) engineRef.current?.setArpNotes(heldForLatch());
      return;
    }
    setActiveNotes((prev) => {
      const next = new Set<number>();
      for (const midi of prev) {
        if (physicalRef.current.has(midi)) next.add(midi);
        else if (!paramsRef.current.arp) engineRef.current?.noteOff(midi);
      }
      if (paramsRef.current.arp) engineRef.current?.setArpNotes([...next]);
      return next;
    });
  }, [heldForLatch]);

  const noteOff = useCallback(
    (midi: number) => {
      const nextCount = (countsRef.current.get(midi) ?? 0) - 1;
      if (nextCount > 0) {
        countsRef.current.set(midi, nextCount);
        return;
      }
      countsRef.current.delete(midi);
      physicalRef.current.delete(midi);
      const keep = sustainRef.current || (paramsRef.current.arp && paramsRef.current.arpHold);
      if (keep) {
        if (paramsRef.current.arp) engineRef.current?.setArpNotes(heldForLatch());
        return;
      }
      if (paramsRef.current.arp) {
        const remaining = [...activeNotesRef.current].filter((value) => value !== midi);
        engineRef.current?.setArpNotes(remaining.filter((value) => physicalRef.current.has(value) || paramsRef.current.arpHold));
      } else {
        engineRef.current?.noteOff(midi);
      }
      setActiveNotes((prev) => {
        if (!prev.has(midi)) return prev;
        const next = new Set(prev);
        next.delete(midi);
        return next;
      });
    },
    [heldForLatch],
  );

  const setSustain = useCallback(
    (on: boolean) => {
      sustainRef.current = on;
      setSustainOn(on);
      if (!on) flushReleased();
    },
    [flushReleased],
  );

  const releaseAll = useCallback(() => {
    engineRef.current?.allNotesOff();
    countsRef.current.clear();
    heldCodesRef.current.clear();
    physicalRef.current.clear();
    setActiveNotes((prev) => (prev.size === 0 ? prev : new Set()));
    setArpNote(null);
  }, []);

  const toggleArp = useCallback(
    (on: boolean) => {
      const engine = engineRef.current;
      if (on) {
        engine?.allNotesOff();
        const held = heldForLatch();
        engine?.setArpNotes(held);
        patch({ arp: true });
      } else {
        patch({ arp: false });
        for (const midi of physicalRef.current) engine?.noteOn(midi);
      }
    },
    [heldForLatch, patch],
  );

  const toggleHold = useCallback(
    (on: boolean) => {
      patch({ arpHold: on });
      if (!on) flushReleased();
    },
    [flushReleased, patch],
  );

  useEffect(() => {
    setParams(loadStoredParams());
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setOctaves(mq.matches ? 2 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    releaseAll();
  }, [params.octave, octaves, releaseAll]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!unlocked || !engine) return;
    return engine.subscribeArp(setArpNote);
  }, [unlocked]);

  useEffect(() => {
    if (!unlocked) return;
    if (typeof navigator.requestMIDIAccess !== "function") return;
    let cancelled = false;
    void navigator.requestMIDIAccess().then((access) => {
      if (cancelled) return;
      const handle = (event: MIDIMessageEvent) => {
        const data = event.data;
        if (!data || data.length < 2) return;
        const status = data[0] ?? 0;
        const data1 = data[1] ?? 0;
        const data2 = data[2] ?? 0;
        const cmd = status & 0xf0;
        if (cmd === 0x90 && data2 > 0) noteOn(data1);
        else if (cmd === 0x80 || (cmd === 0x90 && data2 === 0)) noteOff(data1);
        else if (cmd === 0xb0 && data1 === 64) setSustain(data2 >= 64);
        else if (cmd === 0xb0 && data1 === 1) patch({ lfoAmount: data2 / 127 });
      };
      for (const input of access.inputs.values()) {
        input.onmidimessage = handle;
      }
      setMidiLabel(access.inputs.size > 0 ? `MIDI ${access.inputs.size}` : null);
    }).catch(() => {
      if (!cancelled) setMidiLabel(null);
    });
    return () => {
      cancelled = true;
    };
  }, [noteOff, noteOn, patch, setSustain, unlocked]);

  useEffect(() => {
    const onDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        if (event.repeat) return;
        setSustain(true);
        return;
      }
      if (event.code === "Minus" || event.code === "NumpadSubtract") {
        event.preventDefault();
        if (event.repeat) return;
        patch({ octave: clamp(paramsRef.current.octave - 1, MIN_OCTAVE, MAX_OCTAVE) });
        return;
      }
      if (event.code === "Equal" || event.code === "NumpadAdd") {
        event.preventDefault();
        if (event.repeat) return;
        patch({ octave: clamp(paramsRef.current.octave + 1, MIN_OCTAVE, MAX_OCTAVE) });
        return;
      }

      const binding = BINDING_BY_CODE.get(event.code);
      if (!binding) return;
      event.preventDefault();
      if (event.repeat || heldCodesRef.current.has(event.code)) return;
      heldCodesRef.current.add(event.code);
      noteOn(startMidiRef.current + binding.offset);
    };

    const onUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setSustain(false);
        return;
      }
      const binding = BINDING_BY_CODE.get(event.code);
      if (!binding) return;
      event.preventDefault();
      if (!heldCodesRef.current.has(event.code)) return;
      heldCodesRef.current.delete(event.code);
      noteOff(startMidiRef.current + binding.offset);
    };

    const onBlur = () => {
      setSustain(false);
      releaseAll();
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [noteOff, noteOn, patch, releaseAll, setSustain]);

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-end p-3 md:justify-center md:p-6">
        <section className="relative flex flex-col gap-3 rounded-2xl bg-surface p-3 pb-48 shadow-panel select-none md:gap-4 md:rounded-3xl md:p-4 md:pb-4">
          {!unlocked ? <UnlockGate onUnlock={unlock} /> : null}

          <header className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="mr-auto flex items-baseline gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full bg-accent ${unlocked ? "opacity-100" : "opacity-25"}`}
                  aria-hidden="true"
                />
                <span className="text-lg font-medium tracking-tight">Lumen</span>
              </div>
              <span className="hidden text-sm text-muted sm:inline">Analog poly synth</span>
            </div>

            <p className="hidden font-mono text-sm tabular-nums text-muted sm:block" aria-live="polite">
              {lastNote}
            </p>
            {sustainOn ? (
              <span className="font-mono text-xs tracking-wide text-accent uppercase">Sustain</span>
            ) : null}
            {params.arp ? (
              <span className="font-mono text-xs tracking-wide text-accent uppercase">Arp</span>
            ) : null}
            {midiLabel ? (
              <span className="hidden font-mono text-xs text-faint md:inline">{midiLabel}</span>
            ) : null}

            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="size-11"
                aria-label="Octave down"
                onClick={() =>
                  patch({ octave: clamp(params.octave - 1, MIN_OCTAVE, MAX_OCTAVE) })
                }
                disabled={params.octave <= MIN_OCTAVE}
              >
                <Minus className="size-4" />
              </Button>
              <div className="w-20 text-center">
                <div className="font-mono text-sm tabular-nums text-fg">
                  {midiToName(startMidi)}–{midiToName(topMidi)}
                </div>
                <div className="text-xs tracking-wide text-muted uppercase">Octave</div>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="size-11"
                aria-label="Octave up"
                onClick={() =>
                  patch({ octave: clamp(params.octave + 1, MIN_OCTAVE, MAX_OCTAVE) })
                }
                disabled={params.octave >= MAX_OCTAVE}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <div className="flex w-40 min-w-36 items-center gap-2 md:w-48">
              <span
                id="lumen-vol-label"
                className="text-xs font-medium tracking-wide text-muted uppercase"
              >
                Vol
              </span>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[params.volume]}
                onValueChange={([volume]) => patch({ volume: volume ?? 0 })}
                aria-labelledby="lumen-vol-label"
              />
            </div>
          </header>

          <div className="-mx-1 flex gap-1 overflow-x-auto px-1">
            {PRESETS.map((preset) => {
              const selected = params.preset === preset.id;
              return (
                <Button
                  key={preset.id}
                  type="button"
                  variant={selected ? "default" : "secondary"}
                  size="sm"
                  className="h-11 shrink-0 px-3"
                  onClick={() => {
                    const next = applyPreset(params, preset);
                    const engine = engineRef.current;
                    engine?.setParams(next);
                    if (next.arp) {
                      engine?.allNotesOff();
                      engine?.setArpNotes(heldForLatch());
                    } else {
                      engine?.setArpNotes([]);
                    }
                    setParams(next);
                    saveStoredParams(next);
                  }}
                >
                  {preset.name}
                </Button>
              );
            })}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <ScopePanel engine={engineRef.current} active={unlocked} />
            <div className="flex flex-col justify-center gap-2 rounded-lg bg-sunken p-2 shadow-panel">
              <p className="px-1 font-mono text-xs tracking-wide text-faint uppercase">
                Oscillator
              </p>
              <WaveformSelect
                value={params.waveform}
                onChange={(waveform: Waveform) => patch({ waveform })}
              />
              <Segmented
                label="Filter type"
                value={params.filterType}
                options={FILTER_OPTIONS}
                onChange={(filterType) => patch({ filterType })}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-evenly gap-x-4 gap-y-4 rounded-lg bg-sunken px-2 pt-3 pb-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Filter</p>
              <div className="flex gap-1">
                <Knob
                  label="Cut"
                  value={params.cutoff}
                  defaultValue={DEFAULT_PARAMS.cutoff}
                  onChange={(cutoff) => patch({ cutoff })}
                  format={(value) => formatHz(cutoffHz(value))}
                />
                <Knob
                  label="Res"
                  value={params.resonance}
                  defaultValue={DEFAULT_PARAMS.resonance}
                  onChange={(resonance) => patch({ resonance })}
                  format={(value) => resonanceQ(value).toFixed(1)}
                />
                <Knob
                  label="Detune"
                  value={params.detune}
                  defaultValue={DEFAULT_PARAMS.detune}
                  onChange={(detune) => patch({ detune })}
                  format={(value) => `${Math.round(detuneCents(value))} c`}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Envelope</p>
              <div className="flex gap-1">
                <Knob
                  label="A"
                  value={params.attack}
                  defaultValue={DEFAULT_PARAMS.attack}
                  onChange={(attack) => patch({ attack })}
                  format={(value) => formatSeconds(envSeconds(value, 2))}
                />
                <Knob
                  label="D"
                  value={params.decay}
                  defaultValue={DEFAULT_PARAMS.decay}
                  onChange={(decay) => patch({ decay })}
                  format={(value) => formatSeconds(envSeconds(value, 2.2))}
                />
                <Knob
                  label="S"
                  value={params.sustain}
                  defaultValue={DEFAULT_PARAMS.sustain}
                  onChange={(sustain) => patch({ sustain })}
                  format={formatPercent}
                />
                <Knob
                  label="R"
                  value={params.release}
                  defaultValue={DEFAULT_PARAMS.release}
                  onChange={(release) => patch({ release })}
                  format={(value) => formatSeconds(envSeconds(value, 3.2))}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">LFO</p>
              <div className="flex gap-1">
                <Knob
                  label="Rate"
                  value={params.lfoRate}
                  defaultValue={DEFAULT_PARAMS.lfoRate}
                  onChange={(lfoRate) => patch({ lfoRate })}
                  format={formatLfo}
                />
                <Knob
                  label="Amt"
                  value={params.lfoAmount}
                  defaultValue={DEFAULT_PARAMS.lfoAmount}
                  onChange={(lfoAmount) => patch({ lfoAmount })}
                  format={formatPercent}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Delay</p>
              <div className="flex gap-1">
                <Knob
                  label="Time"
                  value={params.delayTime}
                  defaultValue={DEFAULT_PARAMS.delayTime}
                  onChange={(delayTime) => patch({ delayTime })}
                  format={(value) => formatSeconds(delaySeconds(value))}
                />
                <Knob
                  label="Fbk"
                  value={params.delayFeedback}
                  defaultValue={DEFAULT_PARAMS.delayFeedback}
                  onChange={(delayFeedback) => patch({ delayFeedback })}
                  format={formatPercent}
                />
                <Knob
                  label="Mix"
                  value={params.delayMix}
                  defaultValue={DEFAULT_PARAMS.delayMix}
                  onChange={(delayMix) => patch({ delayMix })}
                  format={formatPercent}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-sunken p-2">
            <Button
              type="button"
              variant={params.arp ? "default" : "secondary"}
              aria-pressed={params.arp}
              onClick={() => toggleArp(!params.arp)}
            >
              Arp
            </Button>
            <Button
              type="button"
              variant={params.arpHold ? "default" : "secondary"}
              aria-pressed={params.arpHold}
              disabled={!params.arp}
              onClick={() => toggleHold(!params.arpHold)}
            >
              Hold
            </Button>
            <div className="min-w-52 flex-1">
              <Segmented
                label="Arpeggio pattern"
                value={params.arpMode}
                options={ARP_OPTIONS}
                onChange={(arpMode) => patch({ arpMode })}
              />
            </div>
            <Knob
              label="Speed"
              value={params.arpRate}
              defaultValue={DEFAULT_PARAMS.arpRate}
              onChange={(arpRate) => patch({ arpRate })}
              format={(value) => formatSeconds(arpIntervalSec(value))}
              disabled={!params.arp}
            />
          </div>

          <div className="fixed inset-x-0 bottom-0 z-10 bg-surface px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:static md:bg-transparent md:px-0 md:pt-0 md:pb-0">
            <Keyboard
              startMidi={startMidi}
              octaves={octaves}
              activeNotes={litNotes}
              onNoteOn={noteOn}
              onNoteOff={noteOff}
              showComputerHints
            />
            <p className="mt-2 hidden text-center text-xs text-faint md:block">
              Z–M / Q–I play notes · space sustains · − / = octave · MIDI keyboards connect after enable
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
