import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const PROJECTS = [
  {
    id: 1,
    title: 'Студия на Петроградской',
    area: '38 м²',
    tags: ['Мебель', 'Свет'],
    placeholder:
      '[Фото: светлая студия с открытой планировкой, деревянная мебель, точечное освещение, зонирование светом]',
  },
  {
    id: 2,
    title: '2-комнатная на Васильевском',
    area: '62 м²',
    tags: ['Комплекс'],
    placeholder:
      '[Фото: гостиная с диваном, встроенным освещением и видом на город. Единая цветовая гамма]',
  },
  {
    id: 3,
    title: 'Мастер-ванная в новостройке',
    area: '8 м²',
    tags: ['Сантехника', 'Свет'],
    placeholder:
      '[Фото: ванная с матовой сантехникой, скрытыми коммуникациями и подсветкой ниши. Лаконично]',
  },
  {
    id: 4,
    title: 'Спальня на Комендантском',
    area: '18 м²',
    tags: ['Мебель', 'Свет'],
    placeholder:
      '[Фото: минималистичная спальня, прикроватные светильники, встроенный шкаф. Нейтральная палитра]',
  },
]

export default function Portfolio() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-3">Работы</p>
              <h2 className="text-3xl md:text-4xl font-light text-graphite">Портфолио</h2>
            </div>
            <Link
              to="/portfolio"
              className="text-sm text-graphite border-b border-graphite/30 hover:border-graphite transition-colors hidden md:block pb-0.5"
            >
              Все проекты →
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map(({ id, title, area, tags, placeholder }, i) => (
            <Reveal key={id} delay={(i % 2) * 100}>
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] bg-stone-300 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <span className="text-stone-500 text-xs text-center px-8 leading-relaxed">
                      {placeholder}
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-medium text-graphite">{title}</h3>
                    <p className="text-sm text-stone-400 mt-0.5">
                      {area} · {tags.join(', ')}
                    </p>
                  </div>
                  <span className="text-stone-300 text-sm mt-0.5 group-hover:text-accent transition-colors">
                    →
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 md:hidden">
            <Link
              to="/portfolio"
              className="text-sm text-graphite border-b border-graphite/30 hover:border-graphite transition-colors pb-0.5"
            >
              Все проекты →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
