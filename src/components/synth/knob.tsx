import { useCallback, useId, useRef } from "react";
import { cn } from "@/lib/utils";
import { clamp } from "@/lib/synth/notes";

type KnobProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  defaultValue: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
  disabled?: boolean;
};

const START_ANGLE = -135;
const SWEEP = 270;

export function Knob({
  label,
  value,
  min = 0,
  max = 1,
  defaultValue,
  onChange,
  format,
  disabled = false,
}: KnobProps) {
  const id = useId();
  const drag = useRef<{ y: number; value: number } | null>(null);
  const normalized = (clamp(value, min, max) - min) / (max - min || 1);
  const angle = START_ANGLE + normalized * SWEEP;

  const updateFromDelta = useCallback(
    (clientY: number, shiftKey: boolean) => {
      const start = drag.current;
      if (!start) return;
      const range = max - min;
      const sensitivity = range / (shiftKey ? 420 : 140);
      const next = clamp(start.value + (start.y - clientY) * sensitivity, min, max);
      onChange(next);
    },
    [max, min, onChange],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { y: event.clientY, value };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    event.preventDefault();
    updateFromDelta(event.clientY, event.shiftKey);
  };

  const endDrag = () => {
    drag.current = null;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const step = (max - min) * (event.shiftKey ? 0.01 : 0.04);
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      event.preventDefault();
      onChange(clamp(value + step, min, max));
    } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      event.preventDefault();
      onChange(clamp(value - step, min, max));
    } else if (event.key === "Home") {
      event.preventDefault();
      onChange(min);
    } else if (event.key === "End") {
      event.preventDefault();
      onChange(max);
    } else if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      onChange(defaultValue);
    }
  };

  return (
    <div className="flex w-20 flex-col items-center gap-2">
      <div
        id={id}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Number(value.toFixed(3))}
        aria-valuetext={format(value)}
        aria-disabled={disabled}
        className={cn(
          "relative size-knob touch-none rounded-full outline-none",
          "focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          disabled && "pointer-events-none opacity-40",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => onChange(defaultValue)}
        onKeyDown={onKeyDown}
      >
        <div className="knob-dial absolute inset-0 rounded-full" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            className="text-border"
            strokeWidth="3.5"
            strokeDasharray="198"
            strokeDashoffset="50"
            strokeLinecap="round"
            transform="rotate(135 50 50)"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            className="text-accent"
            strokeWidth="3.5"
            strokeDasharray={`${normalized * 198} 198`}
            strokeLinecap="round"
            transform="rotate(135 50 50)"
          />
        </svg>
        <div
          className="absolute inset-3 rounded-full bg-raised shadow-panel"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <span className="absolute top-1 left-1/2 h-2.5 w-0.5 -translate-x-1/2 rounded-full bg-fg" />
        </div>
      </div>
      <div className="flex flex-col items-center leading-tight">
        <span className="font-mono text-xs tabular-nums text-fg">{format(value)}</span>
        <label htmlFor={id} className="text-xs font-medium tracking-wide text-muted uppercase">
          {label}
        </label>
      </div>
    </div>
  );
}
