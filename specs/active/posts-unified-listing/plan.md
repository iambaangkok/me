# Technical Plan: Unified `/posts` listing (Option 1)

**Task ID:** posts-unified-listing  
**Status:** Ready for Implementation  
**Based on:** [research.md](./research.md) — Option 1 (section override + `where` + `sort` + `Paginate`)

## 1. System Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Aggregation mechanism | `site.RegularPages` filtered by `.Section` | No file duplication; canonical URLs stay under each section |
| Scope of change | `layouts/posts/` overrides only | Other sections keep Typo `list.html` unchanged |
| Configuration | `hugo.toml` `[params]` slice `postsFeedSections` | Editable list without touching templates |
| Sort order | `Date` descending | Matches “all writing, newest first” |
| RSS | `layouts/posts/list.rss.xml` | Default section RSS only includes `content/posts/`; unified feed matches HTML list |

## 2. Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Site generator | Hugo (existing) | `where`, `sort`, `.Paginate` |
| Theme | Typo | Reuse `post-entry.html`, `pagination-controls.html`, `breadcrumbs.html` |

## 3. Component Design

### 3.1 `layouts/posts/list.html`

- **Purpose:** Render `/posts` as a merged, date-sorted index.
- **Responsibilities:** Resolve `postsFeedSections` (with default slice), filter `RegularPages`, sort by date, paginate, delegate rows to `post-entry.html`.
- **Dependencies:** Theme partials (same as default `list.html`).

### 3.2 `layouts/posts/list.rss.xml`

- **Purpose:** Emit `/posts/index.xml` covering the same logical set of pages as the HTML list (capped item count, e.g. 50).
- **Responsibilities:** Duplicate filter/sort logic or share via minimal inline duplication (Hugo has no shared partial for RSS without extra setup).

### 3.3 `hugo.toml`

- **Purpose:** Declare `postsFeedSections` array.
- **Responsibilities:** Single source of truth for section names included in `/posts`.

## 4. Data Model

N/A — uses existing content sections; no new content types.

## 5. API Contracts

N/A — static site.

## 6. Security Considerations

N/A — public static output only.

## 7. Performance Strategy

Pagination reuses `Site.Params.paginationSize`; RSS limits items to avoid huge XML.

## 8. Implementation Phases

- [x] Add `postsFeedSections` to `hugo.toml`
- [x] Add `layouts/posts/list.html`
- [x] Add `layouts/posts/rss.xml` (section RSS template)
- [x] Run `hugo` and spot-check `/posts` and `/posts/index.xml`

## 9. Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Theme upgrade overwrites nothing | Low | N/A | Overrides live under `layouts/`, not `themes/` |
| Wrong `where` / `in` syntax | Medium | Low | Verify with `hugo` build |
| Pages missing dates | Low | Low | Ensure front matter `date` on all entries |

## 10. Open Questions

- Whether to show section label next to each line (future enhancement; out of scope).

## Next Steps

- Run `/tasks posts-unified-listing` then `/implement posts-unified-listing`.

*Plan aligned with SDD-style structure.*
