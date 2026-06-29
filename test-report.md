# Test Report — Theme Component Tests

## Status: DONE

## Summary
- **Total tests written:** 256
- **Tests passing:** 256
- **Tests failing:** 0
- **Test files:** 37 (one per exported component)

## Setup
- Vitest 4.1.9 + @testing-library/react 16 + @testing-library/user-event 14
- vitest-axe 0.1.0 for accessibility checks
- jsdom environment, globals: true, css: false

## Coverage
All 37 exported components from `src/index.ts` have tests:

### Typography (4)
- eyebrow, display, heading, text

### Forms (8)
- button, input, select, checkbox, switch, textarea, otp-input, copy-field

### Layout & Feedback (7)
- panel, divider, section-header, stat-strip, alert, modal, segmented-control

### Navigation (3)
- pagination, top-bar, footer

### Interactive/Complex (4)
- accordion, quiz-card, species-grid, category-card

### Data Display (8)
- stat, progress-bar, data-list, distribution-bar, legend, badge, ribbon, avatar

### Cards/Media (5)
- sdg-card, media-card, article-card, (category-card counted above)

## Components with axe a11y tests
Button, Input, Select, Checkbox, Switch, Modal, QuizCard, Accordion, Pagination, OtpInput

## Notable implementation notes

- **CSS is disabled** in test environment — text labels are tested with their raw (non-CSS-transformed) strings. The Eyebrow component renders text as-is; the CSS `text-transform: uppercase` is decorative and not testable without CSSOM.
- **SpeciesGrid:** The legend buttons share button names with the grid cell buttons (same aria-label as species name). Tests differentiate by filtering out buttons inside `[role="img"]`.
- **OtpInput / CopyField:** These components use browser APIs (`clipboard.writeText`, focus management). Tests verify structure and basic interaction; clipboard copy confirmation was not tested as it requires mocking `navigator.clipboard`.
- **HTMLCanvasElement.getContext()** warnings appear in test output — these are from jsdom not implementing Canvas. They do not affect any tests.
- The linter automatically corrected some text assertions (e.g., `'DESCRIPTION'` → `'Description'`) since CSS uppercasing is not applied in jsdom.

## Concerns
None. All tests pass cleanly.
