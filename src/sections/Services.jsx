import Reveal from '../components/ui/Reveal'

const SERVICES = [
  {
    title: 'Мебель',
    description:
      'Подбор по пропорциям, материалу и функции. Диваны, столы, стеллажи, спальные места — как единая система хранения и жизни.',
    price: 'от 25 000 ₽',
  },
  {
    title: 'Освещение',
    description:
      'Подвесные, встроенные, напольные. Световые сценарии под каждую зону и задачу. Не просто лампочки — архитектура света.',
    price: 'от 15 000 ₽',
  },
  {
    title: 'Сантехника',
    description:
      'Смесители, унитазы, ванны, душевые. Под габариты, стиль и бюджет. Без переплат за итальянский логотип.',
    price: 'от 20 000 ₽',
  },
  {
    title: 'Комплексный подбор',
    description:
      'Мебель + свет + сантехника как единая спецификация. Всё согласовано между собой. Одно ТЗ — один результат.',
    price: 'от 55 000 ₽',
  },
]

export default function Services() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-accent mb-3">Что подбираем</p>
          <h2 className="text-3xl md:text-4xl font-light text-graphite mb-16 md:mb-20">Услуги</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-px bg-stone-200">
          {SERVICES.map(({ title, description, price }, i) => (
            <Reveal key={title} delay={(i % 2) * 100}>
              <div className="bg-white p-8 md:p-10 h-full">
                <h3 className="text-xl font-medium text-graphite mb-4">{title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm mb-8">{description}</p>
                <span className="text-xs text-stone-400 border-b border-stone-200 pb-0.5">
                  {price}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
