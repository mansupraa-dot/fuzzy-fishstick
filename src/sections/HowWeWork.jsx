import Reveal from '../components/ui/Reveal'

const STEPS = [
  {
    number: '01',
    title: 'Разговор',
    description:
      'Рассказываете о квартире, задаче, бюджете. Мы слушаем — без шаблонов.',
  },
  {
    number: '02',
    title: 'Подбор',
    description:
      'Архитектор анализирует пространство и подбирает конкретные позиции из каталога.',
  },
  {
    number: '03',
    title: 'Результат',
    description:
      'Получаете точный список: что, откуда, почём. Без лишних согласований.',
  },
]

export default function HowWeWork() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="text-2xl font-light text-ink mb-16">
            Как это работает
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-10">
          {STEPS.map((step) => (
            <Reveal key={step.number}>
              <div>
                <div className="text-6xl font-light text-ink/8 select-none mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-light text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-3 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
