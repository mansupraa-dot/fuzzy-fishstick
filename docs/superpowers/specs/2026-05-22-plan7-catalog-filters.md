# Plan 7: Catalog Filters — Design Spec

**Date:** 2026-05-22
**Scope:** Sidebar filters for CatalogPage — price range (dual slider) + color swatches. Instant filtering via URL params. Mobile drawer.

---

## Context

Project: Archittell — premium e-commerce (furniture + lighting + plumbing), Russian market.

After Plan 6, all pages are implemented. CatalogPage (`/catalog/:category`) has subcategory tabs and sort, but no price/color filters. This is the last missing MVP feature in the catalog flow.

Existing product fields relevant to filters: `price` (3 200 – 210 000 ₽), `colors` (string array, e.g. `['beige', 'grey']`), `oldPrice`, `isPopular`. No brand or inStock fields.

Color-to-hex mapping already exists in `src/pages/ProductPage.jsx` as `COLOR_MAP` — move to `src/data/colors.js` so both ProductPage and FilterSidebar can import it.

---

## Decisions

| Question | Choice | Reason |
|---|---|---|
| Filter panel location | Left sidebar, sticky | PRD spec; premium e-commerce standard |
| Filters | Price range + Color | Only fields available in data |
| Price UI | Dual range slider | User preference |
| Filter behavior | Instant (no apply button) | Better UX for small catalogs |
| State storage | URL search params | Shareable links, refresh-safe |
| Mobile | Drawer triggered by «Фильтры (N)» button | Sidebar hidden on mobile |

---

## File Map

| Action | File |
|---|---|
| Create | `src/data/colors.js` |
| Create | `src/components/catalog/DualRangeSlider.jsx` |
| Create | `src/components/catalog/FilterSidebar.jsx` |
| Create | `src/components/catalog/FilterDrawer.jsx` |
| Create | `src/components/catalog/__tests__/FilterSidebar.test.jsx` |
| Create | `src/components/catalog/__tests__/DualRangeSlider.test.jsx` |
| Modify | `src/pages/CatalogPage.jsx` |
| Modify | `src/pages/ProductPage.jsx` (remove local COLOR_MAP, import from colors.js) |

---

## Data: `src/data/colors.js`

Extracted from ProductPage. Single source of truth for color names → hex.

```js
export const COLOR_MAP = {
  beige: '#E8D5B0',
  grey: '#9E9082',
  darkbrown: '#58504A',
  lightgrey: '#D6D2CC',
  green: '#4A6040',
  taupe: '#B0A090',
  white: '#F5F5F0',
  black: '#2A2A2A',
  walnut: '#7A5C3C',
  sand: '#D4C4A0',
}

export const COLOR_LABELS = {
  beige: 'Бежевый',
  grey: 'Серый',
  darkbrown: 'Тёмно-коричневый',
  lightgrey: 'Светло-серый',
  green: 'Зелёный',
  taupe: 'Тауп',
  white: 'Белый',
  black: 'Чёрный',
  walnut: 'Орех',
  sand: 'Песочный',
}
```

---

## Component: `DualRangeSlider.jsx`

Two `<input type="range">` overlaid on a shared track. No external libraries.

Props: `min`, `max`, `valueMin`, `valueMax`, `onChange(min, max)`

```jsx
// Two inputs absolutely positioned over each other.
// Lower input: value=valueMin, max=valueMax-step
// Upper input: value=valueMax, min=valueMin+step
// Track highlight: CSS linear-gradient computed from current values
// step=1000 (round to 1 000 ₽)
```

The component is purely controlled — all state lives in the parent (CatalogPage via URL params).

---

## Component: `FilterSidebar.jsx`

Props: `products` (full unfiltered list for current category), `minPrice`, `maxPrice`, `activeColors`, `onPriceChange(min, max)`, `onColorChange(colors[])`, `onReset()`

Sections:

**Price:**
```
p «Цена»   text-xs uppercase tracking-widest text-ink-4 mb-4
DualRangeSlider min=globalMin max=globalMax valueMin=minPrice valueMax=maxPrice
div flex justify-between  — «{minPrice} ₽» / «{maxPrice} ₽»  text-xs text-ink-3
```

**Color** (only rendered if category has products with colors):
```
p «Цвет»   text-xs uppercase tracking-widest text-ink-4 mb-4 mt-6
div flex flex-wrap gap-2
  button per unique color in current category's products:
    w-6 h-6 rounded-full border-2
    border-ink if active, border-transparent if inactive
    title={COLOR_LABELS[color]}
```

**Reset button** (only if any filter is active):
```
button «Сбросить фильтры»
  text-xs text-ink-4 underline underline-offset-2 hover:text-ink mt-6
```

`globalMin` and `globalMax` are computed from the `products` prop (min/max price of the current category), not hardcoded.

---

## Component: `FilterDrawer.jsx`

Mobile-only overlay. Props: `isOpen`, `onClose`, same filter props as FilterSidebar.

```jsx
// fixed inset-0 z-50 — backdrop div (bg-black/40, onClick=onClose)
// fixed right-0 top-0 bottom-0 w-80 bg-white — panel
// Contains: «Фильтры» heading + FilterSidebar + «Закрыть» button
```

---

## CatalogPage changes

### Layout

Wrap existing content in flex layout:

```jsx
<div className="flex gap-8">
  {/* Sidebar — desktop only */}
  <aside className="hidden md:block w-52 flex-shrink-0 pt-2">
    <FilterSidebar ... />
  </aside>

  {/* Product grid */}
  <div className="flex-1 min-w-0">
    {/* existing subcategory + sort row */}
    {/* existing product grid */}
  </div>
</div>
```

### URL params

Add to existing `useSearchParams`:

```js
const minPriceParam = Number(searchParams.get('minPrice')) || null
const maxPriceParam = Number(searchParams.get('maxPrice')) || null
const colorsParam = searchParams.get('colors')?.split(',').filter(Boolean) || []
```

Handlers:

```js
function setPriceFilter(min, max) {
  const next = new URLSearchParams(searchParams)
  if (min === globalMin) next.delete('minPrice'); else next.set('minPrice', min)
  if (max === globalMax) next.delete('maxPrice'); else next.set('maxPrice', max)
  setSearchParams(next, { replace: true })
}

function setColorFilter(colors) {
  const next = new URLSearchParams(searchParams)
  if (colors.length === 0) next.delete('colors')
  else next.set('colors', colors.join(','))
  setSearchParams(next, { replace: true })
}

function resetFilters() {
  const next = new URLSearchParams(searchParams)
  next.delete('minPrice'); next.delete('maxPrice'); next.delete('colors')
  setSearchParams(next, { replace: true })
}
```

### Filter logic

Applied after subcategory + sort (existing):

```js
const globalMin = Math.min(...rawProducts.map(p => p.price))
const globalMax = Math.max(...rawProducts.map(p => p.price))
const minPrice = minPriceParam ?? globalMin
const maxPrice = maxPriceParam ?? globalMax

const products = useMemo(() => {
  let list = sortProducts(rawProducts, activeSort)
  list = list.filter(p => p.price >= minPrice && p.price <= maxPrice)
  if (colorsParam.length > 0)
    list = list.filter(p => p.colors?.some(c => colorsParam.includes(c)))
  return list
}, [rawProducts, activeSort, minPrice, maxPrice, colorsParam])
```

### Mobile button

```jsx
{/* Mobile: shown below md */}
<div className="md:hidden flex items-center gap-3 mb-4">
  <button onClick={() => setDrawerOpen(true)}
    className="text-sm text-ink border border-ink/20 rounded-full px-4 py-1.5">
    Фильтры{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
  </button>
  {activeFilterCount > 0 && (
    <button onClick={resetFilters} className="text-xs text-ink-4 underline">
      Сбросить
    </button>
  )}
</div>

<FilterDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} ... />
```

`activeFilterCount` = number of active non-default filters (minPrice !== globalMin, maxPrice !== globalMax, colors.length).

---

## Tests

Target: ~103 → ~111 tests (8 new).

**`DualRangeSlider.test.jsx`** (2 tests):
- Renders two range inputs
- Calls onChange when input value changes

**`FilterSidebar.test.jsx`** (4 tests):
- Renders «Цена» heading
- Renders «Цвет» heading when products have colors
- «Сбросить фильтры» hidden when no active filters
- «Сбросить фильтры» visible when price filter is active

**`CatalogPage.test.jsx`** (2 new tests added to existing file):
- Price filter removes products outside range
- Color filter removes products without matching color

---

## Out of Scope

- Brand filter (no brand field in data)
- In-stock filter (no inStock field)
- Price histogram / distribution visualization
- Filter animation/transition
- Saved filters / filter presets
- Filter on CollectionItemPage (separate feature)
