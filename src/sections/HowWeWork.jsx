import Reveal from '../components/ui/Reveal'

const STEPS = [
  {
    number: '01',
    title: 'Разговор',
    description:
      'Рассказываете о квартире, пропорциях, бюджете и том, как вы хотите жить. Мы задаём вопросы — не продаём.',
  },
  {
    number: '02',
    title: 'Подбор',
    description:
      'Архитектор анализирует пространство и формирует спецификацию: мебель, свет, сантехника — как единая система.',
  },
  {
    number: '03',
    title: 'Результат',
    description:
      'Получаете точный список позиций с обоснованием. Покупаете сами или с нашей помощью — без наценок.',
  },
]

export default function HowWeWork() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-accent mb-3">Как это работает</p>
          <h2 className="text-3xl md:text-4xl font-light text-graphite mb-16 md:mb-20">
            Три шага
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {STEPS.map(({ number, title, description }, i) => (
            <Reveal key={number} delay={i * 150}>
              <div>
                <div className="text-6xl font-light text-graphite/8 mb-5 leading-none select-none">
                  {number}
                </div>
                <h3 className="text-xl font-medium text-graphite mb-3">{title}</h3>
                <p className="text-stone-500 leading-relaxed">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
