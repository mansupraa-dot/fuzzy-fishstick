import Reveal from '../components/ui/Reveal'

export default function CTA() {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-stone-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-graphite mb-4">
                Расскажите о проекте
              </h2>
              <p className="text-stone-500 leading-relaxed mb-4">
                Оставьте контакт — свяжемся в течение дня. Или напишите напрямую.
              </p>
              <div className="flex gap-6 mt-8">
                <a
                  href="https://t.me/pufflux"
                  className="text-sm text-graphite border-b border-graphite/30 hover:border-graphite transition-colors pb-0.5"
                >
                  Telegram
                </a>
                <a
                  href="#"
                  className="text-sm text-graphite border-b border-graphite/30 hover:border-graphite transition-colors pb-0.5"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Имя"
                  className="border-b border-stone-200 py-3 text-sm text-graphite placeholder-stone-300 focus:outline-none focus:border-graphite transition-colors bg-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="tel"
                  placeholder="Телефон или Telegram"
                  className="border-b border-stone-200 py-3 text-sm text-graphite placeholder-stone-300 focus:outline-none focus:border-graphite transition-colors bg-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <textarea
                  rows={3}
                  placeholder="Кратко о проекте — площадь, что нужно подобрать"
                  className="border-b border-stone-200 py-3 text-sm text-graphite placeholder-stone-300 focus:outline-none focus:border-graphite transition-colors bg-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-graphite text-white text-sm px-8 py-4 hover:bg-stone-700 transition-colors self-start"
              >
                Отправить
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
