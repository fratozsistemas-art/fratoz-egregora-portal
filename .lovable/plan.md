

## PR #2 Review: HP Collection Real Data Enrichment

**Status: Ready to merge** — this is a well-structured content PR with no architectural concerns.

### What the PR does

1. **27 real artwork images** extracted from PDF, compressed to 44–220 KB each, placed in `src/assets/hp-catalog/`
2. **`hp-collection.ts` rewritten** — 20 placeholder entries replaced with 11 real catalogue artworks with full metadata (provenance, conservation notes, cultural context, sources with real URLs)
3. **New `sources?: string[]` field** on `HPArtwork` type with Wikipedia/Sotheby's/Christie's links
4. **`ArtCategoryPage.tsx`** — gallery cards show real thumbnails, detail modal has photo gallery grid (up to 4), sources as clickable links, dynamic piece count
5. **`Transmidia.tsx`** — sources rendered as clickable links in HP artwork panel

### Risk assessment

- **Low risk** — primarily data and image additions with minor UI enhancements
- TypeScript passes (`npx tsc --noEmit` — zero errors)
- Build succeeds with optimized image sizes
- No changes to routing, state management, or core architecture

### Recommendation

**Merge it.** After merge, I'll verify the sync and test that:
- HP artwork images load correctly in both the Acervo tab and Transmídia page
- Source links render and open correctly
- Photo gallery grid works in the detail modal
- Dynamic piece count reflects the new 11 entries

