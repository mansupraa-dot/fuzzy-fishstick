# Plan 6: Collections + Delivery + Return — Design Spec

**Date:** 2026-05-22
**Scope:** Three new features — Collections (listing + detail), Delivery page, Return page. Close all remaining PlaceholderPages except /search.

---

## Context

Project: premium e-commerce site (furniture + lighting + plumbing), Russian market, single founder. Visual system: Light Spatial Glass — `#EFEFEF` background, `rgba(255,255,255,0.72)` glass cards, `text-ink` / `text-ink-2..5` tokens.

After Plan 5, all pages and the homepage use Light Glass. Four PlaceholderPages remain in `App.jsx`:
- `/collections` + `/collections/:slug` — now being built
- `/delivery` — now being built
- `/return` — now being built
- `/search` — deferred (needs real data/backend)

Existing data: `src/data/products.js` (19 SKU, categories: `furniture` / `lighting` / `plumbing`, `CATEGORY_LABELS`). Pattern to follow: `src/data/portfolio.js` → `getProjectBySlug()`.

---

## Data Layer: `src/data/collections.js`

Collections reference product IDs from `products.js`. No data duplication. Lookup at render time.

```js
export const COLLECTIONS = [
  {
    id: 1,
    slug: 'skandinavsky',
    title: 'Скандинавский интерьер',
    description:
      'Светлые тона, натуральные материалы, функциональность без лишнего. Диваны, люстры и смесители подобраны как единая история.',
    productIds: [1, 3, 5, 8, 11, 14, 17],
  },
  {
    id: 2,
    slug: 'minimalizm',
    title: 'Минимализм',
    description:
      'Только нужное. Чистые формы, нейтральная палитра, материалы с характером.',
    productIds: [2, 6, 9, 13, 16],
  },
  {
    id: 3,
    slug: 'japandi',
    title: 'Japandi',
    description:
      'Японская сдержанность и скандинавский уют. Дерево, лён, матовые поверхности.',
    productIds: [4, 7, 10, 15, 18],
  },
]

export function getCollectionBySlug(slug) {
  return COLLECTIONS.find((c) => c.slug === slug)
}
```

**Note on product IDs:** IDs are illustrative — implementer must verify they exist in `products.js` (19 SKU, IDs not guaranteed contiguous). Adjust to valid IDs; aim for cross-category coverage per collection (furniture + lighting + plumbing).

---

## `/collections` — CollectionsPage

**File:** `src/pages/CollectionsPage.jsx`

Layout mirrors `PortfolioPage`:

```
section py-20
  div max-w-6xl mx-auto px-6
    h1 «Коллекции»               text-2xl font-light text-ink mb-16
    div grid md:grid-cols-3 gap-6
      [CollectionCard × 3]
```

Each card: `<Link to={/collections/${c.slug}}>` wrapping a `glass-card overflow-hidden block group`:
- `aspect-[4/3] bg-white/40` — image placeholder
- `p-4`:
  - Title: `text-[13px] font-normal text-ink mb-1`
  - Description: `text-sm text-ink-3 line-clamp-2 mb-2`
  - Count: `text-xs text-ink-4` — `{c.productIds.length} товаров`

**Helmet:** `<title>Коллекции — Pufflux</title>`

---

## `/collections/:slug` — CollectionItemPage

**File:** `src/pages/CollectionItemPage.jsx`

Uses `useParams()` → `getCollectionBySlug(slug)`. If not found: renders «Коллекция не найдена» (same pattern as `PortfolioItemPage`).

Layout:

```
section py-20
  div max-w-6xl mx-auto px-6
    h1 {collection.title}       text-2xl font-light text-ink mb-4
    p  {collection.description} text-sm text-ink-3 mb-16

    [CategoryGroup × N]         only if ≥1 product in that category
```

**CategoryGroup** (per category that has products in this collection):

```
p «Мебель» / «Освещение» / «Сантехника»   text-xs uppercase tracking-widest text-ink-4 mb-6
div grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12
  [ProductCard × N]
```

Logic:
1. Get products: `collection.productIds.map(id => getProductById(id)).filter(Boolean)`
2. Group by `product.category`
3. Render groups in order: `furniture` → `lighting` → `plumbing`
4. Skip group if empty

Uses existing `ProductCard` component and `getProductById` from `products.js`. Uses `CATEGORY_LABELS` from `products.js` for group headings.

**Helmet:** `<title>{collection.title} — Pufflux</title>` (or «Коллекция не найдена» for 404 case)

---

## `/delivery` — DeliveryPage

**File:** `src/pages/DeliveryPage.jsx`

Three `glass-card` info blocks + CTA. Pattern: same structure as `ProcessPage` (three items, vertical list on mobile, readable on desktop).

**Heading:** `text-2xl font-light text-ink` — «Доставка и сборка»

**Blocks:**

| # | Заголовок | Текст |
|---|---|---|
| 1 | Доставка | Курьером до двери по Санкт-Петербургу и Ленинградской области. Сроки уточняются при подтверждении заказа — зависят от наличия товара у поставщика. |
| 2 | Сборка | Профессиональная сборка — отдельная услуга, добавляется при оформлении заказа. Стоимость зависит от состава и сложности заказа. |
| 3 | Образцы материалов | Ткани, отделки и фурнитуру можно посмотреть и потрогать в шоуруме у нашего партнёра. Образцы не высылаем — только на месте. |

**Layout:** `div grid md:grid-cols-3 gap-6` — три карточки `glass-card p-6`:
- Block title: `text-base font-light text-ink mb-3`
- Block text: `text-sm text-ink-3 leading-relaxed`

**CTA** (снизу, центр): `<Link to="/showroom">` — «Записаться в шоурум», styled `text-sm text-ink border-b border-ink/30 hover:border-ink transition-colors`

**Helmet:** `<title>Доставка и сборка — Pufflux</title>`

---

## `/return` — ReturnPage

**File:** `src/pages/ReturnPage.jsx`

Two `glass-card` blocks + CTA.

**Heading:** `text-2xl font-light text-ink` — «Возврат и обмен»

**Blocks:**

| # | Заголовок | Текст |
|---|---|---|
| 1 | Стандартный возврат | 14 дней с момента получения согласно Федеральному закону «О защите прав потребителей». Товар в оригинальной упаковке, без следов использования. |
| 2 | Крупногабаритные товары | Диваны, кровати, шкафы — условия возврата уточняются индивидуально. Пожалуйста, свяжитесь с нами до инициирования возврата. |

**Layout:** `div grid md:grid-cols-2 gap-6` — две карточки `glass-card p-6` (2 колонки на десктопе, стек на мобиле):
- Block title: `text-base font-light text-ink mb-3`
- Block text: `text-sm text-ink-3 leading-relaxed`

**CTA** (снизу, центр): `<Link to="/brief">` — «Связаться с нами», styled `text-sm text-ink border-b border-ink/30 hover:border-ink transition-colors`

**Helmet:** `<title>Возврат и обмен — Pufflux</title>`

---

## App.jsx Changes

Replace four `PlaceholderPage` entries:

```jsx
// Add imports:
import CollectionsPage from './pages/CollectionsPage'
import CollectionItemPage from './pages/CollectionItemPage'
import DeliveryPage from './pages/DeliveryPage'
import ReturnPage from './pages/ReturnPage'

// Replace routes:
<Route path="/collections" element={<CollectionsPage />} />
<Route path="/collections/:slug" element={<CollectionItemPage />} />
<Route path="/delivery" element={<DeliveryPage />} />
<Route path="/return" element={<ReturnPage />} />
```

---

## File Map

| Action | File |
|---|---|
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

## Tests

11 tests total (92 existing → 103 after Plan 6):

**collections.test.js** (2 tests):
- `COLLECTIONS` has 3 items
- `getCollectionBySlug('minimalizm')` returns correct collection

**CollectionsPage.test.jsx** (2 tests):
- Heading «Коллекции» renders
- Links to `/collections/skandinavsky`, `/collections/minimalizm`, `/collections/japandi` present

**CollectionItemPage.test.jsx** (3 tests):
- Renders title of known slug (`skandinavsky`)
- Renders «Коллекция не найдена» for unknown slug
- Renders at least one category heading («Мебель» or «Освещение» or «Сантехника»)

**DeliveryPage.test.jsx** (2 tests):
- Heading «Доставка и сборка» renders
- Link to `/showroom` present

**ReturnPage.test.jsx** (2 tests):
- Heading «Возврат и обмен» renders
- Link to `/brief` present

**App.jsx** — no new tests needed (route wiring tested via page-level tests)

---

## Out of Scope

- `/search` — deferred (needs backend/real search)
- Megamenu — Wave 3, separate plan
- Real product images (collections use `bg-white/40` placeholder)
- Filtering within a collection
- Adding/editing collections through UI (CMS is Phase 2)
