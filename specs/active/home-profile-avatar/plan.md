# Technical Plan: Home profile avatar (circular + front/back toggle)

**Task ID:** home-profile-avatar  
**Status:** Implemented  
**Based on:** [research.md](./research.md)

## 1. System Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Integration | Site layout overrides only | Typo submodule stays clean |
| Images | `resources.Get` + `Fill` for square crop | Fingerprinted URLs, consistent circle crop |
| Animation | Crossfade (`opacity`, ~250ms) | “Normal” swap per research |
| Toggle | Minimal dot control, BR overlap, low contrast | “Secret” discoverability; clearer on avatar/button hover or focus |
| Layout | Avatar after `<h1>` in `.intro`, left-aligned | Order: “Hi!” → photo → bio; `margin` not auto |
| CSS delivery | `assets/css/home-profile.css` + head concat | Minified with rest of site CSS |

**Flow:** `home.html` → `partial home-profile.html` (if both PNGs resolve) → CSS + deferred `profile-toggle.js`.

## 2. Technology Stack

| Layer | Technology |
|-------|------------|
| Templates | Hugo html templates |
| Styles | Plain CSS |
| Behavior | Vanilla JS (no deps) |

## 3. Component Design

### `layouts/_default/home.html` (override)

Copy theme home; after `homeIntroTitle` / `<h1>`, call `{{ partial "home-profile.html" . }}`; append `<script defer src="...profile-toggle.js">` once at end of `main` block.

### `layouts/partials/home-profile.html`

Load `image/profile/profile-front.png` and `profile-back.png`; if both exist, render wrapper with two stacked `<img>`, toggle button, `data-profile-avatar`, ARIA labels.

### `assets/css/home-profile.css`

Circle clip, stacked images, `.is-back` crossfade, button position, `prefers-reduced-motion`.

### `layouts/partials/head/css.html` (override)

Copy theme; append `resources.Get "css/home-profile.css"` to `$CSS` slice when non-nil.

### `static/js/profile-toggle.js`

Toggle `is-back`; update `aria-pressed` and `aria-label`.

## 4. Data Model

N/A.

## 5. API Contracts

N/A.

## 6. Security Considerations

No user input; static assets only.

## 7. Performance Strategy

Resize/fill to ~320px source for display ~200px CSS; back image `loading="lazy"` optional (front eager).

## 8. Implementation Phases

- [x] Add `home-profile.css`, `profile-toggle.js`, partial, `home.html`, `head/css.html` overrides
- [x] Run `hugo` and verify `/me`

## 9. Risk Assessment

| Risk | Mitigation |
|------|------------|
| Missing asset breaks build | Partial renders nothing if either `Get` fails; optional CSS append only if file exists |
| Head partial drift on theme upgrade | Document override in plan |

## 10. Open Questions

- Final circle diameter tuned in CSS (default ~200px).

## Next Steps

- Implement; optional `/tasks` for breakdown.

## Changelog (refinements)

| Date | Change |
|------|--------|
| 2026-04-19 | Avatar moved **above** “Hi!”; **left-aligned** (`margin` not centered); swap control **de-emphasized** (transparent button, faint **·** glyph, stronger hint on `.profile-avatar:hover` / `:focus-visible`). |
| 2026-04-19 | Avatar moved **below** “Hi!” again (order: title → photo → bio); left align and secret toggle unchanged. |
