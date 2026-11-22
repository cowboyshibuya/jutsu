import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The page header. The title is the page's primary fact ("42 shifts this week"), not its name;
 * the name is the eyebrow, unless the app's breadcrumb already shows it. No description: the
 * subtitle is only for an exact custom date range or a consequence the reader cannot guess.
 * See the explicit-titles skill.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  children,
  className,
}: {
  /** The page name, or a record's kind or reference. Omit when a breadcrumb already says it. */
  eyebrow?: ReactNode;
  /** The primary fact. Pass a skeleton while loading, never a zero. */
  title: ReactNode;
  /** Only an exact date range or a consequence the reader cannot guess. */
  subtitle?: ReactNode;
  /** One primary action at most; see PageHeaderAction. */
  action?: ReactNode;
  /** A period bar, tabs or filters that belong to the header. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col gap-4 pb-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="mb-1 text-meta font-medium uppercase tracking-wider text-ink-muted">{eyebrow}</p>
          ) : null}
          <h1 className="text-title font-semibold tracking-tight text-ink tabular-nums text-balance">{title}</h1>
          {subtitle ? <p className="mt-1 text-label text-ink-muted">{subtitle}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </header>
  );
}

/**
 * The header's one primary action, collapsing as space shrinks: "+ New note" on wide screens,
 * "+ New" on medium, "+" on phones. The full label stays the accessible name and tooltip.
 */
export function PageHeaderAction({
  label,
  shortLabel,
  icon: Icon,
  onClick,
  className,
}: {
  label: string;
  shortLabel?: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-control bg-action px-3 text-label font-medium text-action-text sm:min-h-9 sm:min-w-9",
        "outline-none focus-visible:ring-2 focus-visible:ring-focus active:scale-[0.97] motion-reduce:active:scale-100",
        className,
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      {shortLabel ? <span className="hidden sm:inline lg:hidden">{shortLabel}</span> : null}
      <span className={shortLabel ? "hidden lg:inline" : "hidden sm:inline"}>{label}</span>
    </button>
  );
}
