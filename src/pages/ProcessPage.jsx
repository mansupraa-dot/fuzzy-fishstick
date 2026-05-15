import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const STEPS = [
  {
    number: '01',
    title: 'Разговор',
    duration: '30–60 минут',
    description:
      'Всё начинается с разговора. Вы рассказываете о квартире: площадь, планировка, высота потолков. О том, как вы хотите жить: один, с семьёй, с питомцами.',
    details: [
      'Параметры помещения и планировка',
      'Сценарии использования по зонам',
      'Бюджет и ценовые ориентиры',
      'Предпочтения по материалам и стилю',
    ],
  },
  {
    number: '02',
    title: 'Подбор',
    duration: '3–7 рабочих дней',
    description:
      'Архитектор работает с планом помещения и вашими пожеланиями. Анализирует сотни позиций, проверяет пропорции, согласует материалы между собой.',
    details: [
      'Анализ геометрии и пропорций',
      'Подбор по каталогам и шоурумам',
      'Проверка совместимости элементов',
      'Подготовка обоснованной спецификации',
    ],
  },
  {
    number: '03',
    title: 'Результат',
    duration: 'Финальный документ',
    description:
      'Вы получаете точный список позиций с артикулами, источниками и обоснованием каждого выбора. Покупаете сами или с нашей помощью.',
    details: [
      'Полная спецификация с ценами',
      'Источники и альтернативы',
      'Объяснение каждого решения',
      'Сопровождение при необходимости',
    ],
  },
]

const FAQ = [
  {
    q: 'Вы продаёте мебель или только консультируете?',
    a: 'Только подбираем. Мы не магазин и не получаем комиссию от производителей. Цель — найти лучшее для вашего пространства, а не продать дороже.',
  },
  {
    q: 'Нужен ли готовый проект дизайнера?',
    a: 'Нет. Мы работаем с планировкой и вашими пожеланиями. Если есть дизайн-проект — хорошо, но он не обязателен.',
  },
  {
    q: 'Как происходит оплата?',
    a: 'Фиксированная стоимость за подбор. Никаких скрытых наценок на товары. Вы платите только за работу архитектора.',
  },
  {
    q: 'Работаете ли вы за пределами СПб?',
    a: 'Да, удалённо — по всей России. Нужен только план помещения и возможность пообщаться онлайн.',
  },
]

export default function ProcessPage() {
  return (
    <>
      <Helmet>
        <title>Как работаем — Pufflux</title>
        <meta
          name="description"
          content="Три шага архитектурного подбора мебели и интерьера в СПб: разговор, подбор, результат. Без наценок и навязанного стиля."
        />
      </Helmet>

      <div className="pt-16">
        <div className="bg-graphite text-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-widest text-accent mb-4">Процесс</p>
              <h1 className="text-4xl md:text-6xl font-light leading-tight max-w-xl">
                Как это работает
              </h1>
            </Reveal>
          </div>
        </div>

        <div className="bg-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col gap-20 md:gap-24">
              {STEPS.map(({ number, title, duration, description, details }) => (
                <Reveal key={number}>
                  <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
                    <div>
                      <div className="text-6xl font-light text-graphite/8 mb-4 leading-none select-none">
                        {number}
                      </div>
                      <h2 className="text-2xl font-medium text-graphite mb-1">{title}</h2>
                      <p className="text-sm text-stone-400">{duration}</p>
                    </div>
                    <div>
                      <p className="text-stone-500 leading-relaxed mb-8">{description}</p>
                      <ul className="flex flex-col gap-3">
                        {details.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-stone-500">
                            <span className="text-accent mt-0.5 shrink-0">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-cream py-24">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-widest text-accent mb-3">Вопросы</p>
              <h2 className="text-2xl md:text-3xl font-light text-graphite mb-12">FAQ</h2>
            </Reveal>
            <div className="flex flex-col gap-8 max-w-2xl">
              {FAQ.map(({ q, a }) => (
                <Reveal key={q}>
                  <div>
                    <h3 className="text-base font-medium text-graphite mb-2">{q}</h3>
                    <p className="text-stone-500 leading-relaxed text-sm">{a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white py-20 border-t border-stone-100">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <h2 className="text-2xl font-light text-graphite mb-6">Готовы начать?</h2>
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
