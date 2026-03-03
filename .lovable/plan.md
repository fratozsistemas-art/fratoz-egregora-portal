

## Parallel Presence: HP Collection with Clear Differentiation

### Current State
- **/escultura** (`ArtCategoryPage.tsx`): Already has the full HP Collection narrative in the "Sobre" tab (Apresentação, Observações, Kintsugi, O Acervo). Commercial/acquisitional tone is partially there but mixed with cultural content.
- **/transmidia** (`Transmidia.tsx`): Sala Médici (Room 4) shows HP pieces in a grid with a brief intro paragraph. Cultural/educational framing exists but is minimal.

### Plan

#### 1. Refactor `/escultura` — Commercial/Acquisitional Focus

Transform the existing HP Collection section in the Escultura "Sobre" tab to emphasize its commercial nature:

- **Rename header** to "Coleção HP — Oportunidade de Aquisição"
- **Add a "Contato para Colecionadores" CTA** at the bottom with a styled button/card (email or form placeholder) targeting serious buyers
- **Add "Proveniência & Conservação" section** with documentation placeholders (provenance chain, conservation notes, Kintsugi philosophy already present)
- **Add "Avaliação de Mercado" note** referencing Sotheby's/Christie's/China Guardian context (already partially there, restructure to be more prominent)
- **Target audience badge/label**: Small tag "Para Colecionadores e Curadores" near the top

#### 2. Refactor `/transmidia` Sala Médici — Cultural/Educational Focus

Transform Room 4 into "Sala HP — Diálogos Entre Civilizações":

- **Rename** from "Sala Médici" to "Sala HP — Diálogos Entre Civilizações" (update `ROOM_NAMES[3]`)
- **Reorganize pieces by thematic clusters** instead of just continent: add a `hpTheme` field to HP obras in data (Poder, Espiritualidade, Proteção, Beleza) and show grouped sections
- **Add educational context cards** per continent group with brief historical/cultural paragraphs
- **Add cross-references**: link to `/escultura` for acquisition details, and link HP pieces to other Egrégora artists working in similar themes
- **Enhance the intro panel** with storytelling language focused on cultural dialogue, not commerce

#### 3. Data layer changes (`artCategories.ts`)

- Add optional `hpTheme` field to `TransmidiaObra` interface
- Assign thematic values to HP pieces (Poder, Espiritualidade, Proteção, Beleza)
- Update room name constant in both files

#### 4. Cross-linking

- In `/escultura` HP section: add a link "Explorar a experiência cultural na Sala HP" → `/transmidia` (auto-selects Room 4)
- In `/transmidia` Sala HP: add a link "Interessado na aquisição? Ver catálogo completo" → `/escultura`

### Files to modify
- `src/data/artCategories.ts` — add `hpTheme` field, assign values to HP obras
- `src/pages/ArtCategoryPage.tsx` — restructure HP section with commercial focus, add CTA and cross-link
- `src/pages/Transmidia.tsx` — rename Sala Médici, add thematic grouping, educational cards, cross-link

