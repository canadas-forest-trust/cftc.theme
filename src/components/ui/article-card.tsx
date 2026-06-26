import { Heading } from "./heading";
import { Text } from "./text";
import { Badge } from "./badge";

const STRIPES =
  "repeating-linear-gradient(45deg, var(--color-paper-300) 0 10px, var(--color-paper-200) 10px 20px)";

export interface ArticleCardProps {
  image?: string;
  /** Category tag overlaid on the thumbnail, e.g. "ARTICLE". */
  tag?: string;
  title: string;
  excerpt?: string;
  href?: string;
  /** Link label; defaults to "Read more". */
  actionLabel?: string;
  className?: string;
}

/**
 * ArticleCard — thumbnail (with category tag) + title + excerpt + read-more,
 * used in the Learning Centre and marketing-asset grids.
 */
export function ArticleCard({
  image,
  tag,
  title,
  excerpt,
  href = "#",
  actionLabel = "Read more",
  className,
}: ArticleCardProps) {
  return (
    <article className={["flex flex-col border border-hairline bg-panel", className ?? ""].join(" ")}>
      <div
        className="relative aspect-[16/10] w-full"
        style={
          image
            ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { backgroundImage: STRIPES }
        }
      >
        {tag && (
          <Badge variant="solid" className="absolute left-3 top-3">
            {tag}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Heading size="sm" as="h3">
          {title}
        </Heading>
        {excerpt && (
          <Text size="sm" tone="muted" className="flex-1">
            {excerpt}
          </Text>
        )}
        <a
          href={href}
          className="font-eyebrow text-xs uppercase tracking-wide text-accent transition-colors hover:text-accent-strong"
        >
          {actionLabel} →
        </a>
      </div>
    </article>
  );
}
