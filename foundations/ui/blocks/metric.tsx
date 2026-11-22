import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MetricDelta = {
  /** The change as a fraction: 0.12 for +12%. */
  value: number;
  /** What it is compared with, in words: "last month". */
  comparedTo: string;
  /** True for costs and other figures where going down is good. */
  inverted?: boolean;
};

/**
 * One metric tile. The label is the shortest noun the page allows ("Total", not "Total users").
 * Wide screens show the icon and the delta's figure; phones drop the icon and keep only the
 * delta's arrow in its colour, with the figure in the tooltip and accessible name. A tile with
 * a delta is exactly as tall as one without. See the adaptive-density skill.
 */
export function Metric({
  label,
  value,
  icon: Icon,
  delta,
  className,
}: {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
  /** Omit when there is no previous period. Never pass 0 for missing data. */
  delta?: MetricDelta;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 rounded-card border border-line bg-surface p-4 shadow-card", className)}>
      <div className="flex items-center gap-2 text-label text-ink-muted">
        {Icon ? <Icon className="hidden size-4 shrink-0 sm:block" aria-hidden="true" /> : null}
        <span className="truncate">{label}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="truncate text-title font-semibold tracking-tight text-ink tabular-nums">{value}</span>
        {delta ? <Delta {...delta} /> : null}
      </div>
    </div>
  );
}

const percent = new Intl.NumberFormat(undefined, { style: "percent", maximumFractionDigits: 1 });

function Delta({ value, comparedTo, inverted = false }: MetricDelta) {
  const up = value > 0;
  const flat = value === 0;
  const good = flat ? null : up !== inverted;
  const Arrow = up ? ArrowUp : ArrowDown;
  const figure = percent.format(Math.abs(value));
  const name = flat ? `No change compared with ${comparedTo}` : `${up ? "Up" : "Down"} ${figure} compared with ${comparedTo}`;
  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 text-meta font-medium tabular-nums",
        good === null ? "text-neutral" : good ? "text-success" : "text-error",
      )}
    >
      {flat ? null : <Arrow className="size-3.5" aria-hidden="true" />}
      <span className={cn(flat ? "inline" : "hidden sm:inline")} aria-hidden="true">
        {flat ? "0%" : figure}
      </span>
    </span>
  );
}

/** Metric tiles: two per row on phones, up to four per row on wide screens. */
export function MetricGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-2 gap-3 xl:grid-cols-4", className)}>{children}</div>;
}
