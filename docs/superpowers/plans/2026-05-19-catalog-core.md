# Catalog Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild CatalogPage and ProductPage in Light Glass style, add a catalog root page for `/catalog`, and add product sorting.

**Architecture:** Three tasks — (1) sort utility + catalog root page + routing, (2) CatalogPage Light Glass rebuild, (3) ProductPage Light Glass rebuild. Each task has its own tests. Tasks are sequential: Task 2 uses `sortProducts` added in Task 1.

**Tech Stack:** React 19, Vite, Tailwind v4, React Router v7, Vitest + @testing-library/react, lucide-react, react-helmet-async.

---

## Codebase context (read before starting any task)

### Design tokens (already in `src/index.css`)

| Token | Value | Usage |
|---|---|---|
| `--color-page` | `#EFEFEF` | Page background (`bg-page`) |
| `--color-ink` | `#1a1a1a` | Primary text (`text-ink`) |
| `--color-ink-2` | `#555` | Secondary text |
| `--color-ink-3` | `#888` | Tertiary text |
| `--color-ink-4` | `#aaa` | Labels, meta |
| `--color-ink-5` | `#ccc` | Placeholder |

CSS classes in `src/index.css` `@layer utilities`:
- `.glass-card` — `rgba(255,255,255,0.72)` bg, `backdrop-filter: blur(20px)`, border-radius 20px, white border, soft shadow
- `.glass-pill` — same as glass-card but `border-radius: 9999px`
- `.glass-circle` — `rgba(255,255,255,0.8)` bg, `backdrop-filter: blur(12px)`, border-radius 9999px

### Existing components
- `src/components/ui/GlassCard.jsx` — polymorphic glass card wrapper (`as` prop, merges className)
- `src/components/ui/Button.jsx` — variants: `primary` (bg-ink text-white), `secondary` (glass-pill), `ghost` (transparent)
- `src/components/ui/Badge.jsx` — variants: neutral / success / warning / info
- `src/components/ui/NavIcon.jsx` — icon link with count bubble
- `src/components/ui/ProductCard.jsx` — glass-card product card, links to `/product/:id`, uses `useCart`

### Existing data/context
- `src/data/products.js` — exports: `PRODUCTS`, `CATEGORY_LABELS`, `SUBCATEGORIES`, `getProductById(id)`, `getPopularProducts(count)`, `getProductsByCategory(category, subcategory)`
- `src/context/CartContext.jsx` — `CartProvider`, `useCart()` → `{ items, itemCount, subtotal, discount, total, promo, promoError, dispatch }`. Dispatch types: `ADD { product, color, fabric }`, `REMOVE { cartId }`, `UPDATE_QTY { cartId, qty }`, `APPLY_PROMO { code }`, `CLEAR_PROMO`, `CLEAR`.

### Test setup
- `vitest` + `@testing-library/react` + `jsdom` (configured in `vite.config.js`)
- `src/test-setup.js` imports `@testing-library/jest-dom`
- Run all tests: `npm run test:run`
- Run single file: `npx vitest run src/path/to/file.test.jsx`

### Current routing (in `src/App.jsx`)
```jsx
<Route path="/catalog" element={<CatalogPage />} />
<Route path="/catalog/:category" element={<CatalogPage />} />
<Route path="/product/:id" element={<ProductPage />} />
```

---

## File map

| File | Action | Responsibility |
|---|---|---|
| `src/data/products.js` | Modify | Add `sortProducts(products, sort)` export |
| `src/data/__tests__/products.test.js` | Create | Tests for `sortProducts` |
| `src/pages/CatalogRootPage.jsx` | Create | `/catalog` — 3-category selection page |
| `src/pages/__tests__/CatalogRootPage.test.jsx` | Create | Tests for CatalogRootPage |
| `src/App.jsx` | Modify | Swap `/catalog` route to `CatalogRootPage` |
| `src/pages/CatalogPage.jsx` | Modify | Full rebuild in Light Glass style + sort |
| `src/pages/__tests__/CatalogPage.test.jsx` | Create | Tests for CatalogPage |
| `src/pages/ProductPage.jsx` | Modify | Full rebuild in Light Glass style |
| `src/pages/__tests__/ProductPage.test.jsx` | Create | Tests for ProductPage |

---

## Task 1: sortProducts utility + CatalogRootPage + routing

**Files:**
- Modify: `src/data/products.js`
- Create: `src/data/__tests__/products.test.js`
- Create: `src/pages/CatalogRootPage.jsx`
- Create: `src/pages/__tests__/CatalogRootPage.test.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write failing tests for `sortProducts`**

Create `src/data/__tests__/products.test.js`:

```js
import { sortProducts } from '../products'

const sample = [
  { id: 1, price: 100, isPopular: false },
  { id: 2, price: 50, isPopular: true },
  { id: 3, price: 200, isPopular: false },
]

describe('sortProducts', () => {
  test('price_asc sorts ascending by price', () => {
    const sorted = sortProducts(sample, 'price_asc')
    expect(sorted.map((p) => p.price)).toEqual([50, 100, 200])
  })

  test('price_desc sorts descending by price', () => {
    const sorted = sortProducts(sample, 'price_desc')
    expect(sorted.map((p) => p.price)).toEqual([200, 100, 50])
  })

  test('popular puts isPopular=true items first', () => {
    const sorted = sortProducts(sample, 'popular')
    expect(sorted[0].id).toBe(2)
  })

  test('does not mutate the original array', () => {
    const copy = [...sample]
    sortProducts(sample, 'price_asc')
    expect(sample).toEqual(copy)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/data/__tests__/products.test.js
```

Expected: FAIL — `sortProducts is not a function` (or similar import error).

- [ ] **Step 3: Add `sortProducts` to `src/data/products.js`**

Append this function at the end of `src/data/products.js` (after the existing `getProductsByCategory` function):

```js
export function sortProducts(products, sort) {
  if (sort === 'price_asc') return [...products].sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') return [...products].sort((a, b) => b.price - a.price)
  return [...products].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/data/__tests__/products.test.js
```

Expected: 4/4 PASS.

- [ ] **Step 5: Write failing tests for `CatalogRootPage`**

Create `src/pages/__tests__/CatalogRootPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CatalogRootPage from '../CatalogRootPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <CatalogRootPage />
    </MemoryRouter>
  )
}

describe('CatalogRootPage', () => {
  test('renders page heading "Каталог"', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Каталог' })).toBeInTheDocument()
  })

  test('renders Мебель link to /catalog/furniture', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /мебель/i })
    expect(link).toHaveAttribute('href', '/catalog/furniture')
  })

  test('renders Освещение link to /catalog/lighting', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /освещение/i })
    expect(link).toHaveAttribute('href', '/catalog/lighting')
  })

  test('renders Сантехника link to /catalog/plumbing', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /сантехника/i })
    expect(link).toHaveAttribute('href', '/catalog/plumbing')
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npx vitest run src/pages/__tests__/CatalogRootPage.test.jsx
```

Expected: FAIL — `Cannot find module '../CatalogRootPage'`.

- [ ] **Step 7: Create `src/pages/CatalogRootPage.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const CATEGORIES = [
  {
    id: 'furniture',
    label: 'Мебель',
    description: 'Диваны, кровати, обеденные столы',
  },
  {
    id: 'lighting',
    label: 'Освещение',
    description: 'Подвесные, трековые, встраиваемые',
  },
  {
    id: 'plumbing',
    label: 'Сантехника',
    description: 'Смесители, раковины, ванны',
  },
]

export default function CatalogRootPage() {
  return (
    <>
      <Helmet>
        <title>Каталог — Pufflux</title>
        <meta name="description" content="Мебель, освещение и сантехника от лучших брендов." />
      </Helmet>
      <div className="pt-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-light text-ink mb-2">Каталог</h1>
          <p className="text-ink-3 text-sm mb-12">Три категории. Один адрес.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.id}`}
                className="glass-card p-8 block group hover:-translate-y-1 transition-transform duration-200"
              >
                <h2 className="text-lg font-light text-ink mb-2">{cat.label}</h2>
                <p className="text-sm text-ink-3">{cat.description}</p>
                <p className="text-xs text-ink-4 mt-6 group-hover:text-ink-3 transition-colors">
                  Смотреть →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npx vitest run src/pages/__tests__/CatalogRootPage.test.jsx
```

Expected: 4/4 PASS.

- [ ] **Step 9: Update `src/App.jsx` routing**

In `src/App.jsx`, add the import for `CatalogRootPage` and swap the `/catalog` route:

Change the import section — add after the existing `CatalogPage` import:
```jsx
import CatalogRootPage from './pages/CatalogRootPage'
```

Change the `/catalog` route from:
```jsx
<Route path="/catalog" element={<CatalogPage />} />
```
to:
```jsx
<Route path="/catalog" element={<CatalogRootPage />} />
```

The `/catalog/:category` route stays unchanged.

- [ ] **Step 10: Run all tests to verify nothing broke**

```bash
npm run test:run
```

Expected: all tests PASS (previous 23 + 8 new = 31).

- [ ] **Step 11: Commit**

```bash
git add src/data/products.js src/data/__tests__/products.test.js src/pages/CatalogRootPage.jsx src/pages/__tests__/CatalogRootPage.test.jsx src/App.jsx
git commit -m "feat: add sortProducts utility, CatalogRootPage, update /catalog route"
```

---

## Task 2: CatalogPage Light Glass rebuild

**Files:**
- Modify: `src/pages/CatalogPage.jsx`
- Create: `src/pages/__tests__/CatalogPage.test.jsx`

**Context:** `CatalogPage` receives `category` from `useParams()`. It renders subcategory filter pills and a product grid. Sort state is stored in URL query param `?sort=price_asc|price_desc` (default: popular). Subcategory filter is stored in `?sub=sofas` etc. The component uses `getProductsByCategory` and the new `sortProducts` (added in Task 1).

**Important:** Remove all old color tokens (`text-graphite`, `bg-graphite`, `text-stone-*`, `border-stone-*`, `bg-white`, `bg-stone-100`). Use only Light Glass tokens.

- [ ] **Step 1: Write failing tests for CatalogPage**

Create `src/pages/__tests__/CatalogPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import CatalogPage from '../CatalogPage'

function renderCatalog(path = '/catalog/furniture') {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/catalog/:category" element={<CatalogPage />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  )
}

describe('CatalogPage', () => {
  test('renders category heading Мебель for furniture', () => {
    renderCatalog()
    expect(screen.getByRole('heading', { name: 'Мебель' })).toBeInTheDocument()
  })

  test('renders product cards for the category', () => {
    renderCatalog()
    expect(screen.getByText('Диван Forma')).toBeInTheDocument()
  })

  test('shows error message for unknown category', () => {
    renderCatalog('/catalog/unknown')
    expect(screen.getByText('Каталог не найден')).toBeInTheDocument()
  })

  test('renders subcategory filter buttons', () => {
    renderCatalog()
    expect(screen.getByRole('button', { name: 'Диваны' })).toBeInTheDocument()
  })

  test('renders sort select with default value popular', () => {
    renderCatalog()
    const select = screen.getByRole('combobox', { name: 'Сортировка' })
    expect(select).toBeInTheDocument()
    expect(select.value).toBe('popular')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/pages/__tests__/CatalogPage.test.jsx
```

Expected: some tests FAIL because the current CatalogPage doesn't have a combobox with aria-label "Сортировка". (Other tests may already pass — that's fine. The sort select test must fail.)

- [ ] **Step 3: Rewrite `src/pages/CatalogPage.jsx`**

Replace the entire file content with:

```jsx
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  CATEGORY_LABELS,
  SUBCATEGORIES,
  getProductsByCategory,
  sortProducts,
} from '../data/products'
import ProductCard from '../components/ui/ProductCard'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Популярные' },
  { value: 'price_asc', label: 'Цена ↑' },
  { value: 'price_desc', label: 'Цена ↓' },
]

export default function CatalogPage() {
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSub = searchParams.get('sub') || 'all'
  const activeSort = searchParams.get('sort') || 'popular'

  const label = CATEGORY_LABELS[category] ?? category
  const subs = SUBCATEGORIES[category] ?? []
  const rawProducts = getProductsByCategory(
    category,
    activeSub === 'all' ? null : activeSub
  )
  const products = sortProducts(rawProducts, activeSort)

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

  if (!CATEGORY_LABELS[category]) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <p className="text-ink-3">Каталог не найден</p>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{label} — каталог Pufflux</title>
        <meta
          name="description"
          content={`Каталог ${label.toLowerCase()} в Pufflux. Отобранные бренды.`}
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
          {/* Filters + sort row */}
          {subs.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              {/* Subcategory filters */}
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

              {/* Sort */}
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
          )}

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
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/pages/__tests__/CatalogPage.test.jsx
```

Expected: 5/5 PASS.

- [ ] **Step 5: Run full test suite**

```bash
npm run test:run
```

Expected: all tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/CatalogPage.jsx src/pages/__tests__/CatalogPage.test.jsx
git commit -m "feat: rebuild CatalogPage in Light Glass style with sort"
```

---

## Task 3: ProductPage Light Glass rebuild

**Files:**
- Modify: `src/pages/ProductPage.jsx`
- Create: `src/pages/__tests__/ProductPage.test.jsx`

**Context:** `ProductPage` receives `id` from `useParams()`. It renders a gallery (main image + thumbnails), 2D configurator (color swatches + fabric pills), CTA button, description, and specs table. It uses `useCart` dispatch type `ADD`.

The 2D configurator logic:
- Colors: circle swatches with `backgroundColor` from `COLOR_MAP`. Active = `border-ink scale-110`. Clicking updates `selectedColor` state.
- Fabrics: pill buttons. Active = `bg-ink text-white border-ink`. Clicking updates `selectedFabric` state.
- Both `selectedColor` and `selectedFabric` are passed to `dispatch({ type: 'ADD', product, color, fabric })`.

**Remove:** all old color tokens (`text-graphite`, `bg-graphite`, `text-stone-*`, `border-stone-*`, `bg-stone-100`).

- [ ] **Step 1: Write failing tests for ProductPage**

Create `src/pages/__tests__/ProductPage.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import ProductPage from '../ProductPage'

function renderProduct(id = '1') {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  )
}

describe('ProductPage', () => {
  test('renders product name as heading', () => {
    renderProduct()
    expect(screen.getByRole('heading', { name: 'Диван Forma' })).toBeInTheDocument()
  })

  test('renders formatted price', () => {
    renderProduct()
    // price is 145000, formatted as "145 000 ₽" (ru-RU locale uses non-breaking space)
    expect(screen.getByText(/145/)).toBeInTheDocument()
  })

  test('renders color swatch buttons', () => {
    renderProduct()
    // Product 1 has colors: ['Серый', 'Бежевый', 'Графит', 'Синий']
    expect(screen.getByRole('button', { name: 'Серый' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Бежевый' })).toBeInTheDocument()
  })

  test('clicking В корзину changes button text to Добавлено', () => {
    renderProduct()
    const btn = screen.getByRole('button', { name: /в корзину/i })
    fireEvent.click(btn)
    expect(screen.getByRole('button', { name: /добавлено/i })).toBeInTheDocument()
  })

  test('renders Товар не найден for unknown id', () => {
    renderProduct('9999')
    expect(screen.getByText('Товар не найден')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/pages/__tests__/ProductPage.test.jsx
```

Expected: some tests FAIL (the `getByRole('button', { name: 'Серый' })` test will fail because old ProductPage doesn't have `aria-label` on color swatches; the heading test may fail because old code has `<h1>` but with `text-graphite` class — though that doesn't affect the query).

Note: if most tests pass already, confirm that the `aria-label` test fails. The test is testing the NEW spec, not the old implementation.

- [ ] **Step 3: Rewrite `src/pages/ProductPage.jsx`**

Replace the entire file content with:

```jsx
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Heart } from 'lucide-react'
import { getProductById, CATEGORY_LABELS } from '../data/products'
import { useCart } from '../context/CartContext'
import Button from '../components/ui/Button'

const COLOR_MAP = {
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
  'Чёрный': '#111111',
  'Латунь': '#B08D57',
  'Хром': '#C0C0C0',
  'Матовый чёрный': '#2A2A2A',
  'Матовый белый': '#F0F0F0',
  'Белый глянец': '#FFFFFF',
  'Белый матовый': '#F5F5F5',
  'Дуб натуральный': '#C49A6C',
  'Дуб тёмный': '#7B5533',
  'Серебристый': '#D1D5DB',
}

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { dispatch } = useCart()

  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? null)
  const [selectedFabric, setSelectedFabric] = useState(product?.fabrics[0] ?? null)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4 text-ink-3">
        <p>Товар не найден</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-ink underline"
        >
          Вернуться назад
        </button>
      </div>
    )
  }

  const categoryLabel = CATEGORY_LABELS[product.category]

  function handleAddToCart() {
    dispatch({ type: 'ADD', product, color: selectedColor, fabric: selectedFabric })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>{product.name} — Pufflux</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="pt-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          {/* Breadcrumb */}
          <nav className="text-xs text-ink-4 mb-8 flex gap-2 items-center flex-wrap">
            <Link to="/" className="hover:text-ink-2 transition-colors">
              Главная
            </Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-ink-2 transition-colors">
              Каталог
            </Link>
            <span>/</span>
            <Link
              to={`/catalog/${product.category}`}
              className="hover:text-ink-2 transition-colors"
            >
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Gallery */}
            <div>
              {/* Main image */}
              <div className="glass-card overflow-hidden aspect-[4/3] mb-3">
                <div className="w-full h-full bg-white/40 flex items-center justify-center">
                  <span className="text-ink-4 text-xs text-center px-8 leading-relaxed">
                    {product.images[activeImage]}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Фото ${i + 1}`}
                    className={`flex-1 aspect-square glass-card overflow-hidden border-2 transition-all ${
                      i === activeImage ? 'border-ink' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full bg-white/40 flex items-center justify-center">
                      <span className="text-ink-4 text-[9px]">Фото {i + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink-3 mb-3">
                {categoryLabel}
              </p>
              <h1 className="text-2xl md:text-3xl font-light text-ink mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-2xl font-normal text-ink">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-ink-4 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              {/* Color selector */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink-4 mb-3">
                    Цвет — <span className="text-ink">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        aria-label={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-ink scale-110'
                            : 'border-transparent hover:border-ink-4'
                        }`}
                        style={{ backgroundColor: COLOR_MAP[color] ?? '#E5E7EB' }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Fabric selector */}
              {product.fabrics.length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink-4 mb-3">
                    Материал — <span className="text-ink">{selectedFabric}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.fabrics.map((fabric) => (
                      <button
                        key={fabric}
                        onClick={() => setSelectedFabric(fabric)}
                        className={`text-xs px-4 py-2 rounded-full border transition-colors ${
                          selectedFabric === fabric
                            ? 'bg-ink text-white border-ink'
                            : 'bg-white/60 text-ink-3 border-white/80 hover:text-ink'
                        }`}
                      >
                        {fabric}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex gap-3 mb-8">
                <Button
                  onClick={handleAddToCart}
                  variant={added ? 'ghost' : 'primary'}
                  className="flex-1"
                >
                  {added ? '✓ Добавлено' : 'В корзину'}
                </Button>
                <Button variant="ghost" size="sm" aria-label="В избранное" className="px-3">
                  <Heart size={16} strokeWidth={1.5} />
                </Button>
              </div>

              {/* Description */}
              <p className="text-ink-3 text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specs */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink-4 mb-4">
                  Характеристики
                </p>
                <div className="flex flex-col">
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <div
                      key={key}
                      className={`flex justify-between py-3 text-sm border-b border-black/5 ${
                        i === 0 ? 'border-t border-black/5' : ''
                      }`}
                    >
                      <span className="text-ink-3">{key}</span>
                      <span className="text-ink font-normal text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/pages/__tests__/ProductPage.test.jsx
```

Expected: 5/5 PASS.

- [ ] **Step 5: Run full test suite**

```bash
npm run test:run
```

Expected: all tests PASS (31 from previous tasks + 5 new = 36 total).

- [ ] **Step 6: Commit**

```bash
git add src/pages/ProductPage.jsx src/pages/__tests__/ProductPage.test.jsx
git commit -m "feat: rebuild ProductPage in Light Glass style with 2D configurator"
```

---

## Self-review

**Spec coverage check:**

| Requirement (PRD prd-04-delivery §1 Волна 1) | Covered by |
|---|---|
| Каталог: листинг + фильтры | Task 2 — subcategory filter pills, sort dropdown |
| Product page: галерея | Task 3 — main image + thumbnails |
| Product page: 2D-конфигуратор (цвет/материал) | Task 3 — color swatches + fabric pills |
| Product page: характеристики, CTA | Task 3 — specs table + В корзину button |
| `/catalog` root page | Task 1 — CatalogRootPage with 3 category cards |
| Light Spatial Glass style | Tasks 2 & 3 — all old tokens removed, glass-card/pill/circle used |
| Breadcrumb navigation | Tasks 2 & 3 — breadcrumb in both pages |
| Sort (по цене) | Task 2 — sort dropdown + sortProducts utility |
| i18n-ready (no hardcoded non-RU strings) | All text is Russian, no English labels in UI |

**Placeholder scan:** No TBD/TODO found in plan.

**Type consistency:** `sortProducts(products, sort)` — defined in Task 1 Step 3, used in Task 2 Step 3 with identical signature. `dispatch({ type: 'ADD', product, color, fabric })` — consistent with CartContext contract. `getProductById(id)` — consistent with existing products.js export. `CATEGORY_LABELS`, `SUBCATEGORIES`, `getProductsByCategory` — all existing exports, used consistently.
