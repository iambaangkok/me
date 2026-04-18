# Research: Unified `/posts` listing across sections (no duplicated content)

**Task ID:** posts-unified-listing  
**Date:** 2026-04-18  
**Status:** Complete  

---

## Executive Summary

Hugo treats each top-level folder under `content/` as a **section** (`posts`, `boardgames`, `my-games`, `video-games`, `shaders`). The Typo theme’s default **`list.html`** only iterates **`.Pages`** for the **current section**, so `/posts` today shows only files physically under `content/posts/`. There is **no need to copy markdown** into `posts/` to aggregate: you can build a **custom list template** for the `posts` section (or a generic layout driven by front matter) that selects **`site.RegularPages`** whose **`.Section`** is in a configurable slice, **`sort`**s by **`.Date`**, and passes the result to **`.Paginate`**. Links in the list still point to each page’s **real URL** (`/boardgames/...`, etc.). The home page already uses the same building block — `where site.RegularPages "Section" ...` — for `homeCollection`, so this extends an established pattern.

Secondary follow-ups: a **unified RSS** for `/posts` (if you want the feed to include all sections), and optional **breadcrumbs** copy that says “Posts” even when the article lives under another section (no change required for listing).

---

## Codebase Analysis

### Typo `list.html` (current behavior)

**Location:** `themes/typo/layouts/_default/list.html`

**How it works:** Renders section title, optional `.Content`, then **`{{ $paginator := .Paginate (.Pages) $paginationSize }}`** and ranges over **`$paginator.Pages`** with **`post-entry.html`**. For the `posts` section, **`.Pages`** is only descendants of `content/posts/`.

**Reusability:** Override with **`layouts/posts/list.html`** (higher precedence than theme) so **only** the `/posts` list changes; other sections keep the theme default.

```17:27:d:\GitHub\Portfolio\themes\typo\layouts\_default\list.html
    {{ $paginator := .Paginate (.Pages) $paginationSize }}

    {{ range $index, $page := $paginator.Pages }}

    {{ if $tagsPage }}
    {{ partial "tag-entry.html" $page}}
    {{ else }}
    {{ partial "post-entry.html" (dict "context" $page "showDate" "true")}}
    {{ end }}

    {{ end }}
```

### `post-entry.html` (unchanged)

**Location:** `themes/typo/layouts/partials/post-entry.html`

**How it works:** Prints date, title link (**`RelPermalink`** → correct section URL), and summary.

**Reusability:** Reuse as-is for aggregated lists; no duplication of content.

### Home page filtering (precedent)

**Location:** `themes/typo/layouts/_default/home.html`

**How it works:** **`{{ $pages := where .Site.RegularPages "Section" .Site.Params.homeCollection }}`** then custom sort by **`rank`** and paginate.

**Reusability:** Same **`where`** pattern; for `/posts` you want **multiple sections** and sort by **date** (desc) instead of (or in addition to) `rank`.

```42:52:d:\GitHub\Portfolio\themes\typo\layouts\_default\home.html
    {{ $pages := where .Site.RegularPages "Section" .Site.Params.homeCollection
    }}

    {{- $sortByRankPages := $pages.ByParam "rank"}}

    {{ $paginationSize := 1}}
    {{ if (gt .Site.Params.paginationSize 0) }}
    {{ $paginationSize = .Site.Params.paginationSize }}
    {{ end }}

    {{ $paginator := .Paginate $sortByRankPages $paginationSize }}
```

*(Note: `hugo.toml` currently sets `homeCollection = 'my-games'` — home stays separate from this research.)*

### Content shape

**Location:** `content/boardgames/`, `content/video-games/` (many leaf `.md` files), `content/my-games/` and `content/shaders/` (branch bundles with `index.md`), `content/posts/` (sparse).

**Implication:** **`site.RegularPages`** includes leaf pages and bundle pages; all have **`Section`** set to the top-level folder name. No symlink or copy required.

---

## External Solutions (Hugo-native)

### Option 1: Section override — `layouts/posts/list.html` + `where` + `sort` + `Paginate` (recommended)

**Overview:** Add **`layouts/posts/list.html`** that builds  
`$combined := where site.RegularPages "Section" "in" (slice "posts" "boardgames" "my-games" "video-games" "shaders")`,  
then **`$sorted := sort $combined "Date" "desc"`**, then **`.Paginate $sorted`**. Optionally drive the slice from **`hugo.toml`** `[params.postsFeedSections]` to avoid hard-coding.

**Pros:**
- No duplicated markdown; canonical URL per article stays in its section.
- Matches existing **`where .RegularPages "Section"`** usage on the home page.
- Only `/posts` list behavior changes if you scope the file to `posts/`.

**Cons:**
- Custom layout to maintain when upgrading the theme (diff small: copy theme `list.html` and replace `.Pages` source).
- **`posts/index.xml`** may still only reflect `content/posts/` unless you add **`layouts/posts/list.xml`** (or equivalent) for RSS.

**Implementation complexity:** Low  
**Team familiarity:** High if you already use Hugo templates  

### Option 2: Single virtual section via Hugo **content mounts** (modules)

**Overview:** Use `module.imports` and `mounts` to map several source trees into one content section.

**Pros:** One “real” section in Hugo’s eyes for default lists/RSS.

**Cons:** Heavier config; reorganizes mental model; overkill for a portfolio.

**Implementation complexity:** High  
**Fit:** Low for this repo  

### Option 3: Taxonomy (e.g. `categories` or shared tag)

**Overview:** Tag everything with `show-in-posts` and use taxonomy term page as the “master” list.

**Pros:** No custom list template if you like taxonomy URLs.

**Cons:** Requires touching **every** page’s front matter (or defaults in `cascade`); URL is **`/tags/...`** not **`/posts`** unless aliased.

**Implementation complexity:** Medium  
**Fit:** Medium — more moving parts than Option 1  

### Option 4: Duplicate or symlink content

**Overview:** Copy files or symlink into `content/posts/`.

**Pros:** Default theme list works unchanged.

**Cons:** Duplication or fragile symlinks (Windows); SEO duplicate URLs unless canonicalized.

**Fit:** Low  

---

## Comparison Matrix

| Criteria | Option 1: `posts/list.html` + `where` | Option 3: Taxonomy | Option 4: Copy/symlink |
|----------|--------------------------------------|--------------------|-------------------------|
| No duplicated files | Yes | Yes | No |
| `/posts` URL | Yes | Needs aliases/redirect | Yes |
| Date sort | Trivial (`sort`) | Built-in term lists (may need sort tweak) | Yes |
| RSS unified | Needs small extra template | Possible | Messy if duplicated |
| Theme upgrade cost | Low (one override) | Low–medium | Lowest |

---

## Recommendations

### Primary recommendation

Implement **Option 1**: add **`layouts/posts/list.html`** (copy from Typo `list.html`) and replace **`.Paginate (.Pages)`** with a **combined `site.RegularPages`** filter on **`Section`**, **`sort` by `Date` descending**, then **`.Paginate`**. Optionally add **`params.postsSections`** in **`hugo.toml`** listing the section names. Add **`layouts/posts/list.xml`** (or duplicate theme RSS pattern) if a **single RSS** for all “posts” matters.

### Alternative

Use **`cascade`** + taxonomy only if you want non-technical authors to toggle visibility per page without editing the template.

---

## Open Questions

- Should **`content/posts/`** leaf pages appear **once** in the combined list (yes if `posts` is in the slice) — and should purely “meta” posts stay only under `/posts`?
- Should the **home** page eventually use the **same** multi-section + date sort, or keep **`homeCollection`** + **`rank`**?
- **Pagination size:** reuse global `paginationSize` or introduce `postsPaginationSize`?

---

## Next Steps

1. Add **`layouts/posts/list.html`** and test locally (`hugo server`).
2. Confirm **`my-games`** branch bundles appear with correct dates and summaries.
3. Optionally implement **unified RSS** and update **intro** copy in `hugo.toml` if `/posts` becomes the main “all writing” index.

---

*Research completed with SDD 5.0-style structure.*
