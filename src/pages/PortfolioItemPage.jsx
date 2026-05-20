import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { getProjectBySlug } from '../data/portfolio'

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

export default function PortfolioItemPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-ink-3 mb-4">Проект не найден</p>
          <Link to="/portfolio" className="text-sm text-ink border-b border-ink/30 pb-0.5">
            Вернуться в портфолио
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{project.title} — Pufflux</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <nav className="flex items-center gap-2 text-xs text-ink-4 mb-8">
              <Link to="/portfolio" className="hover:text-ink transition-colors">
                Портфолио
              </Link>
              <span>/</span>
              <span className="text-ink-3">{project.title}</span>
            </nav>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <h1 className="text-2xl font-light text-ink">{project.title}</h1>
              <span
                className={`text-[10px] px-2.5 py-1 rounded-full ${STATUS_STYLES[project.status]}`}
              >
                {STATUS_LABELS[project.status]}
              </span>
            </div>
            <p className="text-sm text-ink-4 mb-8">
              {project.area} · {project.tags.join(', ')} · {project.year}
            </p>
          </Reveal>

          <Reveal>
            <div className="glass-card aspect-video flex items-center justify-center text-ink-5 text-xs tracking-widest mb-10">
              Фото проекта
            </div>
          </Reveal>

          <Reveal>
            <p className="text-sm text-ink-3 leading-relaxed mb-8">{project.description}</p>
            <p className="text-[10px] uppercase tracking-widest text-ink-4 mb-4">Что сделали</p>
            <ul className="flex flex-col gap-3 mb-16">
              {project.details.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-3">
                  <span className="text-ink-4 shrink-0 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="glass-card p-8 text-center">
              <h2 className="text-xl font-light text-ink mb-3">Хотите такой результат?</h2>
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
