# Plan 6: Collections + Delivery + Return — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Collections (listing + detail), Delivery, and Return pages — closing all PlaceholderPages except /search.

**Architecture:** Five independent tasks: data layer first, then four pages. CollectionItemPage imports `getProductById` and `CATEGORY_LABELS` from existing `products.js`, groups products by `product.category`. ProductCard is reused. App.jsx wiring happens last.

**Tech Stack:** React 19 + Vite + Tailwind v4 CSS-first + React Router v7 + react-helmet-async. Vitest + @testing-library/react (jsdom, globals: true, pool: forks). Test command: `npm run test:run`. Starting test count: 92.

---

## File Map

| Action | File |
|--------|------|
| Create | `src/data/collections.js` |
| Create | `src/data/__tests__/collections.test.js` |
| Create | `src/pages/CollectionsPage.jsx` |
| Create | `src/pages/__tests__/CollectionsPage.test.jsx` |
| Create | `src/pages/CollectionItemPage.jsx` |
| Create | `src/pages/__tests__/CollectionItemPage.test.jsx` |
| Create | `src/pages/DeliveryPage.jsx` |
| Create | `src/pages/__tests__/DeliveryPage.test.jsx` |
| Create | `src/pages/ReturnPage.jsx` |
| Create | `src/pages/__tests__/ReturnPage.test.jsx` |
| Modify | `src/App.jsx` |

---

### Task 1: Data layer — collections.js

**Files:**
- Create: `src/data/collections.js`
- Create: `src/data/__tests__/collections.test.js`

- [ ] **Step 1: Write the failing tests**

Create `src/data/__tests__/collections.test.js`:

```js
import { COLLECTIONS, getCollectionBySlug } from '../collections'

describe('collections data', () => {
  it('exports 3 collections', () => {
    expect(COLLECTIONS).toHaveLength(3)
  })

  it('getCollectionBySlug returns correct collection', () => {
    const c = getCollectionBySlug('minimalizm')
    expect(c).toBeDefined()
    expect(c.title).toBe('Минимализм')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:run -- src/data/__tests__/collections.test.js`

Expected: FAIL — module not found

- [ ] **Step 3: Create collections.js**

Create `src/data/collections.js`:

```js
export const COLLECTIONS = [
  {
    id: 1,
    slug: 'skandinavsky',
    title: 'Скандинавский интерьер',
    description:
      'Светлые тона, натуральные материалы, функциональность без лишнего. Диваны, люстры и смесители подобраны как единая история.',
    productIds: [1, 5, 6, 8, 12, 16, 18],
  },
  {
    id: 2,
    slug: 'minimalizm',
    title: 'Минимализм',
    description:
      'Только нужное. Чистые формы, нейтральная палитра, материалы с характером.',
    productIds: [3, 4, 7, 9, 13, 15],
  },
  {
    id: 3,
    slug: 'japandi',
    title: 'Japandi',
    description:
      'Японская сдержанность и скандинавский уют. Дерево, лён, матовые поверхности.',
    productIds: [2, 6, 10, 11, 17, 19],
  },
]

export function getCollectionBySlug(slug) {
  return COLLECTIONS.find((c) => c.slug === slug)
}
```

**Product IDs reference (verified against `src/data/products.js`):**
- 1 Диван Forma (furniture), 5 Кровать Nord (furniture), 6 Стол Slab (furniture)
- 8 Трековый Axis (lighting), 12 Настольная Fold (lighting)
- 16 Раковина Slim (plumbing), 18 Ванна Rect (plumbing)
- 3 Диван Plano (furniture), 4 Кровать Linea (furniture), 7 Стол Rondo (furniture)
- 9 Встраиваемый Dot (lighting), 13 Бра Arc (lighting)
- 15 Термостат Alto (plumbing)
- 2 Диван Arco (furniture)
- 10 Световая рейка Beam (lighting), 11 Подвесной Halo (lighting)
- 17 Раковина Bowl (plumbing), 19 Ванна Oval (plumbing)

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- src/data/__tests__/collections.test.js`

Expected: PASS — 2/2

- [ ] **Step 5: Run full suite to check for regressions**

Run: `npm run test:run`

Expected: 94/94 PASS (92 + 2 new)

- [ ] **Step 6: Commit**

```bash
git add src/data/collections.js src/data/__tests__/collections.test.js
git commit -m "feat: add collections data — 3 curated cross-category sets"
```

---

### Task 2: CollectionsPage — listing grid

**Files:**
- Create: `src/pages/CollectionsPage.jsx`
- Create: `src/pages/__tests__/CollectionsPage.test.jsx`

- [ ] **Step 1: Write the failing tests**

Create `src/pages/__tests__/CollectionsPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import CollectionsPage from '../CollectionsPage'

const Wrapper = ({ children }) => (
  <HelmetProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </HelmetProvider>
)

describe('CollectionsPage', () => {
  it('renders heading «Коллекции»', () => {
    render(<CollectionsPage />, { wrapper: Wrapper })
    expect(screen.getByText('Коллекции')).toBeInTheDocument()
  })

  it('renders links to all three collections', () => {
    render(<CollectionsPage />, { wrapper: Wrapper })
    const links = screen.getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('/collections/skandinavsky')
    expect(hrefs).toContain('/collections/minimalizm')
    expect(hrefs).toContain('/collections/japandi')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:run -- src/pages/__tests__/CollectionsPage.test.jsx`

Expected: FAIL — module not found

- [ ] **Step 3: Create CollectionsPage.jsx**

Create `src/pages/CollectionsPage.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { COLLECTIONS } from '../data/collections'

export default function CollectionsPage() {
  return (
    <>
      <Helmet>
        <title>Коллекции — Pufflux</title>
        <meta
          name="description"
          content="Кураторские подборки мебели, освещения и сантехники — единые стили для вашего интерьера."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-16">Коллекции</h1>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {COLLECTIONS.map((c) => (
              <Reveal key={c.id}>
                <Link
                  to={`/collections/${c.slug}`}
                  className="glass-card overflow-hidden block group"
                >
                  <div className="aspect-[4/3] bg-white/40" />
                  <div className="p-4">
                    <p className="text-[13px] font-normal text-ink mb-1">{c.title}</p>
                    <p className="text-sm text-ink-3 line-clamp-2 mb-2">{c.description}</p>
                    <p className="text-xs text-ink-4">{c.productIds.length} товаров</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- src/pages/__tests__/CollectionsPage.test.jsx`

Expected: PASS — 2/2

- [ ] **Step 5: Run full suite**

Run: `npm run test:run`

Expected: 96/96 PASS (94 + 2 new)

- [ ] **Step 6: Commit**

```bash
git add src/pages/CollectionsPage.jsx src/pages/__tests__/CollectionsPage.test.jsx
git commit -m "feat: add CollectionsPage — 3-column glass-card listing"
```

---

### Task 3: CollectionItemPage — detail with products grouped by category

**Files:**
- Create: `src/pages/CollectionItemPage.jsx`
- Create: `src/pages/__tests__/CollectionItemPage.test.jsx`

- [ ] **Step 1: Write the failing tests**

Create `src/pages/__tests__/CollectionItemPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { CartProvider } from '../../context/CartContext'
import { WishlistProvider } from '../../context/WishlistContext'
import CollectionItemPage from '../CollectionItemPage'

function renderCollection(slug) {
  return render(
    <HelmetProvider>
      <CartProvider>
        <WishlistProvider>
          <MemoryRouter initialEntries={[`/collections/${slug}`]}>
            <Routes>
              <Route path="/collections/:slug" element={<CollectionItemPage />} />
            </Routes>
          </MemoryRouter>
        </WishlistProvider>
      </CartProvider>
    </HelmetProvider>
  )
}

describe('CollectionItemPage', () => {
  it('renders collection title for known slug', () => {
    renderCollection('skandinavsky')
    expect(screen.getByText('Скандинавский интерьер')).toBeInTheDocument()
  })

  it('renders «Коллекция не найдена» for unknown slug', () => {
    renderCollection('unknown-slug')
    expect(screen.getByText('Коллекция не найдена')).toBeInTheDocument()
  })

  it('renders at least one category heading', () => {
    renderCollection('skandinavsky')
    // skandinavsky has furniture(1,5,6), lighting(8,12), plumbing(16,18)
    // expect at least Мебель to appear
    expect(screen.getByText('Мебель')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:run -- src/pages/__tests__/CollectionItemPage.test.jsx`

Expected: FAIL — module not found

- [ ] **Step 3: Create CollectionItemPage.jsx**

Create `src/pages/CollectionItemPage.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import ProductCard from '../components/ui/ProductCard'
import { getCollectionBySlug } from '../data/collections'
import { getProductById, CATEGORY_LABELS } from '../data/products'

const CATEGORY_ORDER = ['furniture', 'lighting', 'plumbing']

export default function CollectionItemPage() {
  const { slug } = useParams()
  const collection = getCollectionBySlug(slug)

  if (!collection) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-ink-3 mb-4">Коллекция не найдена</p>
          <Link
            to="/collections"
            className="text-sm text-ink border-b border-ink/30 pb-0.5"
          >
            Вернуться к коллекциям
          </Link>
        </div>
      </div>
    )
  }

  const products = collection.productIds
    .map((id) => getProductById(id))
    .filter(Boolean)

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = products.filter((p) => p.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})

  return (
    <>
      <Helmet>
        <title>{collection.title} — Pufflux</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <nav className="flex items-center gap-2 text-xs text-ink-4 mb-8">
              <Link to="/collections" className="hover:text-ink transition-colors">
                Коллекции
              </Link>
              <span>/</span>
              <span className="text-ink-3">{collection.title}</span>
            </nav>
          </Reveal>

          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-4">{collection.title}</h1>
            <p className="text-sm text-ink-3 mb-16">{collection.description}</p>
          </Reveal>

          {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((cat) => (
            <Reveal key={cat}>
              <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-ink-4 mb-6">
                  {CATEGORY_LABELS[cat]}
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {grouped[cat].map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- src/pages/__tests__/CollectionItemPage.test.jsx`

Expected: PASS — 3/3

- [ ] **Step 5: Run full suite**

Run: `npm run test:run`

Expected: 99/99 PASS (96 + 3 new)

- [ ] **Step 6: Commit**

```bash
git add src/pages/CollectionItemPage.jsx src/pages/__tests__/CollectionItemPage.test.jsx
git commit -m "feat: add CollectionItemPage — products grouped by category"
```

---

### Task 4: DeliveryPage — informational

**Files:**
- Create: `src/pages/DeliveryPage.jsx`
- Create: `src/pages/__tests__/DeliveryPage.test.jsx`

- [ ] **Step 1: Write the failing tests**

Create `src/pages/__tests__/DeliveryPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import DeliveryPage from '../DeliveryPage'

const Wrapper = ({ children }) => (
  <HelmetProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </HelmetProvider>
)

describe('DeliveryPage', () => {
  it('renders heading «Доставка и сборка»', () => {
    render(<DeliveryPage />, { wrapper: Wrapper })
    expect(screen.getByText('Доставка и сборка')).toBeInTheDocument()
  })

  it('CTA link points to /showroom', () => {
    render(<DeliveryPage />, { wrapper: Wrapper })
    const link = screen.getByRole('link', { name: /записаться в шоурум/i })
    expect(link).toHaveAttribute('href', '/showroom')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:run -- src/pages/__tests__/DeliveryPage.test.jsx`

Expected: FAIL — module not found

- [ ] **Step 3: Create DeliveryPage.jsx**

Create `src/pages/DeliveryPage.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const BLOCKS = [
  {
    title: 'Доставка',
    text: 'Курьером до двери по Санкт-Петербургу и Ленинградской области. Сроки уточняются при подтверждении заказа — зависят от наличия товара у поставщика.',
  },
  {
    title: 'Сборка',
    text: 'Профессиональная сборка — отдельная услуга, добавляется при оформлении заказа. Стоимость зависит от состава и сложности заказа.',
  },
  {
    title: 'Образцы материалов',
    text: 'Ткани, отделки и фурнитуру можно посмотреть и потрогать в шоуруме у нашего партнёра. Образцы не высылаем — только на месте.',
  },
]

export default function DeliveryPage() {
  return (
    <>
      <Helmet>
        <title>Доставка и сборка — Pufflux</title>
        <meta
          name="description"
          content="Доставка мебели, освещения и сантехники курьером по СПб. Профессиональная сборка — отдельная услуга."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-16">Доставка и сборка</h1>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {BLOCKS.map((block) => (
              <Reveal key={block.title}>
                <div className="glass-card p-6">
                  <h2 className="text-base font-light text-ink mb-3">{block.title}</h2>
                  <p className="text-sm text-ink-3 leading-relaxed">{block.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center">
              <Link
                to="/showroom"
                className="text-sm text-ink border-b border-ink/30 hover:border-ink transition-colors"
              >
                Записаться в шоурум
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- src/pages/__tests__/DeliveryPage.test.jsx`

Expected: PASS — 2/2

- [ ] **Step 5: Run full suite**

Run: `npm run test:run`

Expected: 101/101 PASS (99 + 2 new)

- [ ] **Step 6: Commit**

```bash
git add src/pages/DeliveryPage.jsx src/pages/__tests__/DeliveryPage.test.jsx
git commit -m "feat: add DeliveryPage — delivery and assembly info"
```

---

### Task 5: ReturnPage + App.jsx wiring

**Files:**
- Create: `src/pages/ReturnPage.jsx`
- Create: `src/pages/__tests__/ReturnPage.test.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write the failing tests**

Create `src/pages/__tests__/ReturnPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ReturnPage from '../ReturnPage'

const Wrapper = ({ children }) => (
  <HelmetProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </HelmetProvider>
)

describe('ReturnPage', () => {
  it('renders heading «Возврат и обмен»', () => {
    render(<ReturnPage />, { wrapper: Wrapper })
    expect(screen.getByText('Возврат и обмен')).toBeInTheDocument()
  })

  it('CTA link points to /brief', () => {
    render(<ReturnPage />, { wrapper: Wrapper })
    const link = screen.getByRole('link', { name: /связаться с нами/i })
    expect(link).toHaveAttribute('href', '/brief')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test:run -- src/pages/__tests__/ReturnPage.test.jsx`

Expected: FAIL — module not found

- [ ] **Step 3: Create ReturnPage.jsx**

Create `src/pages/ReturnPage.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const BLOCKS = [
  {
    title: 'Стандартный возврат',
    text: '14 дней с момента получения согласно Федеральному закону «О защите прав потребителей». Товар в оригинальной упаковке, без следов использования.',
  },
  {
    title: 'Крупногабаритные товары',
    text: 'Диваны, кровати, шкафы — условия возврата уточняются индивидуально. Пожалуйста, свяжитесь с нами до инициирования возврата.',
  },
]

export default function ReturnPage() {
  return (
    <>
      <Helmet>
        <title>Возврат и обмен — Pufflux</title>
        <meta
          name="description"
          content="Условия возврата и обмена товаров. 14 дней по закону. Крупногабарит — индивидуально."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-16">Возврат и обмен</h1>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {BLOCKS.map((block) => (
              <Reveal key={block.title}>
                <div className="glass-card p-6">
                  <h2 className="text-base font-light text-ink mb-3">{block.title}</h2>
                  <p className="text-sm text-ink-3 leading-relaxed">{block.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center">
              <Link
                to="/brief"
                className="text-sm text-ink border-b border-ink/30 hover:border-ink transition-colors"
              >
                Связаться с нами
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test:run -- src/pages/__tests__/ReturnPage.test.jsx`

Expected: PASS — 2/2

- [ ] **Step 5: Wire all four pages in App.jsx**

In `src/App.jsx`, add four imports at the top (after existing imports):

```jsx
import CollectionsPage from './pages/CollectionsPage'
import CollectionItemPage from './pages/CollectionItemPage'
import DeliveryPage from './pages/DeliveryPage'
import ReturnPage from './pages/ReturnPage'
```

Replace the four PlaceholderPage routes:

```jsx
// Replace:
<Route path="/collections" element={<PlaceholderPage title="Коллекции" />} />
<Route path="/collections/:slug" element={<PlaceholderPage title="Коллекция" />} />
// ...
<Route path="/delivery" element={<PlaceholderPage title="Доставка" />} />
<Route path="/return" element={<PlaceholderPage title="Возврат" />} />

// With:
<Route path="/collections" element={<CollectionsPage />} />
<Route path="/collections/:slug" element={<CollectionItemPage />} />
// ...
<Route path="/delivery" element={<DeliveryPage />} />
<Route path="/return" element={<ReturnPage />} />
```

The `PlaceholderPage` component and its remaining usage (`/search`, `*`) stay untouched.

- [ ] **Step 6: Run full suite**

Run: `npm run test:run`

Expected: 103/103 PASS (101 + 2 new)

- [ ] **Step 7: Commit**

```bash
git add src/pages/ReturnPage.jsx src/pages/__tests__/ReturnPage.test.jsx src/App.jsx
git commit -m "feat: add ReturnPage and wire all Plan 6 routes in App.jsx"
```

---

## Self-Review

**Spec coverage:**

| Spec requirement | Task |
|---|---|
| `src/data/collections.js` with 3 collections + `getCollectionBySlug` | Task 1 |
| CollectionsPage — 3-col grid, glass-card, heading «Коллекции» | Task 2 |
| CollectionItemPage — `useParams`, grouped by category, 404 case | Task 3 |
| DeliveryPage — 3 blocks, CTA → /showroom | Task 4 |
| ReturnPage — 2 blocks, CTA → /brief | Task 5 |
| App.jsx wiring — 4 PlaceholderPage routes replaced | Task 5 |
| 11 tests total (92 → 103) | Tasks 1–5 |

**Placeholder scan:** No TBD, no "implement later". All code blocks are complete.

**Type consistency:**
- `getCollectionBySlug(slug)` defined in Task 1, used in Task 3 ✅
- `getProductById(id)` and `CATEGORY_LABELS` imported from `products.js` (existing exports) ✅
- `COLLECTIONS` exported from `collections.js`, imported in Tasks 2 and 3 ✅
- `CATEGORY_ORDER` in CollectionItemPage matches keys in `CATEGORY_LABELS` ✅
- `ProductCard` component in Task 3 needs `CartProvider` + `WishlistProvider` in tests — covered ✅
