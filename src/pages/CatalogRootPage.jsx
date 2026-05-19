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
