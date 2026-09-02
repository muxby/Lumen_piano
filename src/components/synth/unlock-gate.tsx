import type { SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";

type UnlockGateProps = {
  onUnlock: () => void;
};

export function UnlockGate({ onUnlock }: UnlockGateProps) {
  const unlock = (event: SyntheticEvent) => {
    event.preventDefault();
    onUnlock();
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-bg/80 p-6 md:absolute md:rounded-3xl"
      onPointerDown={unlock}
      onClick={unlock}
    >
      <div className="flex max-w-sm flex-col items-center gap-5 text-center">
        <div className="flex flex-col gap-2">
          <p className="text-sm tracking-[0.22em] text-muted uppercase">Studio instrument</p>
          <h1 className="text-4xl font-medium tracking-tight text-fg md:text-5xl">
            Lumen
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-muted">
            Analog-style poly synth with delay, LFO, arpeggiator, and presets. Audio starts after you enable it.
          </p>
        </div>
        <Button type="button" size="lg" className="min-w-44" onClick={unlock}>
          Enable audio
        </Button>
        <p className="font-mono text-xs text-faint">Click anywhere · or press a key</p>
      </div>
    </div>
  );
}
