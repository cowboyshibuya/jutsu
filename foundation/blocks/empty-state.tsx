import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * An empty view: an icon, a title, and the next valid action. The title says what will appear
 * or what to do; it does not repeat a zero the page title already states. No looping or pulsing.
 */
export function EmptyState({
  icon: Icon,
  title,
  action,
  className,
}: {
  icon: LucideIcon;
  /** "Shifts you start appear here", not "No shifts" under a title that already says it. */
  title: string;
  /** The next valid action, when there is one. */
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-line-strong bg-subtle px-6 py-12 text-center",
        className,
      )}
    >
      <Icon className="size-6 text-ink-muted" aria-hidden="true" />
      <p className="max-w-sm text-body text-ink-secondary text-balance">{title}</p>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
