# Technical Plan: 3D printing & Build-your-tank article series

**Task ID:** portfolio-3d-printing-series  
**Status:** Implemented  
**Based on:** [spec.md](./spec.md)

## 1. System Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Content | Six leaf markdown files under `content/posts/` and `content/boardgames/` | Matches spec FR-1 through FR-6 |
| Image URLs | Copy assets → `static/image/3dprints/` and `static/image/boardgames/Build-your-tank/` | Same `</image/...>` pattern as FLATLINE / CookCook; `hugo` serves `static` at site root |
| Gallery (optional) | `{{< image-gallery >}}` can use existing `assets/image/...` (shortcode `readDir`) | Optional per post; inline images use `static` |
| Voice | First-person, casual, mix of short paragraphs and `##` sections like CookCook / coffee post | Author request |
| Headings | Use `##` for section titles (not `#`) so TOC works with default Hugo `startLevel` 2 | Same fix as CookCook dev log |
| External link | Raw HTML `<a target="_blank" rel="noopener noreferrer">` for partner site | Spec FR-5; goldmark default link has no target |

## 2. Technology Stack

Hugo + Typo theme; no new dependencies.

## 3. Component Design

| Deliverable | Purpose |
|-------------|---------|
| `25-10-28 Bought a 3D Printer.md` | FR-1 |
| `25-11-09 Build-your-tank Dev Log - 1.md` | FR-2 |
| `25-11-21 Build-your-tank Dev Log - 2.md` | FR-3 |
| `25-11-30 Build-your-tank Dev Log - 3.md` | FR-4 |
| `25-12-20 3D-printed gifts for my partner.md` | FR-5 |
| `26-01-15 Cube Vase.md` | FR-6 |
| Static image dirs | FR-7 |

## 4. Data Model

N/A.

## 5. API Contracts

N/A.

## 6. Security Considerations

External link uses `noopener noreferrer`.

## 7. Performance Strategy

Use `#small` on heavy inline images where appropriate; source files already reasonable size.

## 8. Implementation Phases

- [x] Copy images `assets/image/...` → `static/image/...`
- [x] Write six markdown posts with frontmatter aligned to neighbors
- [x] `hugo --destination docs` verify

## 9. Risk Assessment

| Risk | Mitigation |
|------|------------|
| Filename spaces | Match exact names; Hugo/relURL encodes in output |
| Duplicate blobs | `assets` remains canonical for image-gallery; `static` copy for markdown URLs |

## 10. Open Questions

- Article 6 date remains **2026-01-15** per spec until author changes it.

## Changelog (refinements)

| Date | Change |
|------|--------|
| 2026-04-19 | Article **Bought a 3D Printer**: frog keycap credited as **MakerWorld** download, not original design; closing paragraph mentions downloads vs own designs. |
| 2026-04-19 | Tone pass: strip most `**bold**` from all six series posts (body text). |
| 2026-04-19 | Editorial: remove em/en dashes from series posts; align with spec v1.3. |

## Next Steps

- Review live `/posts` ordering; `/evolve` if dates or copy change.
