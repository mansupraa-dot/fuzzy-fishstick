import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { PROJECTS } from '../data/portfolio'

const STATUS_LABELS = {
  completed: 'Реализован',
  in_progress: 'В реализации',
  concept: 'Концепт',
}

const STATUS_STYLES = {
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  in_progress: 'bg-amber-50 text-amber-700 border border-amber-200',
  concept: 'bg-black/5 text-ink-3 border border-black/10',
}

export default function Portfolio() {
  const preview = PROJECTS.slice(0, 3)

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="text-2xl font-light text-ink mb-16">Портфолио</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {preview.map((p) => (
            <Reveal key={p.id}>
              <Link to={`/portfolio/${p.slug}`} className="glass-card overflow-hidden block group">
                <div className="aspect-[4/3] bg-white/40" />
                <div className="p-4">
                  <p className="text-[13px] font-normal text-ink mb-2">
                    {p.title}
                  </p>
                  <span
                    className={`inline-block text-[11px] px-2 py-0.5 rounded-full ${STATUS_STYLES[p.status]}`}
                  >
                    {STATUS_LABELS[p.status]}
                  </span>
                  <p className="text-xs text-ink-4 mt-2">
                    {p.area} · {p.tags.join(', ')}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link
            to="/portfolio"
            className="text-sm text-ink border-b border-ink/30 hover:border-ink transition-colors"
          >
            Смотреть все проекты
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
