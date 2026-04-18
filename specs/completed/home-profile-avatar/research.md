# Research: Circular profile photo on `/me` with front/back toggle

**Task ID:** home-profile-avatar  
**Date:** 2026-04-19  
**Status:** Complete  

---

## Executive Summary

The home page (`/me`) is rendered by the Typo theme’s **`home.html`**: an **`.intro`** block shows **`homeIntroTitle`** (“Hi!”) then **`homeIntroContent`** (markdown). Profile source files already exist at **`assets/image/profile/profile-front.png`** and **`profile-back.png`**. The change is **presentational**: insert a circular avatar **between the `<h1>` and the intro body**, wire images through Hugo’s **`resources.Get`** pipeline for correct permalinks/fingerprinting, and add a **small control** overlapping the bottom-right of the circle to toggle views. A **crossfade** (overlapping images with **`opacity`** transition) is the most “normal,” low-noise swap animation; alternatives include a **3D flip** or **instant swap** if you want a stronger effect later. Implementation should live in **site-level overrides** (`layouts/_default/home.html` partial or copy, plus site **`assets/css`** and/or **`static/js`**) so the theme submodule stays untouched.

---

## Codebase Analysis

### Home template and intro structure

**Location:** `themes/typo/layouts/_default/home.html`

**How it works:** Renders `{{ .Content }}` first, then if `homeIntroTitle` / `homeIntroContent` are set, wraps them in `<div class="intro">` with `<h1>` then `<p>{{ markdownify }}`.

**Insertion point (implemented):** **After** the `homeIntroTitle` `<h1>` and **before** `homeIntroContent`, inject the profile partial so visual order is: **Hi! → circular photo → bio text**. CSS uses **left alignment** (no horizontal auto margin). The swap control is intentionally **low-visibility** (subtle dot, transparent hit area) as a small “secret” affordance.

Site override `Portfolio/layouts/_default/home.html` places **`{{ partial "home-profile.html" . }}`** between the title and the markdown intro paragraph.

**Reusability:** Add **`layouts/_default/home.html`** at **site root** (`Portfolio/layouts/`) copying the theme file and inserting one `partial` call; Hugo prefers site layouts over theme.

### Profile assets

**Location:** `assets/image/profile/profile-front.png`, `assets/image/profile/profile-back.png`

**How it works:** Hugo treats **`assets/`** as resource sources; paths are **`resources.Get "image/profile/profile-front.png"`** (no leading slash).

**Reusability:** Optional **`resources.Resize`** / **`Fill`** for consistent circle dimensions and performance (e.g. 256×256 web display).

### CSS pipeline

**Location:** `themes/typo/layouts/partials/head/css.html`

**How it works:** Concatenates theme CSS from **`resources.Get "css/..."`** (under theme `assets/`). In Hugo, **project `assets/` is searched** for `resources.Get`, so you can add **`Portfolio/assets/css/...`** and either:
- **Extend** head by copying **`layouts/partials/head/css.html`** to the site and **appending** one more `resources.Get "css/home-profile.css"` to the slice, or  
- Keep **`home-profile.css`** small and use a **`<style>` block** inside a **`home-profile.html`** partial to avoid touching the global CSS bundle.

**Reusability:** Prefer **site** `assets/css/home-profile.css` + head slice append for cacheable, minified CSS; use **inline `<style>`** only if minimizing touched files.

### Theme `custom.css`

**Location:** `themes/typo/assets/css/custom.css` — placeholder only (“Place custom css here”).

**Convention:** Avoid editing theme files; use **site** `assets/css` and layout overrides.

### Scripts

**Location:** `themes/typo/layouts/_default/baseof.html` loads **`carousel.js`**, **`theme-switch.js`**, **`copy-code.js`** from **`relURL`** (typically **`static/`** or theme static).

**Reusability:** Add **`static/js/profile-toggle.js`** (or inline IIFE in home partial) and a **`<script defer src="...">`** tag once on the home page (end of `home.html` override is fine).

---

## External Solutions (implementation options)

### Option 1: Crossfade toggle (recommended — “normal” animation)

**Overview:** Two **`<img>`** (or `<picture>`) elements **stacked** in a **`position: relative`** wrapper; **default** shows front (**z-index** + **opacity: 1**); back has **opacity: 0**. Toggle adds a class **`is-back`** on the wrapper; CSS transitions **`opacity`** (~200–300ms). **Button** is **`position: absolute; right: …; bottom: …`** on the wrapper, **`border-radius: 50%`**, small hit target, **overlaps** the circle edge.

**Pros:** Smooth, predictable, no layout shift; works well with circular **`border-radius: 50%`** + **`object-fit: cover`**.

**Cons:** Both images loaded (acceptable for two PNGs).

**Implementation complexity:** Low  
**Team familiarity:** High  

### Option 2: 3D flip (`transform: rotateY`)

**Overview:** Single container with **`transform-style: preserve-3d`**; front/back faces; toggle rotates 180°.

**Pros:** Distinct “card flip” feel.

**Cons:** Slightly more CSS; can feel less “neutral” than a fade.

**Implementation complexity:** Medium  

### Option 3: Single `<img>` + `src` swap (no layered fade)

**Overview:** One image; JS sets **`src`** to front or back URL on click; optional short **`opacity`** flash.

**Pros:** One image in DOM.

**Cons:** Brief pop-in unless preloaded; crossfade is cleaner with two layers.

**Implementation complexity:** Low  

### Option 4: Pure CSS only (`<details>` / checkbox hack)

**Overview:** No JS; accessibility and “button” semantics are weaker.

**Cons:** Poor fit for a clear toggle button with **`aria-pressed`**.

**Fit:** Low  

---

## Comparison Matrix

| Criteria | Crossfade (Option 1) | 3D flip (Option 2) | Src swap (Option 3) |
|----------|----------------------|--------------------|---------------------|
| “Normal” / subtle | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Implementation effort | Low | Medium | Low |
| Visual polish | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Accessibility (button + state) | Easy with JS | Easy with JS | Easy with JS |

---

## Recommendations

### Primary recommendation

1. **Override** **`layouts/_default/home.html`**: after “Hi!” `<h1>`, **`partial "home-profile.html" .`**.
2. **`layouts/partials/home-profile.html`**:  
   - **`$front := resources.Get "image/profile/profile-front.png"`**  
   - **`$back := resources.Get "image/profile/profile-back.png"`**  
   - Guard with **`with`**; if missing, render nothing.  
   - Markup: **`.profile-avatar`** wrapper, inner **`.profile-avatar__layers`**, two images, **`button.profile-avatar__toggle`** with **`type="button"`**, **`aria-label`** / **`aria-pressed`**.
3. **CSS:** **`assets/css/home-profile.css`** (circle size, overflow hidden, stacked images, **`.is-back`** crossfade, button position). Extend **`head/css.html`** copy at site level to concat this file, **or** scoped `<style>` in the partial.
4. **JS:** **`static/js/profile-toggle.js`** — click toggles **`is-back`** on wrapper and updates **`aria-pressed`**; **`prefers-reduced-motion`** can shorten or disable transition via class.
5. **Animation:** **`transition: opacity 0.25s ease`** on both layers (or only the top one).

### Alternative approach

If you want **zero** new global CSS file: put **all** rules in **`<style>`** inside **`home-profile.html`** and **inline** ~15 lines of JS in the same partial (acceptable for one page).

---

## Open Questions

- **Diameter** of the circle (e.g. 160px / 200px) and max width on mobile.
- **Button icon:** text “↻”, SVG camera/flip icon, or initials?
- Should **`profile-back`** be the **default** for reduced-motion users only, or always start **front**? -> always start front

---

## Next Steps

1. Add **`layouts/_default/home.html`** + **`partials/home-profile.html`**.
2. Add CSS (site **`assets/css`** or inline) and **`static/js/profile-toggle.js`** (or inline).
3. Run **`hugo`** and verify **`/me`** (and **`/public/me`** if using subpath) shows circle, toggle, and crossfade.

---

*Research completed with SDD 5.0-style structure.*
