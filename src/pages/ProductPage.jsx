import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Heart } from 'lucide-react'
import { getProductById, CATEGORY_LABELS } from '../data/products'
import { useCart } from '../context/CartContext'
import Button from '../components/ui/Button'

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

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽'
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
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4 text-ink-3">
        <p>Товар не найден</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-ink underline"
        >
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

      <div className="pt-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="text-xs text-ink-4 mb-8 flex gap-2 items-center flex-wrap">
            <Link to="/" className="hover:text-ink-2 transition-colors">
              Главная
            </Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-ink-2 transition-colors">
              Каталог
            </Link>
            <span>/</span>
            <Link
              to={`/catalog/${product.category}`}
              className="hover:text-ink-2 transition-colors"
            >
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Gallery */}
            <div>
              {/* Main image */}
              <div className="glass-card overflow-hidden aspect-[4/3] mb-3">
                <div className="w-full h-full bg-white/40 flex items-center justify-center">
                  <span className="text-ink-4 text-xs text-center px-8 leading-relaxed">
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
                    aria-label={`Фото ${i + 1}`}
                    className={`flex-1 aspect-square glass-card overflow-hidden border-2 transition-all ${
                      i === activeImage ? 'border-ink' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full bg-white/40 flex items-center justify-center">
                      <span className="text-ink-4 text-[9px]">Фото {i + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink-3 mb-3">
                {categoryLabel}
              </p>
              <h1 className="text-2xl md:text-3xl font-light text-ink mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-2xl font-normal text-ink">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-ink-4 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              {/* Color selector */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink-4 mb-3">
                    Цвет — <span className="text-ink">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        aria-label={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-ink scale-110'
                            : 'border-transparent hover:border-ink-4'
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
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink-4 mb-3">
                    Материал — <span className="text-ink">{selectedFabric}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.fabrics.map((fabric) => (
                      <button
                        key={fabric}
                        onClick={() => setSelectedFabric(fabric)}
                        className={`text-xs px-4 py-2 rounded-full border transition-colors ${
                          selectedFabric === fabric
                            ? 'bg-ink text-white border-ink'
                            : 'bg-white/60 text-ink-3 border-white/80 hover:text-ink'
                        }`}
                      >
                        {fabric}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex gap-3 mb-8">
                <Button
                  onClick={handleAddToCart}
                  variant={added ? 'ghost' : 'primary'}
                  className="flex-1"
                >
                  {added ? '✓ Добавлено' : 'В корзину'}
                </Button>
                <Button variant="ghost" size="sm" aria-label="В избранное" className="px-3">
                  <Heart size={16} strokeWidth={1.5} />
                </Button>
              </div>

              {/* Description */}
              <p className="text-ink-3 text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specs */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink-4 mb-4">
                  Характеристики
                </p>
                <div className="flex flex-col">
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <div
                      key={key}
                      className={`flex justify-between py-3 text-sm border-b border-black/5 ${
                        i === 0 ? 'border-t border-black/5' : ''
                      }`}
                    >
                      <span className="text-ink-3">{key}</span>
                      <span className="text-ink font-normal text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
