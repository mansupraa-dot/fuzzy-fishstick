import Reveal from '../components/ui/Reveal'

export default function Philosophy() {
  return (
    <section className="py-24 md:py-32 bg-graphite text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs uppercase tracking-widest text-accent mb-8">Философия</p>
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-10">
              Архитектурный подбор — не про стиль. Про пропорции.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="space-y-5 text-white/55 leading-relaxed">
              <p>
                Стиль — это то, что вам нравится. Пропорции — это то, что работает. Хороший
                интерьер сочетает оба. Плохой жертвует вторым ради первого.
              </p>
              <p>
                Мы не навязываем стиль. Мы анализируем ваше пространство: потолки, окна, точки
                входа, сценарии использования. И подбираем предметы, которые физически вписываются
                в него.
              </p>
              <p>
                Это и есть архитектурный подход. Не «красиво», а «правильно». Хотя в итоге —
                красиво.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
