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

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-12">Как это работает</h1>
          </Reveal>

          <div className="flex flex-col gap-16 mb-20">
            {STEPS.map(({ number, title, duration, description, details }) => (
              <Reveal key={number}>
                <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
                  <div>
                    <div className="text-6xl font-light text-ink/8 mb-3 leading-none select-none">
                      {number}
                    </div>
                    <h2 className="text-xl font-light text-ink mb-1">{title}</h2>
                    <p className="text-sm text-ink-4">{duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-ink-3 leading-relaxed mb-6">{description}</p>
                    <ul className="flex flex-col gap-2">
                      {details.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ink-3">
                          <span className="text-ink-4 shrink-0 mt-0.5">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="border-t border-black/8 pt-12 mb-16">
              <p className="text-[10px] uppercase tracking-widest text-ink-4 mb-8">Вопросы</p>
              <h2 className="text-xl font-light text-ink mb-10">FAQ</h2>
              <div className="flex flex-col gap-8 max-w-2xl">
                {FAQ.map(({ q, a }) => (
                  <Reveal key={q}>
                    <div>
                      <h3 className="text-sm font-normal text-ink mb-2">{q}</h3>
                      <p className="text-sm text-ink-3 leading-relaxed">{a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass-card p-8 text-center">
              <h2 className="text-xl font-light text-ink mb-3">Готовы начать?</h2>
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
