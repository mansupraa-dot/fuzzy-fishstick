import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Hero from '../sections/Hero'
import Philosophy from '../sections/Philosophy'
import CTA from '../sections/CTA'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import { getPopularProducts } from '../data/products'

const CATEGORIES = [
  {
    label: 'Мебель',
    desc: 'Диваны, кровати, столы — подобранные под пропорции',
    to: '/catalog/furniture',
    placeholder: '[Фото: угол гостиной с диваном и стеллажом, нейтральные тона]',
  },
  {
    label: 'Освещение',
    desc: 'Техническое и декоративное как единая схема',
    to: '/catalog/lighting',
    placeholder: '[Фото: световая рейка и подвесной светильник в интерьере]',
  },
  {
    label: 'Сантехника',
    desc: 'Смесители, раковины, ванны без переплат',
    to: '/catalog/plumbing',
    placeholder: '[Фото: раковина и смеситель матового чёрного, белый кафель]',
  },
]

const popularProducts = getPopularProducts(4)

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Pufflux — подбор мебели, освещения и сантехники в Санкт-Петербурге</title>
        <meta
          name="description"
          content="Архитектурный подбор мебели, света и сантехники для вашей квартиры в СПб. Каталог с фильтрацией. Без переплат за бренд."
        />
        <link rel="canonical" href="https://pufflux.ru/" />
      </Helmet>

      <Hero />

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-light text-graphite mb-12">Каталог</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {CATEGORIES.map(({ label, desc, to, placeholder }, i) => (
              <Reveal key={label} delay={i * 100}>
                <Link to={to} className="group block">
                  <div className="aspect-[4/3] bg-stone-100 overflow-hidden mb-4">
                    <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <span className="text-stone-400 text-xs text-center px-6 leading-relaxed">
                        {placeholder}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium text-graphite group-hover:text-stone-500 transition-colors">
                        {label}
                      </h3>
                      <p className="text-sm text-stone-400 mt-0.5">{desc}</p>
                    </div>
                    <span className="text-stone-300 text-sm group-hover:text-accent transition-colors mt-0.5">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Popular products */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent mb-2">Выбор клиентов</p>
                <h2 className="text-2xl md:text-3xl font-light text-graphite">
                  Популярные товары
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {popularProducts.map((product, i) => (
              <Reveal key={product.id} delay={i * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Philosophy />
      <CTA />
    </>
  )
}
