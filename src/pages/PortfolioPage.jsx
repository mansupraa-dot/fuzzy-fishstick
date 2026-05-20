import { Helmet } from 'react-helmet-async'
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

export default function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Портфолио — Pufflux</title>
        <meta
          name="description"
          content="Проекты подбора мебели, освещения и сантехники для квартир в Санкт-Петербурге."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-10">Портфолио</h1>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 60}>
                <Link to={`/portfolio/${p.slug}`} className="group block">
                  <div className="glass-card overflow-hidden">
                    <div className="aspect-[4/3] bg-white/40 flex items-center justify-center text-ink-5 text-xs tracking-widest group-hover:scale-105 transition-transform duration-500">
                      Фото
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-[13px] font-normal text-ink leading-snug">
                          {p.title}
                        </h3>
                        <span
                          className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full ${STATUS_STYLES[p.status]}`}
                        >
                          {STATUS_LABELS[p.status]}
                        </span>
                      </div>
                      <p className="text-xs text-ink-4">
                        {p.area} · {p.tags.join(', ')} · {p.year}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="glass-card p-8 text-center">
              <h2 className="text-xl font-light text-ink mb-3">Хотите такой результат?</h2>
              <p className="text-sm text-ink-3 mb-6">Расскажите о вашем проекте.</p>
              <Link
                to="/brief"
                className="inline-block bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
              >
                Обсудить проект
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
