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
