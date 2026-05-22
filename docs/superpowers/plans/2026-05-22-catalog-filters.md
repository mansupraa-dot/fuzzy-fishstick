# Catalog Filters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a sticky left sidebar with price range (dual slider) and color swatch filters to CatalogPage, state stored in URL params, with a mobile drawer.

**Architecture:** Extract `COLOR_MAP` from ProductPage into `src/data/colors.js` (single source of truth). Build `DualRangeSlider` (two overlapping `<input type="range">` elements, no library), `FilterSidebar` (price + color sections), and `FilterDrawer` (mobile overlay wrapping FilterSidebar). CatalogPage wraps existing content in a flex layout, reads filter state from URL params as primitives, and filters via `useMemo`.

**Tech Stack:** React 19, React Router v7 `useSearchParams`, Tailwind v4, Vitest + @testing-library/react.

---

## File Map

| Action | File |
|---|---|
| Create | `src/data/colors.js` |
| Create | `src/components/catalog/DualRangeSlider.jsx` |
| Create | `src/components/catalog/__tests__/DualRangeSlider.test.jsx` |
| Create | `src/components/catalog/FilterSidebar.jsx` |
| Create | `src/components/catalog/__tests__/FilterSidebar.test.jsx` |
| Create | `src/components/catalog/FilterDrawer.jsx` |
| Modify | `src/pages/CatalogPage.jsx` |
| Modify | `src/pages/ProductPage.jsx` |
| Modify | `src/pages/__tests__/CatalogPage.test.jsx` |

**Test count:** 103 → 111 (+2 DualRangeSlider, +4 FilterSidebar, +2 CatalogPage)

---

## Context for implementers

**Color keys are Russian strings.** Product `colors` arrays contain Russian strings like `'Серый'`, `'Бежевый'` — these are both the identifier and the display label. `ProductPage.jsx` already has a local `COLOR_MAP` mapping these Russian strings → hex. Task 1 moves it to `src/data/colors.js`.

**`getProductsByCategory(category)`** returns all products in the category ignoring subcategory. **`getProductsByCategory(category, subcategory)`** returns subcategory-filtered. Both are in `src/data/products.js`.

**Design tokens:** `text-ink` = #1a1a1a, `text-ink-3` = medium grey, `text-ink-4` = light grey. `.glass-card` = white/blur card. Background is set globally on `html`/`body` — never add `bg-*` to page roots.

**Tests:** run with `npm run test:run`. Config: Vitest + jsdom, globals: true (no need to import `describe`/`test`/`expect` — they're global, but `vi` must be imported). Pool: forks.

---

## Task 1: Extract COLOR_MAP to `src/data/colors.js`

**Files:**
- Create: `src/data/colors.js`
- Modify: `src/pages/ProductPage.jsx`

No new tests — pure data extraction. Verify by running the full suite.

- [ ] **Step 1: Create `src/data/colors.js`**

```js
export const COLOR_MAP = {
  'Серый': '#9CA3AF',
  'Бежевый': '#D4B896',
  'Графит': '#374151',
  'Синий': '#3B82F6',
  'Белый': '#F9FAFB',
  'Дуб': '#B5844C',
  'Антрацит': '#1F2937',
  'Кремовый': '#FFF8F0',
  'Терракот': '#C2775B',
  'Оливковый': '#6B7C4B',
  'Дуб натуральный': '#C49A6C',
  'Дуб тёмный': '#7B5533',
  'Чёрный': '#111111',
  'Латунь': '#B08D57',
  'Серебристый': '#D1D5DB',
  'Белый матовый': '#F0F0F0',
  'Хром': '#C0C0C0',
  'Матовый чёрный': '#2A2A2A',
  'Матовый белый': '#F0F0F0',
  'Чёрный матовый': '#1A1A1A',
  'Белый глянец': '#FFFFFF',
}
```

- [ ] **Step 2: Update `src/pages/ProductPage.jsx`**

Remove the local `const COLOR_MAP = { ... }` block (lines 9–31 in the current file). Add this import after the existing imports:

```js
import { COLOR_MAP } from '../data/colors'
```

Everything else in ProductPage is unchanged — all existing usages of `COLOR_MAP[color]` continue to work.

- [ ] **Step 3: Verify existing tests still pass**

Run: `npm run test:run`
Expected: All 103 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/data/colors.js src/pages/ProductPage.jsx
git commit -m "refactor: extract COLOR_MAP to src/data/colors.js"
```

---

## Task 2: `DualRangeSlider.jsx` + tests

**Files:**
- Create: `src/components/catalog/DualRangeSlider.jsx`
- Create: `src/components/catalog/__tests__/DualRangeSlider.test.jsx`

**How the dual slider works:** Two `<input type="range">` elements are stacked via `position: absolute`, spanning the full width with `opacity: 0` (invisible interaction areas). A custom `<div>` behind them renders the visual track and the filled range segment using computed percentages. The min input has lower z-index; when the min thumb is near the max, its z-index rises to 5 so it stays grabbable. Each input clamps its value to prevent crossing the other thumb.

- [ ] **Step 1: Write the failing tests**

Create `src/components/catalog/__tests__/DualRangeSlider.test.jsx`:

```jsx
import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import DualRangeSlider from '../DualRangeSlider'

describe('DualRangeSlider', () => {
  test('renders two range inputs', () => {
    const { container } = render(
      <DualRangeSlider
        min={3200}
        max={210000}
        valueMin={3200}
        valueMax={210000}
        onChange={vi.fn()}
      />
    )
    expect(container.querySelectorAll('input[type="range"]')).toHaveLength(2)
  })

  test('calls onChange with updated min when min input changes', () => {
    const onChange = vi.fn()
    const { container } = render(
      <DualRangeSlider
        min={3200}
        max={210000}
        valueMin={3200}
        valueMax={210000}
        onChange={onChange}
      />
    )
    const [minInput] = container.querySelectorAll('input[type="range"]')
    fireEvent.change(minInput, { target: { value: '50000' } })
    expect(onChange).toHaveBeenCalledWith(50000, 210000)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:run -- --reporter=verbose src/components/catalog/__tests__/DualRangeSlider.test.jsx`
Expected: FAIL — `Cannot find module '../DualRangeSlider'`

- [ ] **Step 3: Create `src/components/catalog/DualRangeSlider.jsx`**

```jsx
export default function DualRangeSlider({ min, max, valueMin, valueMax, onChange }) {
  const step = 1000
  const range = max - min || 1
  const pctMin = ((valueMin - min) / range) * 100
  const pctMax = ((valueMax - min) / range) * 100

  function handleMin(e) {
    const val = Math.min(Number(e.target.value), valueMax - step)
    onChange(val, valueMax)
  }

  function handleMax(e) {
    const val = Math.max(Number(e.target.value), valueMin + step)
    onChange(valueMin, val)
  }

  return (
    <div className="relative h-5 flex items-center">
      {/* Visual track */}
      <div className="absolute inset-x-0 h-[3px] bg-black/10 rounded-full">
        <div
          className="absolute h-full bg-ink rounded-full"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
        />
      </div>
      {/* Min thumb — invisible input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMin}
        onChange={handleMin}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ zIndex: valueMin > max - step ? 5 : 3 }}
      />
      {/* Max thumb — invisible input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMax}
        onChange={handleMax}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ zIndex: 4 }}
      />
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- --reporter=verbose src/components/catalog/__tests__/DualRangeSlider.test.jsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/catalog/DualRangeSlider.jsx src/components/catalog/__tests__/DualRangeSlider.test.jsx
git commit -m "feat: add DualRangeSlider component"
```

---

## Task 3: `FilterSidebar.jsx` + tests

**Files:**
- Create: `src/components/catalog/FilterSidebar.jsx`
- Create: `src/components/catalog/__tests__/FilterSidebar.test.jsx`

**Props:** `products` (full category product list, used to compute globalMin/globalMax and unique colors), `minPrice`, `maxPrice`, `activeColors` (string[]), `onPriceChange(min, max)`, `onColorChange(colors[])`, `onReset()`.

The "reset" button is visible only when at least one filter differs from its default (i.e., `minPrice !== globalMin || maxPrice !== globalMax || activeColors.length > 0`).

Color swatches only render when the current category has products with colors. Each swatch is a round button styled via `COLOR_MAP[color]`; active swatches get `border-ink`, inactive get `border-transparent`.

- [ ] **Step 1: Write the failing tests**

Create `src/components/catalog/__tests__/FilterSidebar.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import FilterSidebar from '../FilterSidebar'

const twoProducts = [
  { id: 1, price: 98000, colors: ['Серый', 'Бежевый'] },
  { id: 2, price: 145000, colors: ['Бежевый', 'Терракот'] },
]

function renderSidebar({
  products = twoProducts,
  minPrice = 98000,
  maxPrice = 145000,
  activeColors = [],
} = {}) {
  return render(
    <FilterSidebar
      products={products}
      minPrice={minPrice}
      maxPrice={maxPrice}
      activeColors={activeColors}
      onPriceChange={vi.fn()}
      onColorChange={vi.fn()}
      onReset={vi.fn()}
    />
  )
}

describe('FilterSidebar', () => {
  test('renders «Цена» heading', () => {
    renderSidebar()
    expect(screen.getByText('Цена')).toBeInTheDocument()
  })

  test('renders «Цвет» heading when products have colors', () => {
    renderSidebar()
    expect(screen.getByText('Цвет')).toBeInTheDocument()
  })

  test('«Сбросить фильтры» hidden when no active filters', () => {
    // minPrice=globalMin(98000), maxPrice=globalMax(145000), no colors → no active filter
    renderSidebar({ minPrice: 98000, maxPrice: 145000, activeColors: [] })
    expect(screen.queryByText('Сбросить фильтры')).not.toBeInTheDocument()
  })

  test('«Сбросить фильтры» visible when price filter is active', () => {
    // minPrice(100000) !== globalMin(98000) → filter is active
    renderSidebar({ minPrice: 100000, maxPrice: 145000 })
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:run -- --reporter=verbose src/components/catalog/__tests__/FilterSidebar.test.jsx`
Expected: FAIL — `Cannot find module '../FilterSidebar'`

- [ ] **Step 3: Create `src/components/catalog/FilterSidebar.jsx`**

```jsx
import { COLOR_MAP } from '../../data/colors'
import DualRangeSlider from './DualRangeSlider'

export default function FilterSidebar({
  products,
  minPrice,
  maxPrice,
  activeColors,
  onPriceChange,
  onColorChange,
  onReset,
}) {
  const globalMin = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0
  const globalMax = products.length > 0 ? Math.max(...products.map(p => p.price)) : 0
  const uniqueColors = [...new Set(products.flatMap(p => p.colors ?? []))]
  const hasActiveFilter =
    minPrice !== globalMin || maxPrice !== globalMax || activeColors.length > 0

  function toggleColor(color) {
    if (activeColors.includes(color)) {
      onColorChange(activeColors.filter(c => c !== color))
    } else {
      onColorChange([...activeColors, color])
    }
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-ink-4 mb-4">Цена</p>
      <DualRangeSlider
        min={globalMin}
        max={globalMax}
        valueMin={minPrice}
        valueMax={maxPrice}
        onChange={onPriceChange}
      />
      <div className="flex justify-between mt-2">
        <span className="text-xs text-ink-3">{minPrice.toLocaleString('ru-RU')} ₽</span>
        <span className="text-xs text-ink-3">{maxPrice.toLocaleString('ru-RU')} ₽</span>
      </div>

      {uniqueColors.length > 0 && (
        <>
          <p className="text-xs uppercase tracking-widest text-ink-4 mb-4 mt-6">Цвет</p>
          <div className="flex flex-wrap gap-2">
            {uniqueColors.map(color => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                title={color}
                aria-label={color}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  activeColors.includes(color) ? 'border-ink' : 'border-transparent'
                }`}
                style={{ backgroundColor: COLOR_MAP[color] ?? '#E5E7EB' }}
              />
            ))}
          </div>
        </>
      )}

      {hasActiveFilter && (
        <button
          onClick={onReset}
          className="text-xs text-ink-4 underline underline-offset-2 hover:text-ink mt-6 block"
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- --reporter=verbose src/components/catalog/__tests__/FilterSidebar.test.jsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/catalog/FilterSidebar.jsx src/components/catalog/__tests__/FilterSidebar.test.jsx
git commit -m "feat: add FilterSidebar component"
```

---

## Task 4: `FilterDrawer.jsx`

**Files:**
- Create: `src/components/catalog/FilterDrawer.jsx`

Thin wrapper — no standalone tests (it's verified by the full suite running after Task 5).

**Props:** same filter props as FilterSidebar, plus `isOpen` (bool) and `onClose` (fn).

When `isOpen` is false, renders nothing. When open: full-screen backdrop (`fixed inset-0 z-50 bg-black/40`) that closes on click, and a right-anchored white panel (`fixed right-0 top-0 bottom-0 w-80`) containing a heading row and FilterSidebar.

- [ ] **Step 1: Create `src/components/catalog/FilterDrawer.jsx`**

```jsx
import FilterSidebar from './FilterSidebar'

export default function FilterDrawer({
  isOpen,
  onClose,
  products,
  minPrice,
  maxPrice,
  activeColors,
  onPriceChange,
  onColorChange,
  onReset,
}) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-ink">Фильтры</p>
          <button onClick={onClose} className="text-xs text-ink-4 underline">
            Закрыть
          </button>
        </div>
        <FilterSidebar
          products={products}
          minPrice={minPrice}
          maxPrice={maxPrice}
          activeColors={activeColors}
          onPriceChange={onPriceChange}
          onColorChange={onColorChange}
          onReset={onReset}
        />
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify full suite still passes**

Run: `npm run test:run`
Expected: All 109 tests pass (103 + 2 DualRangeSlider + 4 FilterSidebar).

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/FilterDrawer.jsx
git commit -m "feat: add FilterDrawer component for mobile"
```

---

## Task 5: Wire filters into `CatalogPage.jsx` + new tests

**Files:**
- Modify: `src/pages/CatalogPage.jsx` (full replacement shown below)
- Modify: `src/pages/__tests__/CatalogPage.test.jsx` (2 new tests added inside existing `describe`)

**Key design decisions in CatalogPage:**

- `allCategoryProducts` (memoized by `category`) is passed to FilterSidebar for computing globalMin/globalMax and color swatches — it's the full category, not subcategory-filtered, so the slider range doesn't jump when the user switches subcategories.
- `colorsStr` is a string extracted from searchParams (not an array) — it's used as the useMemo dependency to avoid the stale-array-reference problem. `colorsParam` (the array) is derived from it.
- All filter state is in URL params (`minPrice`, `maxPrice`, `colors`). Setting a param equal to its default removes it from the URL to keep links clean.

- [ ] **Step 1: Add 2 new tests to `src/pages/__tests__/CatalogPage.test.jsx`**

Add these inside the existing `describe('CatalogPage', ...)` block:

```jsx
  test('price filter removes products outside range', () => {
    // furniture prices: Forma 145000, Arco 98000, Plano 210000, Linea 89000, Nord 65000, Slab 72000, Rondo 28000
    // range 140000–150000 → only Forma (145000) passes
    renderCatalog('/catalog/furniture?minPrice=140000&maxPrice=150000')
    expect(screen.getByText('Диван Forma')).toBeInTheDocument()
    expect(screen.queryByText('Диван Arco')).not.toBeInTheDocument()
    expect(screen.queryByText('Диван Plano модульный')).not.toBeInTheDocument()
  })

  test('color filter removes products without matching color', () => {
    // sofas: Forma has 'Серый', Arco ['Бежевый','Терракот','Оливковый'], Plano has 'Серый'
    // %D0%A1%D0%B5%D1%80%D1%8B%D0%B9 = percent-encoded 'Серый'
    renderCatalog('/catalog/furniture?sub=sofas&colors=%D0%A1%D0%B5%D1%80%D1%8B%D0%B9')
    expect(screen.getByText('Диван Forma')).toBeInTheDocument()
    expect(screen.queryByText('Диван Arco')).not.toBeInTheDocument()
  })
```

- [ ] **Step 2: Run tests to verify the 2 new ones fail**

Run: `npm run test:run -- --reporter=verbose src/pages/__tests__/CatalogPage.test.jsx`
Expected: 6 existing tests PASS, 2 new tests FAIL (CatalogPage doesn't filter yet).

- [ ] **Step 3: Replace `src/pages/CatalogPage.jsx` with the full new implementation**

```jsx
import { useState, useMemo } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  CATEGORY_LABELS,
  SUBCATEGORIES,
  getProductsByCategory,
  sortProducts,
} from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import FilterSidebar from '../components/catalog/FilterSidebar'
import FilterDrawer from '../components/catalog/FilterDrawer'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Популярные' },
  { value: 'price_asc', label: 'Цена ↑' },
  { value: 'price_desc', label: 'Цена ↓' },
]

export default function CatalogPage() {
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const activeSub = searchParams.get('sub') || 'all'
  const activeSort = searchParams.get('sort') || 'popular'
  const minPriceParam = Number(searchParams.get('minPrice')) || null
  const maxPriceParam = Number(searchParams.get('maxPrice')) || null
  const colorsStr = searchParams.get('colors') || ''
  const colorsParam = colorsStr.split(',').filter(Boolean)

  const label = CATEGORY_LABELS[category] ?? category
  const subs = SUBCATEGORIES[category] ?? []

  // Full category products — stable ref per category, used for globalMin/globalMax + sidebar
  const allCategoryProducts = useMemo(
    () => getProductsByCategory(category),
    [category]
  )
  const globalMin = allCategoryProducts.length > 0
    ? Math.min(...allCategoryProducts.map(p => p.price))
    : 0
  const globalMax = allCategoryProducts.length > 0
    ? Math.max(...allCategoryProducts.map(p => p.price))
    : 0

  const minPrice = minPriceParam ?? globalMin
  const maxPrice = maxPriceParam ?? globalMax

  // Filtered product list — deps are all primitives so memo works correctly
  const products = useMemo(() => {
    const raw = getProductsByCategory(category, activeSub === 'all' ? null : activeSub)
    let list = sortProducts(raw, activeSort)
    list = list.filter(p => p.price >= minPrice && p.price <= maxPrice)
    if (colorsParam.length > 0)
      list = list.filter(p => p.colors?.some(c => colorsParam.includes(c)))
    return list
  }, [category, activeSub, activeSort, minPrice, maxPrice, colorsStr])

  const activeFilterCount =
    (minPriceParam !== null && minPriceParam !== globalMin ? 1 : 0) +
    (maxPriceParam !== null && maxPriceParam !== globalMax ? 1 : 0) +
    colorsParam.length

  function setSub(id) {
    const next = new URLSearchParams(searchParams)
    if (id === 'all') next.delete('sub')
    else next.set('sub', id)
    setSearchParams(next)
  }

  function setSort(value) {
    const next = new URLSearchParams(searchParams)
    if (value === 'popular') next.delete('sort')
    else next.set('sort', value)
    setSearchParams(next)
  }

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
    next.delete('minPrice')
    next.delete('maxPrice')
    next.delete('colors')
    setSearchParams(next, { replace: true })
  }

  if (!CATEGORY_LABELS[category]) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <p className="text-ink-3">Каталог не найден</p>
      </div>
    )
  }

  const filterProps = {
    products: allCategoryProducts,
    minPrice,
    maxPrice,
    activeColors: colorsParam,
    onPriceChange: setPriceFilter,
    onColorChange: setColorFilter,
    onReset: resetFilters,
  }

  return (
    <>
      <Helmet>
        <title>{label} — каталог Archittell</title>
        <meta
          name="description"
          content={`Каталог ${label.toLowerCase()} в Archittell. Отобранные бренды.`}
        />
      </Helmet>

      <div className="pt-16 min-h-screen">
        {/* Page header */}
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
          <nav className="text-xs text-ink-4 mb-6 flex gap-2 items-center">
            <Link to="/" className="hover:text-ink-2 transition-colors">
              Главная
            </Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-ink-2 transition-colors">
              Каталог
            </Link>
            <span>/</span>
            <span className="text-ink">{label}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-light text-ink">{label}</h1>
          <p className="text-ink-4 mt-1 text-sm">{products.length} товаров</p>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-16">
          {/* Mobile filter button — hidden on md+ */}
          <div className="md:hidden flex items-center gap-3 mb-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="text-sm text-ink border border-ink/20 rounded-full px-4 py-1.5"
            >
              Фильтры{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </button>
            {activeFilterCount > 0 && (
              <button onClick={resetFilters} className="text-xs text-ink-4 underline">
                Сбросить
              </button>
            )}
          </div>

          <div className="flex gap-8">
            {/* Sidebar — desktop only */}
            <aside className="hidden md:block w-52 flex-shrink-0 pt-2">
              <FilterSidebar {...filterProps} />
            </aside>

            {/* Product area */}
            <div className="flex-1 min-w-0">
              {/* Subcategory + sort row */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                {subs.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSub('all')}
                      className={`text-xs px-4 py-2 rounded-full border transition-colors ${
                        activeSub === 'all'
                          ? 'bg-ink text-white border-ink'
                          : 'bg-white/60 text-ink-3 border-white/80 hover:text-ink'
                      }`}
                    >
                      Все
                    </button>
                    {subs.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSub(sub.id)}
                        className={`text-xs px-4 py-2 rounded-full border transition-colors ${
                          activeSub === sub.id
                            ? 'bg-ink text-white border-ink'
                            : 'bg-white/60 text-ink-3 border-white/80 hover:text-ink'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
                <select
                  value={activeSort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Сортировка"
                  className="text-xs text-ink-3 bg-white/60 border border-white/80 rounded-full px-4 py-2 outline-none cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Products grid */}
              {products.length === 0 ? (
                <div className="text-center py-24 text-ink-4">
                  <p>Товары в этой категории появятся скоро.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <FilterDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          {...filterProps}
        />
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run the full test suite**

Run: `npm run test:run`
Expected: All 111 tests pass (103 original + 2 DualRangeSlider + 4 FilterSidebar + 2 new CatalogPage).

- [ ] **Step 5: Commit**

```bash
git add src/pages/CatalogPage.jsx src/pages/__tests__/CatalogPage.test.jsx
git commit -m "feat: add price and color filters to CatalogPage"
```
