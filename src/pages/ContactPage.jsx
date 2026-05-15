import { Helmet } from 'react-helmet-async'
import Reveal from '../components/ui/Reveal'

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Контакт — Pufflux | Обсудить проект</title>
        <meta
          name="description"
          content="Обсудить подбор мебели, освещения или сантехники для квартиры в Санкт-Петербурге. Напишите — свяжемся в течение дня."
        />
      </Helmet>

      <div className="pt-16">
        <div className="bg-graphite text-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-xs uppercase tracking-widest text-accent mb-4">Связаться</p>
              <h1 className="text-4xl md:text-6xl font-light leading-tight max-w-xl">
                Расскажите о проекте
              </h1>
            </Reveal>
          </div>
        </div>

        <div className="bg-white py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Form */}
              <Reveal>
                <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-stone-300 mb-3 block">
                      Имя
                    </label>
                    <input
                      type="text"
                      className="w-full border-b border-stone-200 py-3 text-sm text-graphite placeholder-stone-300 focus:outline-none focus:border-graphite transition-colors bg-transparent"
                      placeholder="Как к вам обращаться"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-stone-300 mb-3 block">
                      Контакт
                    </label>
                    <input
                      type="text"
                      className="w-full border-b border-stone-200 py-3 text-sm text-graphite placeholder-stone-300 focus:outline-none focus:border-graphite transition-colors bg-transparent"
                      placeholder="Телефон или Telegram"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-stone-300 mb-3 block">
                      О проекте
                    </label>
                    <textarea
                      rows={4}
                      className="w-full border-b border-stone-200 py-3 text-sm text-graphite placeholder-stone-300 focus:outline-none focus:border-graphite transition-colors bg-transparent resize-none"
                      placeholder="Площадь, что нужно подобрать, бюджет — любая информация полезна"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-graphite text-white text-sm px-8 py-4 hover:bg-stone-700 transition-colors"
                    >
                      Отправить
                    </button>
                  </div>
                </form>
              </Reveal>

              {/* Contact info */}
              <Reveal delay={200}>
                <div className="flex flex-col gap-10">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-300 mb-4">
                      Мессенджеры
                    </p>
                    <div className="flex flex-col gap-3">
                      <a
                        href="https://t.me/pufflux"
                        className="flex items-center gap-3 text-sm text-graphite hover:text-stone-500 transition-colors group"
                      >
                        <span className="text-accent">→</span>
                        <span>Telegram @pufflux</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-3 text-sm text-graphite hover:text-stone-500 transition-colors group"
                      >
                        <span className="text-accent">→</span>
                        <span>WhatsApp +7 (812) 123-45-67</span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-300 mb-4">
                      Контакты
                    </p>
                    <div className="flex flex-col gap-3 text-sm text-stone-500">
                      <a href="tel:+78121234567" className="hover:text-graphite transition-colors w-fit">
                        +7 (812) 123-45-67
                      </a>
                      <a
                        href="mailto:hello@pufflux.ru"
                        className="hover:text-graphite transition-colors w-fit"
                      >
                        hello@pufflux.ru
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-stone-300 mb-4">
                      Где мы
                    </p>
                    <p className="text-sm text-stone-500 leading-relaxed">
                      Санкт-Петербург.
                      <br />
                      Работаем по всей России — удалённо.
                    </p>
                  </div>

                  <div className="bg-cream p-6">
                    <p className="text-sm text-graphite font-medium mb-1">Время ответа</p>
                    <p className="text-sm text-stone-500">
                      Отвечаем в течение одного рабочего дня. Обычно быстрее.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
