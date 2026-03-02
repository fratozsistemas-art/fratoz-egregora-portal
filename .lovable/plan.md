

## Plano: Obra Carro-Chefe por Categoria

### O que muda

**1. Dados (`artCategories.ts`)**
- Adicionar campos ao `ArtCategory`: `featuredArtist`, `featuredWork`, `featuredWorkYear`, `featuredWorkTechnique`, `featuredWorkDescription`, e `featuredWorkImage` (opcional).
- Pintura recebe dados reais: Siron Franco, "Torre de Babel".
- As outras 7 categorias recebem placeholders genéricos coerentes com cada expressão.

**2. Página da categoria (`ArtCategoryPage.tsx`)**

A obra carro-chefe aparece em **três locais**:

- **Hero**: Linha sutil sob o tagline com nome do artista e obra (ex: "Obra carro-chefe: Torre de Babel — Siron Franco").
- **Aba Sobre**: Card de destaque no topo com imagem (se houver), nome da obra, artista, ano, técnica e descrição curta. Visualmente diferenciado com borda/gradiente sutil.
- **Aba Galeria**: Primeiro item do grid, ocupando 2 colunas (`col-span-2`) com badge "Destaque" e dados da obra.

### Detalhes técnicos
- A interface `ArtCategory` ganha 5-6 novos campos opcionais.
- O componente da aba Galeria renderiza a obra carro-chefe antes do loop genérico existente.
- Sem dependências novas.

