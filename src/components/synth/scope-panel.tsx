import { useEffect, useRef } from "react";
import type { SynthEngine } from "@/lib/synth/engine";

type ScopePanelProps = {
  engine: SynthEngine | null;
  active: boolean;
};

export function ScopePanel({ engine, active }: ScopePanelProps) {
  const scopeRef = useRef<HTMLCanvasElement>(null);
  const meterRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !engine) return;

    const scope = scopeRef.current;
    const meter = meterRef.current;
    if (!scope || !meter) return;

    const analyser = engine.analyser;
    const timeData = new Uint8Array(analyser.fftSize);
    const scopeCtx = scope.getContext("2d");
    const meterCtx = meter.getContext("2d");
    if (!scopeCtx || !meterCtx) return;

    let frame = 0;
    let peakHold = 0;
    let running = true;

    const resize = (canvas: HTMLCanvasElement) => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
      }
      return { width, height, ratio };
    };

    const draw = () => {
      if (!running) return;
      analyser.getByteTimeDomainData(timeData);

      const s = resize(scope);
      scopeCtx.setTransform(s.ratio, 0, 0, s.ratio, 0, 0);
      scopeCtx.clearRect(0, 0, s.width, s.height);

      scopeCtx.strokeStyle = "rgb(46 44 40)";
      scopeCtx.lineWidth = 1;
      scopeCtx.beginPath();
      scopeCtx.moveTo(0, s.height / 2);
      scopeCtx.lineTo(s.width, s.height / 2);
      scopeCtx.stroke();

      scopeCtx.beginPath();
      scopeCtx.strokeStyle = "rgb(142 201 184)";
      scopeCtx.lineWidth = 1.6;
      const step = Math.max(1, Math.floor(timeData.length / Math.max(s.width, 1)));
      for (let i = 0, x = 0; i < timeData.length; i += step, x += s.width / (timeData.length / step)) {
        const y = (timeData[i] / 255) * s.height;
        if (i === 0) scopeCtx.moveTo(x, y);
        else scopeCtx.lineTo(x, y);
      }
      scopeCtx.stroke();

      let sum = 0;
      let peak = 0;
      for (let i = 0; i < timeData.length; i += 1) {
        const centered = (timeData[i] - 128) / 128;
        sum += centered * centered;
        peak = Math.max(peak, Math.abs(centered));
      }
      const rms = Math.sqrt(sum / timeData.length);
      peakHold = Math.max(peak, peakHold * 0.96);

      const m = resize(meter);
      meterCtx.setTransform(m.ratio, 0, 0, m.ratio, 0, 0);
      meterCtx.clearRect(0, 0, m.width, m.height);

      const pad = 4;
      const innerH = m.height - pad * 2;
      const fillH = innerH * Math.min(1, rms * 2.4);
      const holdY = pad + innerH * (1 - Math.min(1, peakHold));

      meterCtx.fillStyle = "rgb(13 13 12)";
      meterCtx.fillRect(0, 0, m.width, m.height);

      const grad = meterCtx.createLinearGradient(0, m.height, 0, 0);
      grad.addColorStop(0, "rgb(142 201 184)");
      grad.addColorStop(0.75, "rgb(142 201 184)");
      grad.addColorStop(1, "rgb(240 238 232)");
      meterCtx.fillStyle = grad;
      meterCtx.fillRect(pad, pad + innerH - fillH, m.width - pad * 2, fillH);

      meterCtx.fillStyle = "rgb(240 238 232)";
      meterCtx.fillRect(pad, holdY, m.width - pad * 2, 2);

      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);
    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };
  }, [engine, active]);

  return (
    <div className="flex h-24 gap-2 rounded-lg bg-sunken p-2 shadow-panel md:h-32">
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="px-1 pb-1 font-mono text-xs tracking-wide text-faint uppercase">
          Scope
        </span>
        <canvas
          ref={scopeRef}
          className="min-h-0 w-full flex-1"
          aria-label="Oscilloscope"
        />
      </div>
      <div className="flex w-7 flex-col md:w-8">
        <span className="pb-1 text-center font-mono text-xs tracking-wide text-faint uppercase">
          Lvl
        </span>
        <canvas
          ref={meterRef}
          className="min-h-0 w-full flex-1 rounded-sm"
          aria-label="Level meter"
        />
      </div>
    </div>
  );
}
