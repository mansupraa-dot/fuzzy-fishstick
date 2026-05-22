import { Helmet } from 'react-helmet-async'
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
  {
    id: 4,
    tag: 'Сантехника',
    title: 'Матовая или глянцевая сантехника: что выбрать в 2024',
    excerpt:
      'Вопрос не только эстетики — матовые покрытия требуют особого ухода, а глянец скрывает царапины. Разбираем детально.',
    date: '15 октября 2024',
    readTime: '4 мин',
  },
  {
    id: 5,
    tag: 'Пространство',
    title: 'Студия 35 м²: как сделать не тесно',
    excerpt:
      'Небольшое пространство — не проблема. Проблема — неправильный подбор мебели и свет, который разрезает комнату на куски.',
    date: '3 октября 2024',
    readTime: '6 мин',
  },
  {
    id: 6,
    tag: 'Мебель',
    title: 'Итальянская мебель: за что вы реально платите',
    excerpt:
      'Разбираем, что в итальянской мебели — конструктив и материалы, а что — маркетинг и имя. Где переплата оправдана, а где нет.',
    date: '22 сентября 2024',
    readTime: '5 мин',
  },
]

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Блог — Archittell | Об интерьере, мебели и свете</title>
        <meta
          name="description"
          content="Статьи об архитектурном подборе мебели, освещения и сантехники. Практические советы для квартир в Санкт-Петербурге."
        />
      </Helmet>

      <div className="pt-16">
        <div className="bg-graphite text-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-widest text-accent mb-4">Публикации</p>
              <h1 className="text-4xl md:text-6xl font-light leading-tight">Блог</h1>
            </Reveal>
          </div>
        </div>

        <div className="bg-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {ARTICLES.map(({ id, tag, title, excerpt, date, readTime }, i) => (
                <Reveal key={id} delay={(i % 3) * 80}>
                  <article className="group cursor-pointer">
                    <div className="aspect-video bg-stone-100 mb-6 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <span className="text-stone-300 text-xs">Фото к статье</span>
                      </div>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-accent mb-3">{tag}</p>
                    <h2 className="text-base font-medium text-graphite mb-3 leading-snug group-hover:text-stone-500 transition-colors">
                      {title}
                    </h2>
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
        </div>
      </div>
    </>
  )
}
