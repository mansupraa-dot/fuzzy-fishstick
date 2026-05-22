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
          {/* Filters + sort row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            {/* Subcategory filters — only when subs exist */}
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

            {/* Sort — always visible when products exist */}
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
    </>
  )
}
