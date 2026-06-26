/**
 * Minimal className joiner. tailwind-variants handles variant logic in each
 * component; this just filters falsy values for ad-hoc composition.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
