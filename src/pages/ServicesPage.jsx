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

      <div className="pt-16">
        {/* Page header */}
        <div className="bg-graphite text-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-widest text-accent mb-4">Что мы делаем</p>
              <h1 className="text-4xl md:text-6xl font-light leading-tight max-w-2xl">
                Подбор, а не продажа
              </h1>
            </Reveal>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col gap-16 md:gap-20">
              {SERVICES.map(({ title, price, description, includes }, i) => (
                <Reveal key={title}>
                  <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
                    <div>
                      <div className="flex items-baseline gap-4 mb-5">
                        <h2 className="text-2xl font-medium text-graphite">{title}</h2>
                        <span className="text-sm text-stone-400">{price}</span>
                      </div>
                      <p className="text-stone-500 leading-relaxed">{description}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-stone-300 mb-4">
                        Что входит
                      </p>
                      <ul className="flex flex-col gap-3">
                        {includes.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-stone-500">
                            <span className="text-accent mt-0.5 shrink-0">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {i < SERVICES.length - 1 && (
                    <div className="mt-16 md:mt-20 border-t border-stone-100" />
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-cream py-20">
          <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-light text-graphite mb-6">
                Не знаете, с чего начать?
              </h2>
              <p className="text-stone-500 mb-8 max-w-md">
                Расскажите о проекте — поможем разобраться, что нужно именно вам.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-graphite text-white text-sm px-8 py-4 hover:bg-stone-700 transition-colors"
              >
                Обсудить проект
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
