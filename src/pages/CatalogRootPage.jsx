import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { CATEGORY_LABELS } from '../data/products'

const CATEGORY_DESCRIPTIONS = {
  furniture: 'Диваны, кровати, обеденные столы',
  lighting: 'Подвесные, трековые, встраиваемые',
  plumbing: 'Смесители, раковины, ванны',
}

const CATEGORIES = Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
  id,
  label,
  description: CATEGORY_DESCRIPTIONS[id] ?? '',
}))

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
