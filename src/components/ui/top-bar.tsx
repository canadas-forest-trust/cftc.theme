import { cn } from "../../lib/cn";

export interface NavItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface TopBarProps {
  /** Canada's Forest Trust mark (left). */
  cftMark: React.ReactNode;
  /** Partner organisation mark (co-brand). */
  partnerMark?: React.ReactNode;
  nav?: NavItem[];
  /** Account avatar — typically 2-letter initials. */
  accountInitials?: string;
  className?: string;
}

/**
 * TopBar — the co-branded header: CFT mark · partner mark · nav · account.
 * Layout primitive reused by the portal and the staff admin shells.
 */
export function TopBar({ cftMark, partnerMark, nav = [], accountInitials, className }: TopBarProps) {
  return (
    <header
      className={cn(
        // mobile-first: marks + avatar on row 1, nav wraps to a scrollable row 2;
        // inline on md+.
        "flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-hairline bg-canvas px-4 py-4 md:flex-nowrap md:px-6",
        className,
      )}
    >
      <div className="order-1 flex items-center gap-3 md:gap-4">
        <div className="shrink-0">{cftMark}</div>
        {partnerMark && (
          <>
            <span className="h-8 w-px bg-hairline" aria-hidden="true" />
            <div className="shrink-0">{partnerMark}</div>
          </>
        )}
      </div>

      {accountInitials && (
        <span className="order-2 ml-auto grid size-9 shrink-0 place-items-center bg-accent font-eyebrow text-xs uppercase tracking-wide text-accent-fg md:order-3">
          {accountInitials}
        </span>
      )}

      {nav.length > 0 && (
        <nav
          className="order-3 -mx-4 flex w-full basis-full items-center gap-6 overflow-x-auto px-4 md:order-2 md:mx-0 md:ml-6 md:w-auto md:basis-auto md:overflow-visible md:px-0"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#"}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "whitespace-nowrap font-eyebrow text-xs uppercase tracking-wide leading-tight transition-colors",
                item.active
                  ? "text-ink border-b border-accent pb-0.5"
                  : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
