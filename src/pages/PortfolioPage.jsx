import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const PROJECTS = [
  {
    id: 1,
    title: 'Студия на Петроградской',
    area: '38 м²',
    tags: ['Мебель', 'Свет'],
    year: '2024',
    placeholder:
      '[Фото: светлая студия с открытой планировкой, деревянная мебель, точечное освещение]',
  },
  {
    id: 2,
    title: '2-комнатная на Васильевском',
    area: '62 м²',
    tags: ['Комплекс'],
    year: '2024',
    placeholder:
      '[Фото: гостиная с диваном, встроенным освещением. Единая цветовая гамма]',
  },
  {
    id: 3,
    title: 'Мастер-ванная в новостройке',
    area: '8 м²',
    tags: ['Сантехника', 'Свет'],
    year: '2024',
    placeholder:
      '[Фото: ванная с матовой сантехникой и подсветкой ниши]',
  },
  {
    id: 4,
    title: 'Спальня на Комендантском',
    area: '18 м²',
    tags: ['Мебель', 'Свет'],
    year: '2023',
    placeholder: '[Фото: минималистичная спальня, прикроватные светильники, шкаф-купе]',
  },
  {
    id: 5,
    title: 'Кухня в таунхаусе',
    area: '24 м²',
    tags: ['Мебель', 'Свет'],
    year: '2023',
    placeholder: '[Фото: кухня-гостиная с островом, скрытое освещение под шкафами]',
  },
  {
    id: 6,
    title: '3-комнатная на Московском',
    area: '88 м²',
    tags: ['Комплекс'],
    year: '2023',
    placeholder:
      '[Фото: гостиная с правильными пропорциями мебели, многоуровневый свет]',
  },
]

export default function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Портфолио — Pufflux | Подбор мебели и интерьера в СПб</title>
        <meta
          name="description"
          content="Проекты подбора мебели, освещения и сантехники для квартир в Санкт-Петербурге. Реальные результаты архитектурного подхода."
        />
      </Helmet>

      <div className="pt-16">
        <div className="bg-graphite text-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-widest text-accent mb-4">Наши работы</p>
              <h1 className="text-4xl md:text-6xl font-light leading-tight">
                Подобранные интерьеры<br />для квартир в Петербурге
              </h1>
            </Reveal>
          </div>
        </div>

        <div className="bg-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {PROJECTS.map(({ id, title, area, tags, year, placeholder }, i) => (
                <Reveal key={id} delay={(i % 3) * 80}>
                  <div className="group cursor-pointer">
                    <div className="aspect-[4/3] bg-stone-200 mb-4 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <span className="text-stone-400 text-xs text-center px-6 leading-relaxed">
                          {placeholder}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-graphite">{title}</h3>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {area} · {tags.join(', ')} · {year}
                        </p>
                      </div>
                      <span className="text-stone-300 text-sm group-hover:text-accent transition-colors mt-0.5">
                        →
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-cream py-20">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-light text-graphite mb-2">
                    Хотите такой результат?
                  </h2>
                  <p className="text-stone-500 text-sm">Расскажите о вашем проекте.</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-block bg-graphite text-white text-sm px-8 py-4 hover:bg-stone-700 transition-colors shrink-0"
                >
                  Обсудить проект
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
