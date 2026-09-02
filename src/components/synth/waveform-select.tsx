import { cn } from "@/lib/utils";
import type { Waveform } from "@/lib/synth/notes";

const WAVES: { id: Waveform; label: string }[] = [
  { id: "sine", label: "Sine" },
  { id: "triangle", label: "Tri" },
  { id: "sawtooth", label: "Saw" },
  { id: "square", label: "Sqr" },
  { id: "noise", label: "Noise" },
];

function WaveIcon({ type }: { type: Waveform }) {
  const d =
    type === "sine"
      ? "M2 12c3-8 5-8 8 0s5 8 8 0"
      : type === "triangle"
        ? "M2 16 L8 8 L14 16 L20 8"
        : type === "sawtooth"
          ? "M2 16 L2 8 L14 16 L14 8 L20 12"
          : type === "square"
            ? "M3 16 V8 H11 V16 H19 V8"
            : "M3 12 L6 7 L9 17 L12 8 L15 16 L18 9 L21 12";

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-7" aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type WaveformSelectProps = {
  value: Waveform;
  onChange: (wave: Waveform) => void;
  disabled?: boolean;
};

export function WaveformSelect({ value, onChange, disabled }: WaveformSelectProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Oscillator waveform"
      className="grid grid-cols-5 gap-1 rounded-lg bg-sunken p-1"
    >
      {WAVES.map((wave) => {
        const selected = wave.id === value;
        return (
          <button
            key={wave.id}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(wave.id)}
            className={cn(
              "flex h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-md px-0.5 text-xs font-medium transition-[background-color,color,opacity] duration-150 ease-out",
              selected ? "bg-raised text-fg shadow-panel" : "text-muted hover:text-fg",
              disabled && "opacity-40",
            )}
          >
            <WaveIcon type={wave.id} />
            <span>{wave.label}</span>
          </button>
        );
      })}
    </div>
  );
}
