import { Eyebrow } from "./eyebrow";
import { Display } from "./display";

const STRIPES =
  "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 8px, transparent 8px 16px)";

export interface MediaCardProps {
  /** Background image URL. Falls back to a dark striped panel. */
  image?: string;
  eyebrow?: string;
  title: string;
  /** Trailing action, typically a link ("READ THE STORY →"). */
  action?: React.ReactNode;
  /** Drop a <Ribbon /> here for a corner tag. */
  ribbon?: React.ReactNode;
  className?: string;
}

/**
 * MediaCard — dark photo card with overlaid eyebrow + display title (the
 * "Let's get growing" / forest-panorama hero blocks).
 */
export function MediaCard({ image, eyebrow, title, action, ribbon, className }: MediaCardProps) {
  return (
    <div
      className={[
        "relative flex min-h-56 flex-col justify-end overflow-hidden bg-dark p-6",
        className ?? "",
      ].join(" ")}
      style={
        image
          ? { backgroundImage: `linear-gradient(rgba(23,21,15,0.35), rgba(23,21,15,0.7)), url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }
          : { backgroundImage: STRIPES }
      }
    >
      {ribbon}
      <div className="flex flex-col gap-2">
        {eyebrow && (
          <span className="font-eyebrow text-xs uppercase tracking-wide text-inverse/70">
            {eyebrow}
          </span>
        )}
        <Display as="div" size="md" tone="inverse">
          {title}
        </Display>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}
