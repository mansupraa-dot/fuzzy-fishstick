import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Hero from '../sections/Hero'
import HowWeWork from '../sections/HowWeWork'
import Portfolio from '../sections/Portfolio'
import CTA from '../sections/CTA'

const CATEGORIES = [
  {
    label: 'Мебель',
    description: 'Диваны, кресла, столы, стеллажи от европейских производителей.',
    href: '/catalog/furniture',
  },
  {
    label: 'Освещение',
    description: 'Люстры, бра, трековые системы — свет как элемент интерьера.',
    href: '/catalog/lighting',
  },
  {
    label: 'Сантехника',
    description: 'Раковины, смесители, душевые системы премиум-класса.',
    href: '/catalog/plumbing',
  },
]

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Pufflux — подбор мебели, освещения и сантехники в Санкт-Петербурге</title>
        <meta
          name="description"
          content="Архитектурный подбор мебели, света и сантехники для вашей квартиры в СПб. Каталог с фильтрацией. Без переплат за бренд."
        />
        <link rel="canonical" href="https://pufflux.ru/" />
      </Helmet>

      <Hero />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-light text-ink mb-10">Каталог</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                to={cat.href}
                className="glass-card overflow-hidden block group"
              >
                <div className="aspect-[4/3] bg-white/40" />
                <div className="p-5">
                  <p className="text-base font-light text-ink mb-1">
                    {cat.label}
                  </p>
                  <p className="text-sm text-ink-3 mb-3">{cat.description}</p>
                  <span className="text-ink-4 group-hover:text-ink transition-colors text-sm">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowWeWork />
      <Portfolio />
      <CTA />
    </>
  )
}
