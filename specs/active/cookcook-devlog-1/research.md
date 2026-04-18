# Research: CookCook Dev Log #1 (Portfolio article)

**Task ID:** cookcook-devlog-1  
**Date:** 2026-04-18  
**Status:** Complete  

---

## Executive Summary

CookCook (**CookCook: Soups n' Curries**) is specified in the `Cook-food-cardgame` repo as a light **2–4 player** cooking card game themed on Thai soups and curries. The formal rules spec (`specs/active/cook-food-cardgame-rules/spec.md`, v1.6.x) describes **Menu** objectives, **Ingredient** cards with **Type** and **Name**, a **Gather** step (market / free draw, optional menu refresh), and **normal** vs **perfect** cooks with separate VP and effects. The project’s git history shows work starting **2026-03-01**; as of **2026-04-18** the repo includes rulebook chapters, Card-Maker-oriented data, printable/TTS-oriented assets under `assets/`, and playtest planning (`research/playtest/plan.md`).

For the Portfolio **boardgames** section, existing **FLATLINE** dev logs set a clear pattern: YAML frontmatter (`title`, `date`, `rank`, `summary`, `tags`, `toc`, `readTime`, `autonumber`, etc.), narrative sections with `#` headings, inline images via `![alt](</image/boardgames/<Game>/<file>.png#small>)`, optional **image-gallery** shortcode pointing at the same directory, and tags like `board-game`, `dev-log`, and the game codename.

---

## Codebase Analysis

### Portfolio — boardgames post pattern

**Location:** `content/boardgames/*.md` (e.g. FLATLINE dev logs)

**How it works:** Hugo content with Typo theme; static files are served from site root, so images live under `static/image/boardgames/<Game>/` and are referenced as `/image/boardgames/...` in markdown (with leading `</...>` in image syntax per existing posts).

**Reusability:** New CookCook post should mirror frontmatter fields and image path convention. The **image-gallery** shortcode reads files from **`assets/image/boardgames/<Game>/`** (Hugo `resources`); duplicate the same PNGs under **`static/image/boardgames/<Game>/`** if markdown uses the plain `/image/...` URLs used elsewhere, or confirm one pipeline for your theme.

### Cook-food-cardgame — rules and status

**Location:** `specs/active/cook-food-cardgame-rules/spec.md`, `plan.md`, `research/playtest/plan.md`, `assets/menu cards/`, `assets/ingredient cards/`

**How it works:** Spec defines functional requirements (modular rulebook, dual-field ingredients, cook resolution, setup, end conditions, etc.); playtest plan outlines phased TTS / table validation. Card art exports are already present as PNGs for menus and ingredients.

**Reusability:** Article overview and “where we are” align with spec + playtest docs; dev log can cite **v1.6.x** rules direction without duplicating the full rulebook.

### Timeline (git)

**Location:** `Cook-food-cardgame` — first commit `2026-03-01` (“initial rules”); ongoing commits through **2026-04-18** including TTS deck prep and card refinements.

---

## External Solutions

Not applicable — this task is internal documentation and a static site article.

---

## Comparison Matrix

| Criteria | Follow FLATLINE pattern | New ad-hoc format |
|----------|-------------------------|-------------------|
| Consistency with site | High | Low |
| Effort | Low | Medium |

---

## Recommendations

### Primary recommendation

Publish **CookCook Dev Log #1** in `content/boardgames/` with the same frontmatter and image conventions as FLATLINE; host **3–4** representative menu/ingredient PNGs under `static/image/boardgames/CookCook/`.

### Alternative

Skip gallery shortcode if the post only has four inline images (FLATLINE often uses both — we keep gallery for consistency).

---

## Open Questions

- Exact public name branding (“CookCook” vs subtitle on every post) — using **CookCook** with subtitle in body is enough for DevLog #1.
- Whether to rebuild `docs/` for GitHub Pages in the same change — user can run `hugo` locally; not requested explicitly.

---

## Next Steps

1. Add markdown post + static assets (implementation).  
2. Run Hugo build when ready to refresh `docs/` for deploy.

---

*Research completed for Portfolio × Cook-food-cardgame dev log.*
