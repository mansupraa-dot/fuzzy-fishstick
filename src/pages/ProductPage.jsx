import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getProductById, CATEGORY_LABELS } from '../data/products'
import { useCart } from '../context/CartContext'
import Reveal from '../components/ui/Reveal'

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

const COLOR_MAP = {
  'Серый': '#9CA3AF',
  'Бежевый': '#D4B896',
  'Графит': '#374151',
  'Синий': '#3B82F6',
  'Белый': '#F9FAFB',
  'Дуб': '#B5844C',
  'Антрацит': '#1F2937',
  'Кремовый': '#FFF8F0',
  'Терракот': '#C2775B',
  'Оливковый': '#6B7C4B',
  'Чёрный': '#111111',
  'Латунь': '#B08D57',
  'Хром': '#C0C0C0',
  'Матовый чёрный': '#2A2A2A',
  'Матовый белый': '#F0F0F0',
  'Белый глянец': '#FFFFFF',
  'Белый матовый': '#F5F5F5',
  'Дуб натуральный': '#C49A6C',
  'Дуб тёмный': '#7B5533',
  'Серебристый': '#D1D5DB',
}

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { dispatch } = useCart()

  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? null)
  const [selectedFabric, setSelectedFabric] = useState(product?.fabrics[0] ?? null)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4 text-stone-400">
        <p>Товар не найден</p>
        <button onClick={() => navigate(-1)} className="text-sm text-graphite underline">
          Вернуться назад
        </button>
      </div>
    )
  }

  const categoryLabel = CATEGORY_LABELS[product.category]

  function handleAddToCart() {
    dispatch({ type: 'ADD', product, color: selectedColor, fabric: selectedFabric })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>{product.name} — Pufflux</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          {/* Breadcrumb */}
          <Reveal>
            <nav className="text-xs text-stone-400 mb-8 flex gap-2 items-center flex-wrap">
              <Link to="/" className="hover:text-graphite transition-colors">Главная</Link>
              <span>/</span>
              <Link
                to={`/catalog/${product.category}`}
                className="hover:text-graphite transition-colors"
              >
                {categoryLabel}
              </Link>
              <span>/</span>
              <span className="text-graphite">{product.name}</span>
            </nav>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Gallery */}
            <Reveal>
              <div>
                {/* Main image */}
                <div className="aspect-[4/3] bg-stone-100 mb-3 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                    <span className="text-stone-400 text-xs text-center px-8 leading-relaxed">
                      {product.images[activeImage]}
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-1 aspect-square bg-stone-100 border-2 transition-colors overflow-hidden ${
                        i === activeImage ? 'border-graphite' : 'border-transparent hover:border-stone-300'
                      }`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                        <span className="text-stone-400 text-[9px] text-center px-1">
                          Фото {i + 1}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Info */}
            <Reveal delay={150}>
              <div>
                <p className="text-xs uppercase tracking-widest text-accent mb-3">
                  {categoryLabel}
                </p>
                <h1 className="text-2xl md:text-3xl font-light text-graphite mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-2xl font-medium text-graphite">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-stone-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Color selector */}
                {product.colors.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                      Цвет — <span className="text-graphite">{selectedColor}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          title={color}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            selectedColor === color
                              ? 'border-graphite scale-110'
                              : 'border-stone-200 hover:border-stone-400'
                          }`}
                          style={{ backgroundColor: COLOR_MAP[color] ?? '#E5E7EB' }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Fabric selector */}
                {product.fabrics.length > 0 && (
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                      Материал — <span className="text-graphite">{selectedFabric}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.fabrics.map((fabric) => (
                        <button
                          key={fabric}
                          onClick={() => setSelectedFabric(fabric)}
                          className={`text-sm px-4 py-2 border transition-colors ${
                            selectedFabric === fabric
                              ? 'border-graphite bg-graphite text-white'
                              : 'border-stone-200 text-stone-500 hover:border-graphite hover:text-graphite'
                          }`}
                        >
                          {fabric}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 text-sm font-medium transition-all ${
                    added
                      ? 'bg-green-800 text-white'
                      : 'bg-graphite text-white hover:bg-stone-700'
                  }`}
                >
                  {added ? '✓ Добавлено в корзину' : 'В корзину'}
                </button>

                {/* Description */}
                <p className="text-stone-500 text-sm leading-relaxed mt-8">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
                    Характеристики
                  </p>
                  <div className="flex flex-col gap-0">
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <div
                        key={key}
                        className={`flex justify-between py-3 text-sm border-b border-stone-100 ${
                          i === 0 ? 'border-t' : ''
                        }`}
                      >
                        <span className="text-stone-400">{key}</span>
                        <span className="text-graphite font-medium text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
