# cftc.theme

Design tokens and component base for **Canada's Forest Trust** — the single source
of truth for the partner portal and staff admin. Editorial / Swiss-minimal:
monospace eyebrow labels, oversized grotesque display numerals, forest-green accent,
cream canvas, square corners, hairline rules.

This repo is the **design handoff**: the tokens, the compiled CSS variables, and a
living Storybook of every component. There is no hand-written component CSS — every
style is a token-bound Tailwind utility.

## How it flows

```
tokens/**/*.json   ──Style Dictionary──▶   src/styles/tokens.css   ──@theme inline──▶   Tailwind utilities
(DTCG source of truth)                     (:root CSS variables)                        (bg-canvas, text-ink, …)
```

1. **`tokens/core/*.json`** — primitives (raw palette, type scale, spacing, radii, borders).
2. **`tokens/semantic/*.json`** — intent aliases that reference core (`color.bg.canvas`,
   `color.accent.default`, `font.role.eyebrow`, …). Screens consume the semantic layer.
   Partner theming hooks in here: override `color.accent.*` to re-skin per partner.
3. **`pnpm tokens:build`** runs Style Dictionary → `src/styles/tokens.css` (`:root`
   custom properties; semantic vars reference core vars via `var()`).
4. **`src/styles/theme.css`** imports Tailwind v4 + fonts + the generated tokens, then
   binds Tailwind's `@theme` to those vars. Change a token, rebuild, and every component
   re-themes with zero component edits.

## Develop

```bash
pnpm install
pnpm storybook        # runs tokens:build, then Storybook at :6006 (the handoff)
pnpm build-storybook  # static handoff site -> storybook-static/
```

`src/styles/tokens.css` is generated and git-ignored — it is built on demand.

## Consume from an app

Published to **GitHub Packages** as `@canadas-forest-trust/theme` (requires a
`.npmrc` pointing the scope at `npm.pkg.github.com` with a token that has
`read:packages`). In a Tailwind v4 app:

```ts
import "@canadas-forest-trust/theme/theme.css";   // tokens + Tailwind + fonts, once
import { Button, Stat, TopBar } from "@canadas-forest-trust/theme";
```

The consuming app must let Tailwind scan the package so component utilities are
generated — add to its CSS: `@source "../node_modules/@canadas-forest-trust/theme/src";`
and `@source` the package via `transpilePackages: ["@canadas-forest-trust/theme"]`
in `next.config`.

Fonts: **Archivo** (display/UI) + **Space Mono** (eyebrow labels & data), self-hosted
via `@fontsource`. Aligned to the Campaign Page Customizer POC.

### Admin theme

Staff admin uses a separate preset scoped to `[data-app="admin"]`:

```ts
import "@canadas-forest-trust/theme/theme.css";   // portal tokens
import "@canadas-forest-trust/theme/admin.css";    // admin preset (dark, interface typography)
```

Admin semantic tokens live in `tokens/semantic-admin/` → `src/styles/admin.tokens.css`.
Admin uses **IBM Plex Sans** + **IBM Plex Mono** (paired ops UI). Portal keeps
**Archivo** + **Space Mono** for the editorial brand surface.

## Components

**Typography** — `Eyebrow` · `Label` · `Display` · `Heading` · `Text`
**Forms** — `Button` · `Input` (underline/box + error) · `Textarea` · `Select` · `Checkbox` · `Radio` · `Switch` · `ColorField` · `FileUpload` · `Slider` · `OtpInput` · `CopyField`
**Layout & feedback** — `Panel` · `Divider` · `SectionHeader` · `PageHeader` · `AdminSection` · `WorkQueue` · `StatStrip` · `Alert` · `Modal` · `SegmentedControl` · `Pagination` · `Accordion` · `TopBar` · `Footer`
**Data & media** — `Stat` · `ProgressBar` · `DataList` · `DataListLink` · `DistributionBar` · `Legend` · `Badge` · `Ribbon` · `MediaCard` · `ArticleCard` · `SdgCard` · `QuizCard` · `CategoryCard` · `SpeciesGrid` · `Avatar` · `Skeleton`

`DataList` is framed by default; rows are focusable `div`s (not nested `<button>`s) so entity cells can use `DataListLink` (`as={Link}` for Next) without invalid HTML. Prefer `DataListLink` over plain text for admin entity names that navigate.

Most ship a `tailwind-variants` recipe (exported alongside the component) so variants
are typed and composable. See the Storybook for every variant and state.
