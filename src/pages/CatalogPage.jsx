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
