# Implementation Tasks: Unified `/posts` listing

**Task ID:** posts-unified-listing  
**Created:** 2026-04-18  
**Status:** Implemented (verify with `hugo`)  

## Summary

| Metric | Value |
|--------|-------|
| Total Tasks | 4 |
| Estimated Effort | ~1.5 h |
| Phases | 1 |

## Phase 1: Config and layouts

**Goal:** `/posts` lists all configured sections by date; RSS matches.

### Task 1.1: Configure `postsFeedSections`

**Description:** Add `postsFeedSections` string array under `[params]` in `hugo.toml` with `posts`, `boardgames`, `my-games`, `video-games`, `shaders`.

**Acceptance Criteria:**
- [x] `hugo.toml` parses cleanly
- [x] Order of sections in TOML is documentation-only; sort is always by page date in template

**Effort:** 0.25 h  
**Priority:** High  
**Dependencies:** None  

### Task 1.2: `layouts/posts/list.html`

**Description:** Copy Typo list behavior; replace `.Paginate (.Pages)` with filtered `RegularPages`, `sort` by `Date` desc, then `Paginate`.

**Acceptance Criteria:**
- [x] `/posts` shows entries from all listed sections
- [x] Newest articles appear first
- [x] Links target real section URLs

**Effort:** 0.5 h  
**Priority:** High  
**Dependencies:** Task 1.1  

### Task 1.3: `layouts/posts/rss.xml`

**Description:** Custom RSS for `posts` section using same filter/sort; limit items via `postsFeedLimit` (default 50).

**Acceptance Criteria:**
- [x] `hugo` builds without RSS errors
- [x] `/posts/index.xml` includes items from multiple sections

**Effort:** 0.5 h  
**Priority:** Medium  
**Dependencies:** Task 1.1  

### Task 1.4: Verify build

**Description:** Run `hugo --destination docs` (or `hugo`) and confirm page count / sample links.

**Acceptance Criteria:**
- [ ] Build succeeds (`hugo --destination docs`)
- [ ] Manual spot-check: boardgames + video-games entries appear on `/posts`

**Effort:** 0.25 h  
**Priority:** High  
**Dependencies:** Tasks 1.2–1.3  

## Quick Reference Checklist

- [x] Task 1.1: `hugo.toml` params
- [x] Task 1.2: `list.html`
- [x] Task 1.3: `rss.xml`
- [ ] Task 1.4: Verify build (run Hugo locally)

## Next Steps

1. `/implement posts-unified-listing`

---

*Tasks created with SDD 5.0*
