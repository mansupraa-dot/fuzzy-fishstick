import Reveal from '../components/ui/Reveal'

export default function Positioning() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <Reveal>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-6">Кто такой Archittell</p>
              <h2 className="text-3xl md:text-4xl font-light text-graphite leading-tight mb-8">
                Не магазин.
                <br />
                Не дизайнер.
                <br />
                Архитектор подбора.
              </h2>
              <div className="space-y-5 text-stone-500 leading-relaxed">
                <p>
                  Большинство людей покупают мебель, освещение и сантехнику отдельно. В разных
                  магазинах, в разное время. В итоге предметы есть — пространства нет.
                </p>
                <p>
                  Archittell работает иначе. Из тысяч позиций — то, что работает в вашем конкретном
                  помещении. Под пропорции, свет и вас.
                </p>
                <p>
                  Никаких переплат за лейбл. Никакого навязанного стиля. Только точный подбор, в
                  котором каждый предмет на своём месте.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-cream aspect-[4/3] flex items-center justify-center">
              <span className="text-stone-400 text-xs text-center px-10 leading-relaxed">
                [Фото: деталь интерьера — угол комнаты с консолью, светильником и фактурной стеной.
                Акцент на материалах и пропорциях]
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
