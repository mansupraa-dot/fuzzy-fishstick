import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const BLOCKS = [
  {
    title: 'Стандартный возврат',
    text: '14 дней с момента получения согласно Федеральному закону «О защите прав потребителей». Товар в оригинальной упаковке, без следов использования.',
  },
  {
    title: 'Крупногабаритные товары',
    text: 'Диваны, кровати, шкафы — условия возврата уточняются индивидуально. Пожалуйста, свяжитесь с нами до инициирования возврата.',
  },
]

export default function ReturnPage() {
  return (
    <>
      <Helmet>
        <title>Возврат и обмен — Archittell</title>
        <meta
          name="description"
          content="Условия возврата и обмена товаров. 14 дней по закону. Крупногабарит — индивидуально."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-16">Возврат и обмен</h1>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {BLOCKS.map((block) => (
              <Reveal key={block.title}>
                <div className="glass-card p-6">
                  <h2 className="text-base font-light text-ink mb-3">{block.title}</h2>
                  <p className="text-sm text-ink-3 leading-relaxed">{block.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center">
              <Link
                to="/brief"
                className="text-sm text-ink border-b border-ink/30 hover:border-ink transition-colors"
              >
                Связаться с нами
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
