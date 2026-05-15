import Reveal from '../components/ui/Reveal'

const REVIEWS = [
  {
    id: 1,
    quote:
      'Не ожидала, что кто-то может так чётко объяснить, почему одна люстра убивает весь интерьер. После консультации поняла, чего хочу.',
    name: 'Анна К.',
    project: 'Студия 42 м², Приморский район',
    placeholder: '[Фото интерьера: светлая студия с правильно подобранным освещением]',
  },
  {
    id: 2,
    quote:
      'Бюджет не изменился. Но результат другой — всё на своём месте. Теперь понимаю, что покупал раньше не то.',
    name: 'Максим Р.',
    project: '3-комнатная 88 м², Московский район',
    placeholder: '[Фото интерьера: гостиная с правильными пропорциями мебели и света]',
  },
  {
    id: 3,
    quote:
      'Ванная получилась именно такой, как я хотела — без лишнего. Сантехника, свет, плитка. Всё согласовано.',
    name: 'Дарья В.',
    project: 'Ванная 7 м², ЖК «Северный»',
    placeholder: '[Фото интерьера: лаконичная ванная с матовой сантехникой и встроенной подсветкой]',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-accent mb-3">Отзывы</p>
          <h2 className="text-3xl md:text-4xl font-light text-graphite mb-16 md:mb-20">
            Что говорят клиенты
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS.map(({ id, quote, name, project, placeholder }, i) => (
            <Reveal key={id} delay={i * 120}>
              <div className="bg-cream">
                <div className="aspect-video bg-stone-200 flex items-center justify-center overflow-hidden">
                  <span className="text-stone-400 text-xs text-center px-6 leading-relaxed">
                    {placeholder}
                  </span>
                </div>
                <div className="p-7">
                  <p className="text-graphite text-sm leading-relaxed mb-6 italic">
                    «{quote}»
                  </p>
                  <div>
                    <div className="text-sm font-medium text-graphite">{name}</div>
                    <div className="text-xs text-stone-400 mt-0.5">{project}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
