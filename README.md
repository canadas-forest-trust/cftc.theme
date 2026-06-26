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

```ts
import "cftc.theme/theme.css";          // tokens + Tailwind + fonts, once
import { Button, Stat, TopBar } from "cftc.theme";
```

## Components

`Eyebrow` · `Display` · `Heading` · `Text` · `Button` · `Input` · `OtpInput` ·
`Panel` · `Stat` · `ProgressBar` · `Divider` · `Badge` · `TopBar`

Each ships a `tailwind-variants` recipe (exported alongside the component) so variants
are typed and composable. See the Storybook for every variant and state.
