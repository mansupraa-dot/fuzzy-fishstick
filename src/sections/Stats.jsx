import Reveal from '../components/ui/Reveal'

const STATS = [
  { value: '7+', label: 'лет\nв подборе' },
  { value: '200+', label: 'реализованных\nпроектов' },
  { value: '15–120', label: 'млн ₽\nбюджеты проектов' },
  { value: 'СПб', label: 'и Ленинградская\nобласть' },
]

export default function Stats() {
  return (
    <section className="py-20 bg-white border-y border-stone-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }, i) => (
            <Reveal key={value} delay={i * 80}>
              <div>
                <div className="text-3xl md:text-4xl font-light text-graphite mb-2">{value}</div>
                <p className="text-sm text-stone-400 leading-snug whitespace-pre-line">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
