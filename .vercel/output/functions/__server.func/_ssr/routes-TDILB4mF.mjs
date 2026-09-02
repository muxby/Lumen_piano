import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Plus, r as Minus } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-TDILB4mF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-fg text-bg hover:opacity-90",
			secondary: "bg-raised text-fg shadow-panel hover:bg-border",
			ghost: "text-muted hover:bg-raised hover:text-fg",
			outline: "text-fg shadow-panel hover:bg-raised"
		},
		size: {
			default: "h-11 px-4 text-sm",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6 text-sm",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex h-11 w-full touch-none items-center select-none", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1 w-full grow overflow-hidden rounded-full bg-sunken",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full bg-fg shadow-panel transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none" })]
}));
Slider.displayName = "Slider";
var DEFAULT_PARAMS = {
	waveform: "sawtooth",
	cutoff: .72,
	resonance: .18,
	attack: .08,
	decay: .28,
	sustain: .68,
	release: .32,
	volume: .72,
	octave: 0,
	filterType: "lowpass",
	detune: .12,
	lfoRate: .28,
	lfoAmount: 0,
	delayTime: .32,
	delayFeedback: .35,
	delayMix: .12,
	arp: false,
	arpHold: false,
	arpRate: .58,
	arpMode: "up",
	preset: "init"
};
var PRESETS = [
	{
		id: "init",
		name: "Init",
		params: {
			...DEFAULT_PARAMS,
			preset: "init"
		}
	},
	{
		id: "bass",
		name: "Bass",
		params: {
			waveform: "sawtooth",
			filterType: "lowpass",
			cutoff: .3,
			resonance: .46,
			attack: .02,
			decay: .42,
			sustain: .32,
			release: .16,
			detune: .28,
			lfoRate: .12,
			lfoAmount: .06,
			delayTime: .22,
			delayFeedback: .18,
			delayMix: .06,
			arp: false
		}
	},
	{
		id: "lead",
		name: "Lead",
		params: {
			waveform: "sawtooth",
			filterType: "lowpass",
			cutoff: .66,
			resonance: .28,
			attack: .04,
			decay: .22,
			sustain: .72,
			release: .28,
			detune: .48,
			lfoRate: .42,
			lfoAmount: .18,
			delayTime: .38,
			delayFeedback: .42,
			delayMix: .28,
			arp: false
		}
	},
	{
		id: "pad",
		name: "Pad",
		params: {
			waveform: "triangle",
			filterType: "lowpass",
			cutoff: .48,
			resonance: .12,
			attack: .62,
			decay: .4,
			sustain: .82,
			release: .72,
			detune: .36,
			lfoRate: .22,
			lfoAmount: .32,
			delayTime: .55,
			delayFeedback: .48,
			delayMix: .42,
			arp: false
		}
	},
	{
		id: "pluck",
		name: "Pluck",
		params: {
			waveform: "square",
			filterType: "lowpass",
			cutoff: .58,
			resonance: .22,
			attack: .01,
			decay: .38,
			sustain: .08,
			release: .2,
			detune: .08,
			lfoRate: .2,
			lfoAmount: 0,
			delayTime: .3,
			delayFeedback: .46,
			delayMix: .34,
			arp: false
		}
	},
	{
		id: "keys",
		name: "Keys",
		params: {
			waveform: "triangle",
			filterType: "lowpass",
			cutoff: .7,
			resonance: .1,
			attack: .05,
			decay: .32,
			sustain: .58,
			release: .36,
			detune: .16,
			lfoRate: .18,
			lfoAmount: .04,
			delayTime: .28,
			delayFeedback: .22,
			delayMix: .16,
			arp: false
		}
	},
	{
		id: "arp",
		name: "Sequence",
		params: {
			waveform: "sawtooth",
			filterType: "lowpass",
			cutoff: .6,
			resonance: .34,
			attack: .03,
			decay: .28,
			sustain: .18,
			release: .14,
			detune: .2,
			lfoRate: .38,
			lfoAmount: .22,
			delayTime: .36,
			delayFeedback: .4,
			delayMix: .3,
			arp: true,
			arpHold: true,
			arpRate: .64,
			arpMode: "up"
		}
	}
];
var NOTE_NAMES = [
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
	"B"
];
function midiToFreq(midi) {
	return 440 * 2 ** ((midi - 69) / 12);
}
function midiToName(midi) {
	const pc = (midi % 12 + 12) % 12;
	const octave = Math.floor(midi / 12) - 1;
	return `${NOTE_NAMES[pc]}${octave}`;
}
function isBlackKey(midi) {
	const pc = (midi % 12 + 12) % 12;
	return pc === 1 || pc === 3 || pc === 6 || pc === 8 || pc === 10;
}
function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}
/** 40 Hz → ~10 kHz, exponential. */
function cutoffHz(normalized) {
	return 40 * 250 ** clamp(normalized, 0, 1);
}
function resonanceQ(normalized) {
	return .35 + clamp(normalized, 0, 1) * 16.65;
}
/** Quadratic ease so the low end of the knob is usable. */
function envSeconds(normalized, max) {
	const n = clamp(normalized, 0, 1);
	return .004 + n * n * max;
}
function volumeGain(normalized) {
	const n = clamp(normalized, 0, 1);
	return n * n * .85;
}
function delaySeconds(normalized) {
	return .05 + clamp(normalized, 0, 1) * .75;
}
function lfoHz(normalized) {
	return .08 * 90 ** clamp(normalized, 0, 1);
}
function detuneCents(normalized) {
	return clamp(normalized, 0, 1) * 38;
}
function arpIntervalSec(normalized) {
	const n = clamp(normalized, 0, 1);
	return .07 + (1 - n) * (1 - n) * .5;
}
function lfoDepthHz(amount) {
	return clamp(amount, 0, 1) * 2200;
}
var WAVE_GAIN = {
	sine: 1,
	triangle: .9,
	sawtooth: .52,
	square: .42,
	noise: .38
};
/** Physical key positions (e.code) — Ableton / FL-style two-octave layout. */
var KEY_BINDINGS = [
	{
		code: "KeyZ",
		offset: 0,
		label: "Z"
	},
	{
		code: "KeyS",
		offset: 1,
		label: "S"
	},
	{
		code: "KeyX",
		offset: 2,
		label: "X"
	},
	{
		code: "KeyD",
		offset: 3,
		label: "D"
	},
	{
		code: "KeyC",
		offset: 4,
		label: "C"
	},
	{
		code: "KeyV",
		offset: 5,
		label: "V"
	},
	{
		code: "KeyG",
		offset: 6,
		label: "G"
	},
	{
		code: "KeyB",
		offset: 7,
		label: "B"
	},
	{
		code: "KeyH",
		offset: 8,
		label: "H"
	},
	{
		code: "KeyN",
		offset: 9,
		label: "N"
	},
	{
		code: "KeyJ",
		offset: 10,
		label: "J"
	},
	{
		code: "KeyM",
		offset: 11,
		label: "M"
	},
	{
		code: "KeyQ",
		offset: 12,
		label: "Q"
	},
	{
		code: "Digit2",
		offset: 13,
		label: "2"
	},
	{
		code: "KeyW",
		offset: 14,
		label: "W"
	},
	{
		code: "Digit3",
		offset: 15,
		label: "3"
	},
	{
		code: "KeyE",
		offset: 16,
		label: "E"
	},
	{
		code: "KeyR",
		offset: 17,
		label: "R"
	},
	{
		code: "Digit5",
		offset: 18,
		label: "5"
	},
	{
		code: "KeyT",
		offset: 19,
		label: "T"
	},
	{
		code: "Digit6",
		offset: 20,
		label: "6"
	},
	{
		code: "KeyY",
		offset: 21,
		label: "Y"
	},
	{
		code: "Digit7",
		offset: 22,
		label: "7"
	},
	{
		code: "KeyU",
		offset: 23,
		label: "U"
	},
	{
		code: "KeyI",
		offset: 24,
		label: "I"
	}
];
var BINDING_BY_CODE = new Map(KEY_BINDINGS.map((b) => [b.code, b]));
var BINDING_BY_OFFSET = new Map(KEY_BINDINGS.map((b) => [b.offset, b]));
function buildPianoKeys(startMidi, octaves) {
	const count = octaves * 12 + 1;
	const keys = [];
	for (let offset = 0; offset < count; offset += 1) {
		const midi = startMidi + offset;
		keys.push({
			midi,
			name: midiToName(midi),
			black: isBlackKey(midi),
			offset,
			computerLabel: BINDING_BY_OFFSET.get(offset)?.label
		});
	}
	return keys;
}
var STORAGE_KEY = "lumen-synth-params-v2";
function loadStoredParams() {
	if (typeof window === "undefined") return DEFAULT_PARAMS;
	try {
		const raw = window.localStorage.getItem("lumen-synth-params-v2") ?? window.localStorage.getItem("lumen-synth-params-v1");
		if (!raw) return DEFAULT_PARAMS;
		const parsed = JSON.parse(raw);
		return {
			...DEFAULT_PARAMS,
			...parsed,
			octave: clamp(Math.round(parsed.octave ?? 0), -2, 3),
			preset: parsed.preset ?? "custom"
		};
	} catch {
		return DEFAULT_PARAMS;
	}
}
function saveStoredParams(params) {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
	} catch {}
}
function applyPreset(current, preset) {
	return {
		...DEFAULT_PARAMS,
		...preset.params,
		octave: current.octave,
		volume: current.volume,
		preset: preset.id
	};
}
function formatHz(hz) {
	if (hz >= 1e3) return `${(hz / 1e3).toFixed(1)} kHz`;
	return `${Math.round(hz)} Hz`;
}
function formatSeconds(seconds) {
	if (seconds < 1) return `${Math.round(seconds * 1e3)} ms`;
	return `${seconds.toFixed(2)} s`;
}
function formatPercent(normalized) {
	return `${Math.round(clamp(normalized, 0, 1) * 100)}%`;
}
function formatLfo(normalized) {
	const hz = lfoHz(normalized);
	if (hz < 1) return `${hz.toFixed(2)} Hz`;
	return `${hz.toFixed(1)} Hz`;
}
function midiFromPoint(x, y, root) {
	const hit = document.elementFromPoint(x, y);
	if (!(hit instanceof Element) || !root.contains(hit)) return null;
	const key = hit.closest("[data-midi]");
	if (!key || !root.contains(key)) return null;
	const midi = Number(key.getAttribute("data-midi"));
	return Number.isFinite(midi) ? midi : null;
}
function Keyboard({ startMidi, octaves, activeNotes, onNoteOn, onNoteOff, showComputerHints }) {
	const keys = (0, import_react.useMemo)(() => buildPianoKeys(startMidi, octaves), [startMidi, octaves]);
	const whites = keys.filter((key) => !key.black);
	const rootRef = (0, import_react.useRef)(null);
	const pointers = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const bindPointer = (pointerId, midi) => {
		const previous = pointers.current.get(pointerId);
		if (previous === midi) return;
		if (previous !== void 0) onNoteOff(previous);
		if (midi === null) {
			pointers.current.delete(pointerId);
			return;
		}
		pointers.current.set(pointerId, midi);
		onNoteOn(midi);
	};
	const onPointerDown = (event) => {
		if (event.button !== 0 && event.pointerType === "mouse") return;
		event.preventDefault();
		event.currentTarget.setPointerCapture(event.pointerId);
		const midi = midiFromPoint(event.clientX, event.clientY, event.currentTarget);
		bindPointer(event.pointerId, midi);
	};
	const onPointerMove = (event) => {
		if (!pointers.current.has(event.pointerId) && event.buttons === 0) return;
		const root = rootRef.current;
		if (!root) return;
		const midi = midiFromPoint(event.clientX, event.clientY, root);
		if (pointers.current.has(event.pointerId) || midi !== null) bindPointer(event.pointerId, midi);
	};
	const onPointerEnd = (event) => {
		bindPointer(event.pointerId, null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: rootRef,
		role: "group",
		"aria-label": "Piano keyboard",
		className: "relative isolate touch-none overflow-hidden rounded-lg bg-sunken p-1.5",
		onPointerDown,
		onPointerMove,
		onPointerUp: onPointerEnd,
		onPointerCancel: onPointerEnd,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex w-full",
			children: [whites.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-midi": key.midi,
				"data-active": activeNotes.has(key.midi) ? "true" : "false",
				"aria-label": key.name,
				"aria-pressed": activeNotes.has(key.midi),
				className: cn("piano-key piano-key-white"),
				onKeyDown: (event) => {
					if (event.key === " " || event.key === "Enter") {
						event.preventDefault();
						if (!event.repeat) onNoteOn(key.midi);
					}
				},
				onKeyUp: (event) => {
					if (event.key === " " || event.key === "Enter") {
						event.preventDefault();
						onNoteOff(key.midi);
					}
				},
				onBlur: () => {
					if (activeNotes.has(key.midi)) onNoteOff(key.midi);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs font-medium tabular-nums",
					children: key.name.startsWith("C") && !key.name.includes("#") ? key.name : ""
				}), showComputerHints && key.computerLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden text-xs tracking-wide opacity-50 sm:block",
					children: key.computerLabel
				}) : null]
			}, key.midi)), keys.filter((key) => key.black).map((key) => {
				const left = whites.filter((white) => white.midi < key.midi).length / whites.length * 100;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-midi": key.midi,
					"data-active": activeNotes.has(key.midi) ? "true" : "false",
					"aria-label": key.name,
					"aria-pressed": activeNotes.has(key.midi),
					className: cn("piano-key piano-key-black"),
					style: { left: `${left}%` },
					onKeyDown: (event) => {
						if (event.key === " " || event.key === "Enter") {
							event.preventDefault();
							if (!event.repeat) onNoteOn(key.midi);
						}
					},
					onKeyUp: (event) => {
						if (event.key === " " || event.key === "Enter") {
							event.preventDefault();
							onNoteOff(key.midi);
						}
					},
					onBlur: () => {
						if (activeNotes.has(key.midi)) onNoteOff(key.midi);
					},
					children: showComputerHints && key.computerLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs opacity-70 sm:block",
						children: key.computerLabel
					}) : null
				}, key.midi);
			})]
		})
	});
}
var START_ANGLE = -135;
var SWEEP = 270;
function Knob({ label, value, min = 0, max = 1, defaultValue, onChange, format, disabled = false }) {
	const id = (0, import_react.useId)();
	const drag = (0, import_react.useRef)(null);
	const normalized = (clamp(value, min, max) - min) / (max - min || 1);
	const angle = START_ANGLE + normalized * SWEEP;
	const updateFromDelta = (0, import_react.useCallback)((clientY, shiftKey) => {
		const start = drag.current;
		if (!start) return;
		const sensitivity = (max - min) / (shiftKey ? 420 : 140);
		onChange(clamp(start.value + (start.y - clientY) * sensitivity, min, max));
	}, [
		max,
		min,
		onChange
	]);
	const onPointerDown = (event) => {
		if (disabled) return;
		event.preventDefault();
		event.currentTarget.setPointerCapture(event.pointerId);
		drag.current = {
			y: event.clientY,
			value
		};
	};
	const onPointerMove = (event) => {
		if (!drag.current) return;
		event.preventDefault();
		updateFromDelta(event.clientY, event.shiftKey);
	};
	const endDrag = () => {
		drag.current = null;
	};
	const onKeyDown = (event) => {
		if (disabled) return;
		const step = (max - min) * (event.shiftKey ? .01 : .04);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-20 flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id,
			role: "slider",
			tabIndex: disabled ? -1 : 0,
			"aria-label": label,
			"aria-valuemin": min,
			"aria-valuemax": max,
			"aria-valuenow": Number(value.toFixed(3)),
			"aria-valuetext": format(value),
			"aria-disabled": disabled,
			className: cn("relative size-knob touch-none rounded-full outline-none", "focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface", disabled && "pointer-events-none opacity-40"),
			onPointerDown,
			onPointerMove,
			onPointerUp: endDrag,
			onPointerCancel: endDrag,
			onDoubleClick: () => onChange(defaultValue),
			onKeyDown,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "knob-dial absolute inset-0 rounded-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 100 100",
					className: "absolute inset-0 size-full",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "50",
						cy: "50",
						r: "42",
						fill: "none",
						stroke: "currentColor",
						className: "text-border",
						strokeWidth: "3.5",
						strokeDasharray: "198",
						strokeDashoffset: "50",
						strokeLinecap: "round",
						transform: "rotate(135 50 50)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "50",
						cy: "50",
						r: "42",
						fill: "none",
						stroke: "currentColor",
						className: "text-accent",
						strokeWidth: "3.5",
						strokeDasharray: `${normalized * 198} 198`,
						strokeLinecap: "round",
						transform: "rotate(135 50 50)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-3 rounded-full bg-raised shadow-panel",
					style: { transform: `rotate(${angle}deg)` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 left-1/2 h-2.5 w-0.5 -translate-x-1/2 rounded-full bg-fg" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs tabular-nums text-fg",
				children: format(value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: label
			})]
		})]
	});
}
function ScopePanel({ engine, active }) {
	const scopeRef = (0, import_react.useRef)(null);
	const meterRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
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
		const resize = (canvas) => {
			const ratio = Math.min(window.devicePixelRatio || 1, 2);
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
				canvas.width = Math.floor(width * ratio);
				canvas.height = Math.floor(height * ratio);
			}
			return {
				width,
				height,
				ratio
			};
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
				const y = timeData[i] / 255 * s.height;
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
			peakHold = Math.max(peak, peakHold * .96);
			const m = resize(meter);
			meterCtx.setTransform(m.ratio, 0, 0, m.ratio, 0, 0);
			meterCtx.clearRect(0, 0, m.width, m.height);
			const pad = 4;
			const innerH = m.height - 8;
			const fillH = innerH * Math.min(1, rms * 2.4);
			const holdY = pad + innerH * (1 - Math.min(1, peakHold));
			meterCtx.fillStyle = "rgb(13 13 12)";
			meterCtx.fillRect(0, 0, m.width, m.height);
			const grad = meterCtx.createLinearGradient(0, m.height, 0, 0);
			grad.addColorStop(0, "rgb(142 201 184)");
			grad.addColorStop(.75, "rgb(142 201 184)");
			grad.addColorStop(1, "rgb(240 238 232)");
			meterCtx.fillStyle = grad;
			meterCtx.fillRect(pad, pad + innerH - fillH, m.width - 8, fillH);
			meterCtx.fillStyle = "rgb(240 238 232)";
			meterCtx.fillRect(pad, holdY, m.width - 8, 2);
			frame = window.requestAnimationFrame(draw);
		};
		frame = window.requestAnimationFrame(draw);
		return () => {
			running = false;
			window.cancelAnimationFrame(frame);
		};
	}, [engine, active]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-24 gap-2 rounded-lg bg-sunken p-2 shadow-panel md:h-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-1 pb-1 font-mono text-xs tracking-wide text-faint uppercase",
				children: "Scope"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: scopeRef,
				className: "min-h-0 w-full flex-1",
				"aria-label": "Oscilloscope"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-7 flex-col md:w-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pb-1 text-center font-mono text-xs tracking-wide text-faint uppercase",
				children: "Lvl"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: meterRef,
				className: "min-h-0 w-full flex-1 rounded-sm",
				"aria-label": "Level meter"
			})]
		})]
	});
}
var COLS = {
	2: "grid-cols-2",
	3: "grid-cols-3",
	4: "grid-cols-4",
	5: "grid-cols-5"
};
function Segmented({ label, value, options, onChange }) {
	const cols = COLS[options.length] ?? "grid-cols-4";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": label,
		className: cn("grid gap-1 rounded-lg bg-sunken p-1", cols),
		children: options.map((option) => {
			const selected = option.id === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "radio",
				"aria-checked": selected,
				onClick: () => onChange(option.id),
				className: cn("flex h-11 min-w-0 items-center justify-center rounded-md px-2 text-xs font-medium transition-[background-color,color] duration-150 ease-out", selected ? "bg-raised text-fg shadow-panel" : "text-muted hover:text-fg"),
				children: option.label
			}, option.id);
		})
	});
}
function UnlockGate({ onUnlock }) {
	const unlock = (event) => {
		event.preventDefault();
		onUnlock();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-30 flex items-center justify-center bg-bg/80 p-6 md:absolute md:rounded-3xl",
		onPointerDown: unlock,
		onClick: unlock,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-w-sm flex-col items-center gap-5 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm tracking-[0.22em] text-muted uppercase",
							children: "Studio instrument"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl font-medium tracking-tight text-fg md:text-5xl",
							children: "Lumen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-pretty text-sm leading-relaxed text-muted",
							children: "Analog-style poly synth with delay, LFO, arpeggiator, and presets. Audio starts after you enable it."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "lg",
					className: "min-w-44",
					onClick: unlock,
					children: "Enable audio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-faint",
					children: "Click anywhere · or press a key"
				})
			]
		})
	});
}
var WAVES = [
	{
		id: "sine",
		label: "Sine"
	},
	{
		id: "triangle",
		label: "Tri"
	},
	{
		id: "sawtooth",
		label: "Saw"
	},
	{
		id: "square",
		label: "Sqr"
	},
	{
		id: "noise",
		label: "Noise"
	}
];
function WaveIcon({ type }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "h-5 w-7",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: type === "sine" ? "M2 12c3-8 5-8 8 0s5 8 8 0" : type === "triangle" ? "M2 16 L8 8 L14 16 L20 8" : type === "sawtooth" ? "M2 16 L2 8 L14 16 L14 8 L20 12" : type === "square" ? "M3 16 V8 H11 V16 H19 V8" : "M3 12 L6 7 L9 17 L12 8 L15 16 L18 9 L21 12",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function WaveformSelect({ value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": "Oscillator waveform",
		className: "grid grid-cols-5 gap-1 rounded-lg bg-sunken p-1",
		children: WAVES.map((wave) => {
			const selected = wave.id === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "radio",
				"aria-checked": selected,
				disabled,
				onClick: () => onChange(wave.id),
				className: cn("flex h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-md px-0.5 text-xs font-medium transition-[background-color,color,opacity] duration-150 ease-out", selected ? "bg-raised text-fg shadow-panel" : "text-muted hover:text-fg", disabled && "opacity-40"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveIcon, { type: wave.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: wave.label })]
			}, wave.id);
		})
	});
}
var MAX_VOICES = 12;
function createAudioContext() {
	return new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
}
function isOscillator(node) {
	return "frequency" in node;
}
var SynthEngine = class {
	ctx;
	analyser;
	master;
	compressor;
	voiceBus;
	dry;
	wet;
	delay;
	feedback;
	lfo;
	lfoDepth;
	noiseBuffer;
	live = /* @__PURE__ */ new Map();
	params;
	visibilityHandler = null;
	arpNotes = [];
	arpIndex = 0;
	arpTimer = null;
	arpNext = 0;
	arpSounding = null;
	arpListeners = /* @__PURE__ */ new Set();
	constructor(params) {
		this.params = params;
		this.ctx = createAudioContext();
		this.voiceBus = this.ctx.createGain();
		this.voiceBus.gain.value = 1;
		this.compressor = this.ctx.createDynamicsCompressor();
		this.compressor.threshold.value = -10;
		this.compressor.knee.value = 8;
		this.compressor.ratio.value = 3.5;
		this.compressor.attack.value = .004;
		this.compressor.release.value = .12;
		this.dry = this.ctx.createGain();
		this.wet = this.ctx.createGain();
		this.delay = this.ctx.createDelay(1);
		this.feedback = this.ctx.createGain();
		this.master = this.ctx.createGain();
		this.master.gain.value = volumeGain(params.volume);
		this.analyser = this.ctx.createAnalyser();
		this.analyser.fftSize = 2048;
		this.analyser.smoothingTimeConstant = .45;
		this.lfo = this.ctx.createOscillator();
		this.lfo.type = "sine";
		this.lfo.frequency.value = lfoHz(params.lfoRate);
		this.lfoDepth = this.ctx.createGain();
		this.lfoDepth.gain.value = lfoDepthHz(params.lfoAmount);
		this.lfo.connect(this.lfoDepth);
		this.lfo.start();
		this.noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate, this.ctx.sampleRate);
		const data = this.noiseBuffer.getChannelData(0);
		for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
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
	resume() {
		if (this.ctx.state === "suspended") this.ctx.resume();
	}
	subscribeArp(listener) {
		this.arpListeners.add(listener);
		listener(this.arpSounding);
		return () => {
			this.arpListeners.delete(listener);
		};
	}
	setParams(params) {
		const arpWasOn = this.params.arp;
		this.params = params;
		const now = this.ctx.currentTime;
		this.applyFx(params, now);
		const hz = cutoffHz(params.cutoff);
		const q = resonanceQ(params.resonance);
		const cents = detuneCents(params.detune);
		for (const voice of this.live.values()) {
			voice.filter.type = params.filterType;
			voice.filter.frequency.setTargetAtTime(hz, now, .025);
			voice.filter.Q.setTargetAtTime(q, now, .025);
			voice.sources.forEach((source, index) => {
				const sign = index === 0 ? 1 : -1;
				if (isOscillator(source) && params.waveform !== "noise") {
					source.type = params.waveform;
					source.detune.setTargetAtTime(sign * cents, now, .03);
				}
			});
		}
		if (params.arp && this.arpNotes.length > 0) this.startArpClock();
		if (!params.arp && arpWasOn) this.stopArpClock(true);
	}
	setArpNotes(notes) {
		this.arpNotes = [...notes];
		if (this.params.arp && this.arpNotes.length > 0) {
			this.startArpClock();
			return;
		}
		this.stopArpClock(true);
	}
	noteOn(midi, when) {
		this.resume();
		const startAt = when ?? this.ctx.currentTime;
		this.noteOff(midi, .01, startAt);
		if (this.live.size >= MAX_VOICES) {
			const oldest = this.live.keys().next().value;
			if (typeof oldest === "number") this.noteOff(oldest, .01, startAt);
		}
		const filter = this.ctx.createBiquadFilter();
		filter.type = this.params.filterType;
		filter.frequency.value = cutoffHz(this.params.cutoff);
		filter.Q.value = resonanceQ(this.params.resonance);
		const env = this.ctx.createGain();
		env.gain.value = 0;
		const cents = detuneCents(this.params.detune);
		const unison = cents > .4;
		const sources = [this.createSource(this.params.waveform, midi, unison ? cents : 0)];
		if (unison) sources.push(this.createSource(this.params.waveform, midi, -cents));
		const peak = .2 * WAVE_GAIN[this.params.waveform] * (unison ? .7 : 1);
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
			} catch {}
		}
		filter.connect(env);
		env.connect(this.voiceBus);
		this.lfoDepth.connect(filter.frequency);
		this.live.set(midi, {
			midi,
			sources,
			filter,
			env
		});
	}
	noteOff(midi, releaseOverride, when) {
		const voice = this.live.get(midi);
		if (!voice) return;
		this.live.delete(midi);
		const at = when ?? this.ctx.currentTime;
		const release = releaseOverride ?? envSeconds(this.params.release, 3.2);
		const hold = Math.max(release, .01);
		try {
			voice.env.gain.cancelAndHoldAtTime(at);
		} catch {
			voice.env.gain.cancelScheduledValues(at);
			voice.env.gain.setValueAtTime(voice.env.gain.value, at);
		}
		voice.env.gain.linearRampToValueAtTime(1e-4, at + hold);
		for (const source of voice.sources) try {
			source.stop(at + hold + .04);
		} catch {}
		const first = voice.sources[0];
		if (first) first.onended = () => {
			try {
				this.lfoDepth.disconnect(voice.filter.frequency);
			} catch {}
			try {
				for (const source of voice.sources) source.disconnect();
				voice.filter.disconnect();
				voice.env.disconnect();
			} catch {}
		};
	}
	allNotesOff() {
		this.stopArpClock(true);
		for (const midi of [...this.live.keys()]) this.noteOff(midi, .04);
	}
	dispose() {
		this.allNotesOff();
		this.stopArpClock(true);
		if (this.visibilityHandler) {
			document.removeEventListener("visibilitychange", this.visibilityHandler);
			window.removeEventListener("focus", this.visibilityHandler);
		}
		try {
			this.lfo.stop();
		} catch {}
		this.ctx.close();
	}
	applyFx(params, now) {
		this.master.gain.setTargetAtTime(volumeGain(params.volume), now, .03);
		this.delay.delayTime.setTargetAtTime(delaySeconds(params.delayTime), now, .04);
		this.feedback.gain.setTargetAtTime(params.delayFeedback * .86, now, .04);
		this.wet.gain.setTargetAtTime(params.delayMix * .7, now, .04);
		this.dry.gain.setTargetAtTime(1 - params.delayMix * .25, now, .04);
		this.lfo.frequency.setTargetAtTime(lfoHz(params.lfoRate), now, .05);
		this.lfoDepth.gain.setTargetAtTime(lfoDepthHz(params.lfoAmount), now, .05);
	}
	createSource(waveform, midi, cents) {
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
		osc.detune.value = cents + (Math.random() - .5) * 3;
		return osc;
	}
	startArpClock() {
		if (this.arpTimer !== null) return;
		this.arpNext = this.ctx.currentTime;
		this.tickArp();
	}
	stopArpClock(silence) {
		if (this.arpTimer !== null) {
			window.clearTimeout(this.arpTimer);
			this.arpTimer = null;
		}
		if (silence && this.arpSounding !== null) {
			this.noteOff(this.arpSounding, .05);
			this.arpSounding = null;
			this.emitArp(null);
		}
	}
	tickArp = () => {
		if (!this.params.arp || this.arpNotes.length === 0) {
			this.stopArpClock(true);
			return;
		}
		const now = this.ctx.currentTime;
		const horizon = now + .12;
		const step = arpIntervalSec(this.params.arpRate);
		while (this.arpNext < horizon) {
			if (this.arpNext >= now - .02) this.stepArp(this.arpNext);
			this.arpNext += step;
		}
		this.arpTimer = window.setTimeout(this.tickArp, 25);
	};
	stepArp(when) {
		const notes = this.arpNotes;
		if (notes.length === 0) return;
		const midi = this.nextArpMidi(notes);
		if (this.arpSounding !== null) this.noteOff(this.arpSounding, .04, when);
		this.noteOn(midi, when);
		this.arpSounding = midi;
		this.emitArp(midi);
	}
	nextArpMidi(notes) {
		const sorted = [...notes].sort((a, b) => a - b);
		const mode = this.params.arpMode;
		if (mode === "random") return sorted[Math.floor(Math.random() * sorted.length)] ?? sorted[0];
		if (mode === "up") {
			this.arpIndex = this.arpIndex % sorted.length;
			const midi = sorted[this.arpIndex];
			this.arpIndex += 1;
			return midi;
		}
		if (mode === "down") {
			const rev = [...sorted].reverse();
			this.arpIndex = this.arpIndex % rev.length;
			const midi = rev[this.arpIndex];
			this.arpIndex += 1;
			return midi;
		}
		if (sorted.length === 1) return sorted[0];
		const cycle = [...sorted, ...sorted.slice(1, -1).reverse()];
		this.arpIndex = this.arpIndex % cycle.length;
		const midi = cycle[this.arpIndex];
		this.arpIndex += 1;
		return midi;
	}
	emitArp(midi) {
		for (const listener of this.arpListeners) listener(midi);
	}
};
var engine = null;
function unlockEngine(params) {
	if (!engine) engine = new SynthEngine(params);
	engine.resume();
	engine.setParams(params);
	return engine;
}
function getEngine() {
	return engine;
}
var FILTER_OPTIONS = [
	{
		id: "lowpass",
		label: "LP"
	},
	{
		id: "highpass",
		label: "HP"
	},
	{
		id: "bandpass",
		label: "BP"
	}
];
var ARP_OPTIONS = [
	{
		id: "up",
		label: "Up"
	},
	{
		id: "down",
		label: "Down"
	},
	{
		id: "updown",
		label: "Bounce"
	},
	{
		id: "random",
		label: "Rand"
	}
];
function SynthApp() {
	const [params, setParams] = (0, import_react.useState)(DEFAULT_PARAMS);
	const [unlocked, setUnlocked] = (0, import_react.useState)(false);
	const [activeNotes, setActiveNotes] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const [octaves, setOctaves] = (0, import_react.useState)(2);
	const [lastNote, setLastNote] = (0, import_react.useState)("—");
	const [arpNote, setArpNote] = (0, import_react.useState)(null);
	const [sustainOn, setSustainOn] = (0, import_react.useState)(false);
	const [midiLabel, setMidiLabel] = (0, import_react.useState)(null);
	const engineRef = (0, import_react.useRef)(null);
	const paramsRef = (0, import_react.useRef)(params);
	const startMidiRef = (0, import_react.useRef)(48);
	const countsRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const heldCodesRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const physicalRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const activeNotesRef = (0, import_react.useRef)(activeNotes);
	const sustainRef = (0, import_react.useRef)(false);
	paramsRef.current = params;
	activeNotesRef.current = activeNotes;
	const startMidi = 48 + params.octave * 12;
	startMidiRef.current = startMidi;
	const topMidi = startMidi + octaves * 12;
	const litNotes = (0, import_react.useMemo)(() => {
		const next = new Set(activeNotes);
		if (arpNote !== null) next.add(arpNote);
		return next;
	}, [activeNotes, arpNote]);
	const unlock = (0, import_react.useCallback)(() => {
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
	const patch = (0, import_react.useCallback)((partial, fromPreset = false) => {
		setParams((prev) => {
			const performanceOnly = Object.keys(partial).every((key) => key === "octave" || key === "volume");
			const next = {
				...prev,
				...partial,
				preset: fromPreset || performanceOnly ? partial.preset ?? prev.preset : "custom"
			};
			engineRef.current?.setParams(next);
			saveStoredParams(next);
			return next;
		});
	}, []);
	const heldForLatch = (0, import_react.useCallback)(() => {
		const held = new Set(physicalRef.current);
		if (sustainRef.current || paramsRef.current.arpHold) for (const midi of activeNotesRef.current) held.add(midi);
		return [...held];
	}, []);
	const noteOn = (0, import_react.useCallback)((midi) => {
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
			if (paramsRef.current.arp) engine.setArpNotes(heldForLatch());
			else engine.noteOn(midi);
		}
		setLastNote(midiToName(midi));
	}, [heldForLatch, unlock]);
	const flushReleased = (0, import_react.useCallback)(() => {
		if (sustainRef.current || paramsRef.current.arpHold) {
			if (paramsRef.current.arp) engineRef.current?.setArpNotes(heldForLatch());
			return;
		}
		setActiveNotes((prev) => {
			const next = /* @__PURE__ */ new Set();
			for (const midi of prev) if (physicalRef.current.has(midi)) next.add(midi);
			else if (!paramsRef.current.arp) engineRef.current?.noteOff(midi);
			if (paramsRef.current.arp) engineRef.current?.setArpNotes([...next]);
			return next;
		});
	}, [heldForLatch]);
	const noteOff = (0, import_react.useCallback)((midi) => {
		const nextCount = (countsRef.current.get(midi) ?? 0) - 1;
		if (nextCount > 0) {
			countsRef.current.set(midi, nextCount);
			return;
		}
		countsRef.current.delete(midi);
		physicalRef.current.delete(midi);
		if (sustainRef.current || paramsRef.current.arp && paramsRef.current.arpHold) {
			if (paramsRef.current.arp) engineRef.current?.setArpNotes(heldForLatch());
			return;
		}
		if (paramsRef.current.arp) {
			const remaining = [...activeNotesRef.current].filter((value) => value !== midi);
			engineRef.current?.setArpNotes(remaining.filter((value) => physicalRef.current.has(value) || paramsRef.current.arpHold));
		} else engineRef.current?.noteOff(midi);
		setActiveNotes((prev) => {
			if (!prev.has(midi)) return prev;
			const next = new Set(prev);
			next.delete(midi);
			return next;
		});
	}, [heldForLatch]);
	const setSustain = (0, import_react.useCallback)((on) => {
		sustainRef.current = on;
		setSustainOn(on);
		if (!on) flushReleased();
	}, [flushReleased]);
	const releaseAll = (0, import_react.useCallback)(() => {
		engineRef.current?.allNotesOff();
		countsRef.current.clear();
		heldCodesRef.current.clear();
		physicalRef.current.clear();
		setActiveNotes((prev) => prev.size === 0 ? prev : /* @__PURE__ */ new Set());
		setArpNote(null);
	}, []);
	const toggleArp = (0, import_react.useCallback)((on) => {
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
	}, [heldForLatch, patch]);
	const toggleHold = (0, import_react.useCallback)((on) => {
		patch({ arpHold: on });
		if (!on) flushReleased();
	}, [flushReleased, patch]);
	(0, import_react.useEffect)(() => {
		setParams(loadStoredParams());
	}, []);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		const apply = () => setOctaves(mq.matches ? 2 : 1);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	(0, import_react.useEffect)(() => {
		releaseAll();
	}, [
		params.octave,
		octaves,
		releaseAll
	]);
	(0, import_react.useEffect)(() => {
		const engine = engineRef.current;
		if (!unlocked || !engine) return;
		return engine.subscribeArp(setArpNote);
	}, [unlocked]);
	(0, import_react.useEffect)(() => {
		if (!unlocked) return;
		if (typeof navigator.requestMIDIAccess !== "function") return;
		let cancelled = false;
		navigator.requestMIDIAccess().then((access) => {
			if (cancelled) return;
			const handle = (event) => {
				const data = event.data;
				if (!data || data.length < 2) return;
				const status = data[0] ?? 0;
				const data1 = data[1] ?? 0;
				const data2 = data[2] ?? 0;
				const cmd = status & 240;
				if (cmd === 144 && data2 > 0) noteOn(data1);
				else if (cmd === 128 || cmd === 144 && data2 === 0) noteOff(data1);
				else if (cmd === 176 && data1 === 64) setSustain(data2 >= 64);
				else if (cmd === 176 && data1 === 1) patch({ lfoAmount: data2 / 127 });
			};
			for (const input of access.inputs.values()) input.onmidimessage = handle;
			setMidiLabel(access.inputs.size > 0 ? `MIDI ${access.inputs.size}` : null);
		}).catch(() => {
			if (!cancelled) setMidiLabel(null);
		});
		return () => {
			cancelled = true;
		};
	}, [
		noteOff,
		noteOn,
		patch,
		setSustain,
		unlocked
	]);
	(0, import_react.useEffect)(() => {
		const onDown = (event) => {
			if (event.metaKey || event.ctrlKey || event.altKey) return;
			const target = event.target;
			if (target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
			if (event.code === "Space") {
				event.preventDefault();
				if (event.repeat) return;
				setSustain(true);
				return;
			}
			if (event.code === "Minus" || event.code === "NumpadSubtract") {
				event.preventDefault();
				if (event.repeat) return;
				patch({ octave: clamp(paramsRef.current.octave - 1, -2, 3) });
				return;
			}
			if (event.code === "Equal" || event.code === "NumpadAdd") {
				event.preventDefault();
				if (event.repeat) return;
				patch({ octave: clamp(paramsRef.current.octave + 1, -2, 3) });
				return;
			}
			const binding = BINDING_BY_CODE.get(event.code);
			if (!binding) return;
			event.preventDefault();
			if (event.repeat || heldCodesRef.current.has(event.code)) return;
			heldCodesRef.current.add(event.code);
			noteOn(startMidiRef.current + binding.offset);
		};
		const onUp = (event) => {
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
	}, [
		noteOff,
		noteOn,
		patch,
		releaseAll,
		setSustain
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-end p-3 md:justify-center md:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative flex flex-col gap-3 rounded-2xl bg-surface p-3 pb-48 shadow-panel select-none md:gap-4 md:rounded-3xl md:p-4 md:pb-4",
				children: [
					!unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnlockGate, { onUnlock: unlock }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-wrap items-center gap-x-4 gap-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mr-auto flex items-baseline gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `size-2 rounded-full bg-accent ${unlocked ? "opacity-100" : "opacity-25"}`,
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg font-medium tracking-tight",
										children: "Lumen"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-sm text-muted sm:inline",
									children: "Analog poly synth"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden font-mono text-sm tabular-nums text-muted sm:block",
								"aria-live": "polite",
								children: lastNote
							}),
							sustainOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tracking-wide text-accent uppercase",
								children: "Sustain"
							}) : null,
							params.arp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tracking-wide text-accent uppercase",
								children: "Arp"
							}) : null,
							midiLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden font-mono text-xs text-faint md:inline",
								children: midiLabel
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "icon",
										className: "size-11",
										"aria-label": "Octave down",
										onClick: () => patch({ octave: clamp(params.octave - 1, -2, 3) }),
										disabled: params.octave <= -2,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-20 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-mono text-sm tabular-nums text-fg",
											children: [
												midiToName(startMidi),
												"–",
												midiToName(topMidi)
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs tracking-wide text-muted uppercase",
											children: "Octave"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "icon",
										className: "size-11",
										"aria-label": "Octave up",
										onClick: () => patch({ octave: clamp(params.octave + 1, -2, 3) }),
										disabled: params.octave >= 3,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex w-40 min-w-36 items-center gap-2 md:w-48",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									id: "lumen-vol-label",
									className: "text-xs font-medium tracking-wide text-muted uppercase",
									children: "Vol"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 0,
									max: 1,
									step: .01,
									value: [params.volume],
									onValueChange: ([volume]) => patch({ volume: volume ?? 0 }),
									"aria-labelledby": "lumen-vol-label"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-mx-1 flex gap-1 overflow-x-auto px-1",
						children: PRESETS.map((preset) => {
							const selected = params.preset === preset.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: selected ? "default" : "secondary",
								size: "sm",
								className: "h-11 shrink-0 px-3",
								onClick: () => {
									const next = applyPreset(params, preset);
									const engine = engineRef.current;
									engine?.setParams(next);
									if (next.arp) {
										engine?.allNotesOff();
										engine?.setArpNotes(heldForLatch());
									} else engine?.setArpNotes([]);
									setParams(next);
									saveStoredParams(next);
								},
								children: preset.name
							}, preset.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScopePanel, {
							engine: engineRef.current,
							active: unlocked
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-center gap-2 rounded-lg bg-sunken p-2 shadow-panel",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "px-1 font-mono text-xs tracking-wide text-faint uppercase",
									children: "Oscillator"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveformSelect, {
									value: params.waveform,
									onChange: (waveform) => patch({ waveform })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
									label: "Filter type",
									value: params.filterType,
									options: FILTER_OPTIONS,
									onChange: (filterType) => patch({ filterType })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-evenly gap-x-4 gap-y-4 rounded-lg bg-sunken px-2 pt-3 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide text-muted uppercase",
									children: "Filter"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											label: "Cut",
											value: params.cutoff,
											defaultValue: DEFAULT_PARAMS.cutoff,
											onChange: (cutoff) => patch({ cutoff }),
											format: (value) => formatHz(cutoffHz(value))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											label: "Res",
											value: params.resonance,
											defaultValue: DEFAULT_PARAMS.resonance,
											onChange: (resonance) => patch({ resonance }),
											format: (value) => resonanceQ(value).toFixed(1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											label: "Detune",
											value: params.detune,
											defaultValue: DEFAULT_PARAMS.detune,
											onChange: (detune) => patch({ detune }),
											format: (value) => `${Math.round(detuneCents(value))} c`
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide text-muted uppercase",
									children: "Envelope"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											label: "A",
											value: params.attack,
											defaultValue: DEFAULT_PARAMS.attack,
											onChange: (attack) => patch({ attack }),
											format: (value) => formatSeconds(envSeconds(value, 2))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											label: "D",
											value: params.decay,
											defaultValue: DEFAULT_PARAMS.decay,
											onChange: (decay) => patch({ decay }),
											format: (value) => formatSeconds(envSeconds(value, 2.2))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											label: "S",
											value: params.sustain,
											defaultValue: DEFAULT_PARAMS.sustain,
											onChange: (sustain) => patch({ sustain }),
											format: formatPercent
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											label: "R",
											value: params.release,
											defaultValue: DEFAULT_PARAMS.release,
											onChange: (release) => patch({ release }),
											format: (value) => formatSeconds(envSeconds(value, 3.2))
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide text-muted uppercase",
									children: "LFO"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
										label: "Rate",
										value: params.lfoRate,
										defaultValue: DEFAULT_PARAMS.lfoRate,
										onChange: (lfoRate) => patch({ lfoRate }),
										format: formatLfo
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
										label: "Amt",
										value: params.lfoAmount,
										defaultValue: DEFAULT_PARAMS.lfoAmount,
										onChange: (lfoAmount) => patch({ lfoAmount }),
										format: formatPercent
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide text-muted uppercase",
									children: "Delay"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											label: "Time",
											value: params.delayTime,
											defaultValue: DEFAULT_PARAMS.delayTime,
											onChange: (delayTime) => patch({ delayTime }),
											format: (value) => formatSeconds(delaySeconds(value))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											label: "Fbk",
											value: params.delayFeedback,
											defaultValue: DEFAULT_PARAMS.delayFeedback,
											onChange: (delayFeedback) => patch({ delayFeedback }),
											format: formatPercent
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
											label: "Mix",
											value: params.delayMix,
											defaultValue: DEFAULT_PARAMS.delayMix,
											onChange: (delayMix) => patch({ delayMix }),
											format: formatPercent
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 rounded-lg bg-sunken p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: params.arp ? "default" : "secondary",
								"aria-pressed": params.arp,
								onClick: () => toggleArp(!params.arp),
								children: "Arp"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: params.arpHold ? "default" : "secondary",
								"aria-pressed": params.arpHold,
								disabled: !params.arp,
								onClick: () => toggleHold(!params.arpHold),
								children: "Hold"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-52 flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
									label: "Arpeggio pattern",
									value: params.arpMode,
									options: ARP_OPTIONS,
									onChange: (arpMode) => patch({ arpMode })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
								label: "Speed",
								value: params.arpRate,
								defaultValue: DEFAULT_PARAMS.arpRate,
								onChange: (arpRate) => patch({ arpRate }),
								format: (value) => formatSeconds(arpIntervalSec(value)),
								disabled: !params.arp
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fixed inset-x-0 bottom-0 z-10 bg-surface px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:static md:bg-transparent md:px-0 md:pt-0 md:pb-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, {
							startMidi,
							octaves,
							activeNotes: litNotes,
							onNoteOn: noteOn,
							onNoteOff: noteOff,
							showComputerHints: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 hidden text-center text-xs text-faint md:block",
							children: "Z–M / Q–I play notes · space sustains · − / = octave · MIDI keyboards connect after enable"
						})]
					})
				]
			})
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SynthApp, {});
}
//#endregion
export { Home as component };
