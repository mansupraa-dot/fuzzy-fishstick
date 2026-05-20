import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const PRINCIPLES = [
  {
    title: 'Пространство как система',
    body: 'Мебель, свет и сантехника — не отдельные категории, а части одного интерьера. Мы работаем с ними вместе: проверяем пропорции, согласуем материалы, обеспечиваем целостность результата.',
  },
  {
    title: 'Подбор, а не продажа',
    body: 'Мы не получаем комиссию от производителей. Задача — найти лучшее для вашего пространства, а не то, что выгоднее продать. Спецификация строится на логике, а не на ассортименте.',
  },
  {
    title: 'Один архитектор — один результат',
    body: 'Вы работаете с одним специалистом от первого разговора до финальной спецификации. Не менеджер → архитектор → менеджер, а прямой контакт с человеком, который принимает решения.',
  },
]

export default function PhilosophyPage() {
  return (
    <>
      <Helmet>
        <title>О проекте — Pufflux</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-3">О проекте</h1>
            <p className="text-sm text-ink-3 mb-12 max-w-xl leading-relaxed">
              Мы объединили мебель, освещение и сантехнику в одном месте — потому что хороший
              интерьер складывается из всего сразу, а не по частям.
            </p>
          </Reveal>

          <div className="flex flex-col gap-6 mb-16">
            {PRINCIPLES.map(({ title, body }) => (
              <Reveal key={title}>
                <div className="glass-card p-8">
                  <h2 className="text-base font-normal text-ink mb-3">{title}</h2>
                  <p className="text-sm text-ink-3 leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="glass-card p-8 text-center">
              <h2 className="text-xl font-light text-ink mb-3">
                Расскажите о своём проекте
              </h2>
              <p className="text-sm text-ink-3 mb-6">Разберёмся вместе, что нужно именно вам.</p>
              <Link
                to="/brief"
                className="inline-block bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
              >
                Начать
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
