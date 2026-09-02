import { useMemo, useRef } from "react";
import { buildPianoKeys } from "@/lib/synth/notes";
import { cn } from "@/lib/utils";

type KeyboardProps = {
  startMidi: number;
  octaves: 1 | 2;
  activeNotes: ReadonlySet<number>;
  onNoteOn: (midi: number) => void;
  onNoteOff: (midi: number) => void;
  showComputerHints: boolean;
};

function midiFromPoint(x: number, y: number, root: HTMLElement): number | null {
  const hit = document.elementFromPoint(x, y);
  if (!(hit instanceof Element) || !root.contains(hit)) return null;
  const key = hit.closest("[data-midi]");
  if (!key || !root.contains(key)) return null;
  const midi = Number(key.getAttribute("data-midi"));
  return Number.isFinite(midi) ? midi : null;
}

export function Keyboard({
  startMidi,
  octaves,
  activeNotes,
  onNoteOn,
  onNoteOff,
  showComputerHints,
}: KeyboardProps) {
  const keys = useMemo(
    () => buildPianoKeys(startMidi, octaves),
    [startMidi, octaves],
  );
  const whites = keys.filter((key) => !key.black);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, number>());

  const bindPointer = (pointerId: number, midi: number | null) => {
    const previous = pointers.current.get(pointerId);
    if (previous === midi) return;
    if (previous !== undefined) onNoteOff(previous);
    if (midi === null) {
      pointers.current.delete(pointerId);
      return;
    }
    pointers.current.set(pointerId, midi);
    onNoteOn(midi);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const midi = midiFromPoint(event.clientX, event.clientY, event.currentTarget);
    bindPointer(event.pointerId, midi);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId) && event.buttons === 0) return;
    const root = rootRef.current;
    if (!root) return;
    const midi = midiFromPoint(event.clientX, event.clientY, root);
    if (pointers.current.has(event.pointerId) || midi !== null) {
      bindPointer(event.pointerId, midi);
    }
  };

  const onPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    bindPointer(event.pointerId, null);
  };

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Piano keyboard"
      className="relative isolate touch-none overflow-hidden rounded-lg bg-sunken p-1.5"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <div className="relative flex w-full">
        {whites.map((key) => (
          <button
            key={key.midi}
            type="button"
            data-midi={key.midi}
            data-active={activeNotes.has(key.midi) ? "true" : "false"}
            aria-label={key.name}
            aria-pressed={activeNotes.has(key.midi)}
            className={cn("piano-key piano-key-white")}
            onKeyDown={(event) => {
              if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                if (!event.repeat) onNoteOn(key.midi);
              }
            }}
            onKeyUp={(event) => {
              if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                onNoteOff(key.midi);
              }
            }}
            onBlur={() => {
              if (activeNotes.has(key.midi)) onNoteOff(key.midi);
            }}
          >
            <span className="font-mono text-xs font-medium tabular-nums">
              {key.name.startsWith("C") && !key.name.includes("#") ? key.name : ""}
            </span>
            {showComputerHints && key.computerLabel ? (
              <span className="hidden text-xs tracking-wide opacity-50 sm:block">
                {key.computerLabel}
              </span>
            ) : null}
          </button>
        ))}

        {keys
          .filter((key) => key.black)
          .map((key) => {
            const whitesBefore = whites.filter((white) => white.midi < key.midi).length;
            const left = (whitesBefore / whites.length) * 100;
            return (
              <button
                key={key.midi}
                type="button"
                data-midi={key.midi}
                data-active={activeNotes.has(key.midi) ? "true" : "false"}
                aria-label={key.name}
                aria-pressed={activeNotes.has(key.midi)}
                className={cn("piano-key piano-key-black")}
                style={{ left: `${left}%` }}
                onKeyDown={(event) => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    if (!event.repeat) onNoteOn(key.midi);
                  }
                }}
                onKeyUp={(event) => {
                  if (event.key === " " || event.key === "Enter") {
                    event.preventDefault();
                    onNoteOff(key.midi);
                  }
                }}
                onBlur={() => {
                  if (activeNotes.has(key.midi)) onNoteOff(key.midi);
                }}
              >
                {showComputerHints && key.computerLabel ? (
                  <span className="hidden text-xs opacity-70 sm:block">
                    {key.computerLabel}
                  </span>
                ) : null}
              </button>
            );
          })}
      </div>
    </div>
  );
}
