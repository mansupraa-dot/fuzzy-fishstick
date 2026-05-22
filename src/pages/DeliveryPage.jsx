import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const BLOCKS = [
  {
    title: 'Доставка',
    text: 'Курьером до двери по Санкт-Петербургу и Ленинградской области. Сроки уточняются при подтверждении заказа — зависят от наличия товара у поставщика.',
  },
  {
    title: 'Сборка',
    text: 'Профессиональная сборка — отдельная услуга, добавляется при оформлении заказа. Стоимость зависит от состава и сложности заказа.',
  },
  {
    title: 'Образцы материалов',
    text: 'Ткани, отделки и фурнитуру можно посмотреть и потрогать в шоуруме у нашего партнёра. Образцы не высылаем — только на месте.',
  },
]

export default function DeliveryPage() {
  return (
    <>
      <Helmet>
        <title>Доставка и сборка — Pufflux</title>
        <meta
          name="description"
          content="Доставка мебели, освещения и сантехники курьером по СПб. Профессиональная сборка — отдельная услуга."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-16">Доставка и сборка</h1>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
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
                to="/showroom"
                className="text-sm text-ink border-b border-ink/30 hover:border-ink transition-colors"
              >
                Записаться в шоурум
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
