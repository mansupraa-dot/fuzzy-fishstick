import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { COLLECTIONS } from '../data/collections'

export default function CollectionsPage() {
  return (
    <>
      <Helmet>
        <title>Коллекции — Archittell</title>
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
