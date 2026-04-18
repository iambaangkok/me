# Specification: 3D printing & Build-your-tank content series (Portfolio)

**Task ID:** portfolio-3d-printing-series  
**Created:** 2026-04-19  
**Status:** Ready for Planning  
**Version:** 1.3  

## 1. Problem Statement

- **The Problem:** The portfolio site should document the author’s **3D printing** journey and a related **Build-your-tank** boardgame prototype in a set of dated posts, with photos, so visitors can follow the story from buying a printer through CAD experiments, game parts, gifts, and a small vase project.
- **Current Situation:** Source images exist under **`assets/image/3dprints/`** and **`assets/image/boardgames/Build-your-tank/`**; the narrative and dates are defined in this spec but the markdown posts do not exist yet.
- **Desired Outcome:** **Six** published articles (**three** under **`content/posts/`** and **three** under **`content/boardgames/`**) with correct dates, consistent frontmatter (aligned with existing dev logs), embedded images, and tags suitable for discovery and the unified **`/posts`** listing.

## 2. User Personas

### Primary User: Site visitor
- **Who:** Friends, collaborators, or hiring readers browsing **iambaangkok.me**.
- **Goals:** Skim a coherent timeline of 3D printing projects; see photos; optionally open links (e.g. partner’s academic site).
- **Pain points:** Broken image paths, vague titles, or walls of text without structure.

### Primary User: Author (maintainer)
- **Who:** Repository owner updating Hugo content.
- **Goals:** One clear file per article; images easy to update; sections match **`/posts`** and section indexes.
- **Pain points:** Duplicated blobs; mismatch between **`assets/`** and what the HTML theme actually serves.

## 3. Functional Requirements

### FR-1: Article 1, “Bought a 3D Printer!” (`/posts`)
**Description:** First post in the series, **general 3D printing** interest and setup.

**User Story:**
> As a visitor, I want to read when and why the author bought a printer and see an early print, so I understand the start of the arc.

**Acceptance Criteria:**
- [ ] Markdown file lives under **`content/posts/`** with **date `2025-10-28`** (late October 2025).
- [ ] Body states interest in 3D printing; purchase of **Bambu Lab A1** with **AMS Lite** and filaments; experimenting with prints and **FreeCAD**; includes **frog keycap** photo and **attribution** that the keycap model was **downloaded from MakerWorld** (not author-designed).
- [ ] Image used: **`assets/image/3dprints/001 frog-keycap.jpg`** (implementation must ensure built site serves it; see FR-7).
- [ ] Frontmatter includes **`tags`** appropriate for **`/posts`** (e.g. `3d-printing`, `dev-log` or `posts`-style tags per site convention).

**Priority:** Must Have  

### FR-2: Article 2, Build-your-tank devlog #1 (`/boardgames`)
**Description:** CAD exploration for tank parts on a **3×3×3** grid; connectors.

**User Story:**
> As a visitor, I want to see how tank parts and connections were prototyped, so I understand the physical design choices.

**Acceptance Criteria:**
- [ ] File under **`content/boardgames/`** with **date `2025-11-09`**.
- [ ] Covers: starting the **Build-your-tank** game; CAD for grid-based tank parts; how parts connect; photo **001**; use of **2-way “Square Spring Pin”** with photos **002**, **003**; **Circle Spring Pin** for round/rotatable holes that **does not quite work**, with photo **004**.
- [ ] Images from **`assets/image/boardgames/Build-your-tank/`**: **`001.jpg`**, **`002 square-spring-pin.jpg`**, **`003 square-spring-pin-in-action.jpg`**, **`004 circle-spring-pin.png`**.
- [ ] Title includes **devlog numbering** (e.g. **#1**) consistent with later entries.

**Priority:** Must Have  

### FR-3: Article 3, Build-your-tank devlog #2 (`/boardgames`)
**Description:** Expanded tank components and a seat figure.

**User Story:**
> As a visitor, I want to see new part types and assembly, so I can follow design iteration.

**Acceptance Criteria:**
- [ ] File under **`content/boardgames/`** with **date `2025-11-21`**.
- [ ] Mentions new parts: **engine, hull, track, armor variants, gun variants**, and **seat for Dororo-kun**.
- [ ] Images **005** through **008**: **`005 tank-parts-01.png`**, **`006 tank-parts-2.jpg`**, **`007 tank-parts-assembled-1.jpg`**, **`008 tank-parts-assembled-2.jpg`**.

**Priority:** Must Have  

### FR-4: Article 4, Build-your-tank devlog #3 (`/boardgames`)
**Description:** Battle map and play aids.

**User Story:**
> As a visitor, I want to see map and targeting concepts, so I understand table presence of the prototype.

**Acceptance Criteria:**
- [ ] File under **`content/boardgames/`** with **date `2025-11-30`**.
- [ ] Covers: **battle map**, **map pieces (obstacles)**, **targeting map**, **scan indicator**.
- [ ] Images **010 through 013**: **`010 battle-map.png`**, **`011 map-pieces-obstacles.jpg`**, **`012 targeting-map.png`**, **`013 scan-indicator.png`**.

**Priority:** Must Have  

### FR-5: Article 5, “3D-printed gifts for my partner!” (`/posts`)
**Description:** End-of-year gifts before a Japan trip; ties to partner’s **tiling** research.

**User Story:**
> As a visitor, I want to read about meaningful printed gifts and follow the link to the partner’s site.

**Acceptance Criteria:**
- [ ] File under **`content/posts/`** with **date `2025-12-20`**.
- [ ] Narrative: trip to **Japan** to visit partner; busy from **start of December** with gifts: **Branch Ring** (image **`003 branch-ring.jpg`**), **Rhombus / kite earrings** ( **`004 kite-earrings.jpg`**, file name in repo), **Star and Cross / infinite tiling earrings** ( **`005 infinite-tiling-earrings.jpg`**); partner at **JAIST**, research on **tiling problems**; link **`https://ponpailinh.github.io/me/`**; **“2025 Love Struck Seal of Purity”** award (**`006 love-stuck-seal-of-purity.jpg`**).
- [ ] External link opens in **`target="_blank"`** with **`rel="noopener noreferrer"`** if rendered as raw HTML; if markdown-only, use Hugo goldmark-safe link.

**Priority:** Must Have  

### FR-6: Article 6, “Cube Vase” (`/posts`)
**Description:** Small post-trip project.

**User Story:**
> As a visitor, I want a short coda showing a simple functional print after the trip.

**Acceptance Criteria:**
- [ ] File under **`content/posts/`** with **date `2026-01-15`** (after Japan trip; author did not specify. **Placeholder date**; adjust in `/evolve` if you prefer another day).
- [ ] Mentions chilling on side projects after the trip; **Cube Vase** for small flowers; image **`007 block-vase.jpg`**.

**Priority:** Must Have  

### FR-7: Images and build integration
**Description:** All referenced images must load on the deployed site.

**User Story:**
> As a maintainer, I want one reliable pattern so images never 404 in **`docs/`** output.

**Acceptance Criteria:**
- [ ] Implementation plan documents whether images are copied to **`static/image/...`**, mounted, or referenced via page bundles, **consistent with** existing **CookCook / FLATLINE** posts and **`image-gallery`** expectations (**`assets/`** vs **`static/`**) from **`/research`** on this repo.
- [ ] All files listed in FR-2 through FR-6 exist at the paths verified in the repo (see §3 asset inventory).

**Priority:** Must Have  

### FR-8: Listing and metadata
**Description:** Posts appear in section indexes and merged **`/posts`** feed.

**Acceptance Criteria:**
- [ ] Each article has **`title`**, **`date`**, **`summary`**, and **`tags`** consistent with neighboring content.
- [ ] **`boardgames`** entries use tags compatible with existing boardgame dev logs (e.g. **`board-game`**, **`dev-log`**, **`3d-printing`**, project codename **Build-your-tank** or similar).

**Priority:** Should Have  

## 4. Non-Functional Requirements

- **Performance:** Prefer resized or reasonably sized JPEG/PNG for inline images; avoid megabyte-scale originals if downsampling is trivial in the chosen pipeline.
- **Accessibility:** Non-decorative images have meaningful **`alt`** text; decorative process shots may use empty **`alt`** where appropriate.
- **Accessibility:** Toggle/external links meet WCAG-friendly patterns where HTML is used.
- **Maintainability:** Filenames in **`content/`** follow existing **`YY-MM-DD Title.md`** pattern where applicable.
- **Editorial (refined):** Body copy uses **minimal bold**; plain prose reads more naturally. Reserve emphasis for rare cases if needed later.
- **Editorial (refined):** Do not use em dash (U+2014) or en dash (U+2013) in series body copy; use commas, colons, periods, or the word *through* for ranges, matching author preference.

## 5. Out of Scope

- ❌ **Full Build-your-tank ruleset** or print-and-play package; only dev logs and storytelling.
- ❌ **STL download hosting** or Thingiverse integration, unless added in a later spec.
- ❌ **i18n**: English only unless separately specified.

## 6. Edge Cases & Error Handling

| Scenario | Expected Behavior |
|----------|-------------------|
| Image renamed in `assets/` | Update spec or paths in markdown; CI/manual check before deploy |
| Unified `/posts` omits a section | Verify **`postsFeedSections`** in **`hugo.toml`** still includes **`posts`** and **`boardgames`** |
| Goldmark and raw HTML | Prefer markdown; use `unsafe` only where theme already allows |

| Error | User Message | System Action |
|-------|--------------|---------------|
| Missing resource at build | (none) | Hugo build fails or omit image with `with`; implementation should fail loudly in review |

## 7. Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Article count | 6 pages generated | `hugo list all` or built HTML count |
| Image references | 0 broken in local `hugo` | Manual click-through or link check |
| Narrative continuity | Reader can sort by date | Dates span Oct 2025 → Jan 2026 |

## 8. Open Questions

- [ ] **Article 6 date:** Spec uses **`2026-01-15`** as placeholder; confirm actual “after Japan trip” date.
- [ ] **Devlog titles:** Exact slug strings (e.g. “Build-your-tank Dev Log #1”) vs shorter filenames; align with **FLATLINE** / **CookCook** naming.
- [ ] **File `00 rotatable-base.png`:** Optional bonus image for Article 2 or 3; not required for v1.0 acceptance.

## 9. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.3 | 2026-04-19 | [REFINED] Editorial: no em/en dash in series copy; spec prose updated; six articles punctuation pass. |
| 1.2 | 2026-04-19 | [REFINED] All six series articles: reduced **bold** in body text for a more natural voice. |
| 1.1 | 2026-04-19 | [REFINED] FR-1: frog keycap is a **MakerWorld** download, not author CAD; article body updated to match. |
| 1.0 | 2026-04-19 | Initial specification from author brief; asset names verified under `assets/image/` |

## 10. Asset inventory (verified paths)

**`assets/image/3dprints/`**
- `001 frog-keycap.jpg`
- `002 0.2-print-nozzle.jpg` *(not required by named FRs; available for optional copy)*
- `003 branch-ring.jpg`
- `004 kite-earrings.jpg`
- `005 infinite-tiling-earrings.jpg`
- `006 love-stuck-seal-of-purity.jpg`
- `007 block-vase.jpg`

**`assets/image/boardgames/Build-your-tank/`**
- `001.jpg`, `002 square-spring-pin.jpg`, `003 square-spring-pin-in-action.jpg`, `004 circle-spring-pin.png`
- `005 tank-parts-01.png`, `006 tank-parts-2.jpg`, `007 tank-parts-assembled-1.jpg`, `008 tank-parts-assembled-2.jpg`
- `010 battle-map.png`, `011 map-pieces-obstacles.jpg`, `012 targeting-map.png`, `013 scan-indicator.png`
- `00 rotatable-base.png` *(optional)*

## Next Steps

1. Run **`/plan portfolio-3d-printing-series`** for Hugo/static vs assets strategy and file names.
2. Run **`/implement`** after plan approval.
3. Resolve Open Questions (especially Article 6 date).

*Specification created with SDD 5.0*
