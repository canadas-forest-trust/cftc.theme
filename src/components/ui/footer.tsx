export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterProps {
  copyright: string;
  links?: FooterLink[];
  className?: string;
}

/** Footer — copyright + monospace nav links on a hairline top rule. */
export function Footer({ copyright, links = [], className }: FooterProps) {
  return (
    <footer
      className={[
        "flex flex-col gap-4 border-t border-hairline bg-canvas px-4 py-6 sm:flex-row sm:items-center sm:justify-between md:px-6",
        className ?? "",
      ].join(" ")}
    >
      <span className="font-eyebrow text-xs uppercase tracking-wide text-muted">{copyright}</span>
      {links.length > 0 && (
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href ?? "#"}
              className="font-eyebrow text-xs uppercase tracking-wide text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </footer>
  );
}
