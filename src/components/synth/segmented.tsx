import { cn } from "@/lib/utils";

type Option<T extends string> = { id: T; label: string };

type SegmentedProps<T extends string> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (id: T) => void;
};

const COLS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
};

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedProps<T>) {
  const cols = COLS[options.length] ?? "grid-cols-4";
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("grid gap-1 rounded-lg bg-sunken p-1", cols)}
    >
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              "flex h-11 min-w-0 items-center justify-center rounded-md px-2 text-xs font-medium transition-[background-color,color] duration-150 ease-out",
              selected ? "bg-raised text-fg shadow-panel" : "text-muted hover:text-fg",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
