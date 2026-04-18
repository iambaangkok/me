# Implementation Tasks: CookCook Dev Log #1

**Task ID:** cookcook-devlog-1  
**Created:** 2026-04-18  
**Status:** Ready for Implementation  

## Summary

| Metric | Value |
|--------|-------|
| Total Tasks | 4 |
| Estimated Effort | ~1–2 hours |
| Phases | 1 |

## Phase 1: Article and assets

**Goal:** Ship dev log #1 with overview, timeline, status, and linked card art.

### Task 1.1: Research and pattern match

**Description:** Review `cook-food-cardgame-rules` spec/playtest docs and FLATLINE `content/boardgames` posts for structure and tone.

**Acceptance Criteria:**
- [x] Frontmatter fields align with existing boardgames posts.
- [x] Image paths use `/image/boardgames/CookCook/`.

**Effort:** 0.5h  
**Priority:** High  
**Dependencies:** None  

### Task 1.2: Copy card images to Portfolio static + assets

**Description:** Copy 3–4 menu/ingredient PNGs from `Cook-food-cardgame/assets/` into `Portfolio/static/image/boardgames/CookCook/` and mirror the same files into `Portfolio/assets/image/boardgames/CookCook/` so the **image-gallery** shortcode can `readDir` them.

**Acceptance Criteria:**
- [x] At least three images present; mix of menu and ingredient preferred.
- [x] Filenames are stable (no broken links).
- [x] `hugo --destination docs` succeeds with the gallery shortcode enabled.

**Effort:** 0.25h  
**Priority:** High  
**Dependencies:** None  

### Task 1.3: Write `content/boardgames` markdown

**Description:** New post: overview, start date and duration, current state (prepping playtest TTS + physical), inline images + optional gallery.

**Acceptance Criteria:**
- [x] Overview reflects spec (2–4p, menus, ingredients, gather, normal/perfect cook).
- [x] Timeline mentions March 2026 start and approximate elapsed time to April 2026.
- [x] Status mentions playtest prep (TTS and table).
- [x] All copied images referenced in the article.

**Effort:** 0.75h  
**Priority:** High  
**Dependencies:** Task 1.2  

### Task 1.4: Verification

**Description:** Confirm files exist and paths match Hugo static serving.

**Acceptance Criteria:**
- [x] Post file created under `content/boardgames/`.
- [x] No broken relative assumptions (static paths correct).

**Effort:** 0.25h  
**Priority:** Medium  
**Dependencies:** Task 1.3  

## Quick Reference Checklist

- [x] Task 1.1: Research and pattern match
- [x] Task 1.2: Copy card images
- [x] Task 1.3: Write markdown post
- [x] Task 1.4: Verification

## Next Steps

1. Run `hugo` to regenerate `docs/` if deploying to GitHub Pages.

---

*Tasks created with SDD-style breakdown.*
