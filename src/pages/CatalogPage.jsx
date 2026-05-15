import { useParams, useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { CATEGORY_LABELS, SUBCATEGORIES, getProductsByCategory } from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'

export default function CatalogPage() {
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSub = searchParams.get('sub') || 'all'

  const label = CATEGORY_LABELS[category] ?? category
  const subs = SUBCATEGORIES[category] ?? []
  const products = getProductsByCategory(category, activeSub === 'all' ? null : activeSub)

  function setSub(id) {
    if (id === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ sub: id })
    }
  }

  if (!CATEGORY_LABELS[category]) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <p className="text-stone-400">Каталог не найден</p>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{label} — каталог Pufflux</title>
        <meta
          name="description"
          content={`Каталог ${label.toLowerCase()} в Pufflux. Архитектурный подбор для квартир в Санкт-Петербурге.`}
        />
      </Helmet>

      <div className="pt-16">
        {/* Page header */}
        <div className="bg-graphite text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <nav className="text-xs text-white/40 mb-6 flex gap-2 items-center">
                <Link to="/" className="hover:text-white/70 transition-colors">Главная</Link>
                <span>/</span>
                <span className="text-white/60">{label}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-light">{label}</h1>
              <p className="text-white/50 mt-2 text-sm">{products.length} товаров</p>
            </Reveal>
          </div>
        </div>

        <div className="bg-white min-h-screen">
          <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
            {/* Subcategory filters */}
            {subs.length > 0 && (
              <Reveal>
                <div className="flex flex-wrap gap-2 mb-10">
                  <button
                    onClick={() => setSub('all')}
                    className={`text-sm px-5 py-2 border transition-colors ${
                      activeSub === 'all'
                        ? 'border-graphite bg-graphite text-white'
                        : 'border-stone-200 text-stone-500 hover:border-graphite hover:text-graphite'
                    }`}
                  >
                    Все
                  </button>
                  {subs.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSub(sub.id)}
                      className={`text-sm px-5 py-2 border transition-colors ${
                        activeSub === sub.id
                          ? 'border-graphite bg-graphite text-white'
                          : 'border-stone-200 text-stone-500 hover:border-graphite hover:text-graphite'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Products grid */}
            {products.length === 0 ? (
              <div className="text-center py-24 text-stone-400">
                <p>Товары в этой категории появятся скоро.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {products.map((product, i) => (
                  <Reveal key={product.id} delay={(i % 3) * 60}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
