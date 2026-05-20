import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const SERVICES = [
  {
    title: 'Мебель',
    price: 'от 25 000 ₽',
    description:
      'Подбор мебели под планировку, высоту потолков и сценарии использования. Гостиная, спальня, кухня, детская — с учётом пропорций и материалов.',
    includes: [
      'Анализ планировки и замеры',
      'Подбор по каталогам и шоурумам',
      'Спецификация с артикулами и ценами',
      'Обоснование каждого выбора',
    ],
  },
  {
    title: 'Освещение',
    price: 'от 15 000 ₽',
    description:
      'Световые сценарии под каждую зону. Рабочий свет, акцентный, фоновый. Подбор люстр, точечных светильников, бра и напольных ламп.',
    includes: [
      'Световая схема по зонам',
      'Подбор типов и мощности',
      'Список позиций с источниками',
      'Совместимость с диммерами',
    ],
  },
  {
    title: 'Сантехника',
    price: 'от 20 000 ₽',
    description:
      'Ванна, душевая, унитаз, смесители — под габариты ванной комнаты и бюджет. Без переплат за бренд, с акцентом на надёжность.',
    includes: [
      'Подбор под размеры помещения',
      'Рекомендации по установке',
      'Альтернативные варианты',
      'Сравнение по характеристикам',
    ],
  },
  {
    title: 'Комплексный подбор',
    price: 'от 55 000 ₽',
    description:
      'Мебель, свет и сантехника как единая согласованная система. Одно техзадание, один архитектор, один результат.',
    includes: [
      'Всё из трёх направлений',
      'Единая цветовая и материальная гамма',
      'Полная спецификация под ключ',
      'Сопровождение при покупке',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Услуги — Pufflux</title>
        <meta
          name="description"
          content="Подбор мебели, освещения и сантехники в Санкт-Петербурге. Архитектурный подход — единая спецификация для вашей квартиры."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-2">Подбор, а не продажа</h1>
            <p className="text-sm text-ink-3 mb-12">
              Архитектурный подход к выбору мебели, света и сантехники
            </p>
          </Reveal>

          <div className="flex flex-col gap-6">
            {SERVICES.map(({ title, price, description, includes }) => (
              <Reveal key={title}>
                <div className="glass-card p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <div className="flex items-baseline gap-3 mb-4">
                        <h2 className="text-xl font-light text-ink">{title}</h2>
                        <span className="text-sm text-ink-4">{price}</span>
                      </div>
                      <p className="text-sm text-ink-3 leading-relaxed">{description}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink-4 mb-3">
                        Что входит
                      </p>
                      <ul className="flex flex-col gap-2">
                        {includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-ink-3">
                            <span className="text-ink-4 shrink-0 mt-0.5">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="glass-card p-8 mt-12 text-center">
              <h2 className="text-xl font-light text-ink mb-3">Не знаете, с чего начать?</h2>
              <p className="text-sm text-ink-3 mb-6">
                Расскажите о проекте — поможем разобраться, что нужно именно вам.
              </p>
              <Link
                to="/brief"
                className="inline-block bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
              >
                Обсудить проект
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
