import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const ARTICLES = [
  {
    id: 1,
    tag: 'Пространство',
    title: 'Почему высота потолков меняет всё — и как с этим работать',
    excerpt:
      'Потолки 2,5 метра и потолки 3 метра — это не просто 50 сантиметров. Это другие пропорции, другой свет, другая мебель.',
    date: '12 ноября 2024',
    readTime: '4 мин',
  },
  {
    id: 2,
    tag: 'Мебель',
    title: 'Три ошибки при выборе дивана, которые сложно исправить',
    excerpt:
      'Диван покупают на 10 лет. Размер, высота ножек, глубина сидения — вот что определяет, удобно вам будет или нет.',
    date: '4 ноября 2024',
    readTime: '5 мин',
  },
  {
    id: 3,
    tag: 'Освещение',
    title: 'Как освещение может спасти плохую планировку',
    excerpt:
      'Зонирование светом работает, когда стены не работают. Несколько правил, которые меняют восприятие комнаты.',
    date: '27 октября 2024',
    readTime: '3 мин',
  },
]

export default function BlogPreview() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-3">Статьи</p>
              <h2 className="text-3xl md:text-4xl font-light text-graphite">Блог</h2>
            </div>
            <Link
              to="/blog"
              className="text-sm text-graphite border-b border-graphite/30 hover:border-graphite transition-colors hidden md:block pb-0.5"
            >
              Все статьи →
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {ARTICLES.map(({ id, tag, title, excerpt, date, readTime }, i) => (
            <Reveal key={id} delay={i * 100}>
              <article className="group cursor-pointer">
                <div className="aspect-video bg-stone-200 mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="text-stone-400 text-xs">Фото к статье</span>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-widest text-accent mb-3">{tag}</p>
                <h3 className="text-base font-medium text-graphite mb-3 leading-snug group-hover:text-stone-500 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed mb-5">{excerpt}</p>
                <div className="flex gap-4 text-xs text-stone-300">
                  <span>{date}</span>
                  <span>{readTime}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
