import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const SLIDES = [
  {
    id: 0,
    heading: 'Мебель для жизни',
    sub: 'Подобранная под пропорции вашего пространства',
    bg: '[Фото: просторная гостиная с диваном, стеллажом и обеденной зоной. Нейтральные тона, дневной свет]',
    cats: [
      { label: 'Диваны', count: '3 модели', to: '/catalog/furniture?sub=sofas' },
      { label: 'Кровати', count: '2 модели', to: '/catalog/furniture?sub=beds' },
      { label: 'Столы', count: '2 модели', to: '/catalog/furniture?sub=tables' },
    ],
  },
  {
    id: 1,
    heading: 'Архитектура света',
    sub: 'Техническое и декоративное освещение как единая система',
    bg: '[Фото: гостиная с многоуровневым освещением — трековые светильники, подвесная люстра, бра у дивана]',
    cats: [
      { label: 'Техническое', count: '3 модели', to: '/catalog/lighting?sub=technical' },
      { label: 'Декоративное', count: '3 модели', to: '/catalog/lighting?sub=decorative' },
      { label: 'Весь каталог', count: 'Смотреть все', to: '/catalog/lighting' },
    ],
  },
  {
    id: 2,
    heading: 'Точность деталей',
    sub: 'Сантехника без переплат за лейбл',
    bg: '[Фото: ванная комната с отдельностоящей ванной, матовой сантехникой и скрытым освещением в нише]',
    cats: [
      { label: 'Смесители', count: '2 модели', to: '/catalog/plumbing?sub=faucets' },
      { label: 'Раковины', count: '2 модели', to: '/catalog/plumbing?sub=sinks' },
      { label: 'Ванны', count: '2 модели', to: '/catalog/plumbing?sub=bathtubs' },
    ],
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), [])
  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* BG image placeholder */}
          <div className="absolute inset-0 bg-stone-800">
            <div className="w-full h-full bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 flex items-center justify-center">
              <span className="text-stone-600 text-xs text-center px-8 max-w-lg leading-relaxed">
                {slide.bg}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end">
            {/* Text */}
            <div className="max-w-6xl mx-auto px-6 w-full pb-44 md:pb-48">
              <h1
                className={`text-4xl md:text-6xl font-light text-white tracking-tight leading-[1.1] max-w-2xl transition-all duration-700 ${
                  i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: i === current ? '150ms' : '0ms' }}
              >
                {slide.heading}
              </h1>
              <p
                className={`mt-4 text-white/65 text-base md:text-lg max-w-md transition-all duration-700 ${
                  i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: i === current ? '300ms' : '0ms' }}
              >
                {slide.sub}
              </p>
            </div>

            {/* Category cards bar */}
            <div className="bg-black/60 backdrop-blur-sm border-t border-white/10">
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-3">
                  {slide.cats.map((cat, ci) => (
                    <Link
                      key={cat.label}
                      to={cat.to}
                      className={`group flex flex-col justify-center py-5 px-4 md:px-6 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-colors ${
                        ci === 0 ? '' : ''
                      }`}
                    >
                      <span className="text-white text-sm md:text-base font-medium mb-0.5 group-hover:text-accent transition-colors">
                        {cat.label}
                      </span>
                      <span className="text-white/40 text-xs">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors"
        aria-label="Предыдущий слайд"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors"
        aria-label="Следующий слайд"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-[calc(3.5rem+1px)] left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/35 hover:bg-white/60'
            }`}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
