import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

export default function ProductCard({ product }) {
  const { dispatch } = useCart()

  function handleAddToCart(e) {
    e.preventDefault()
    dispatch({
      type: 'ADD',
      product,
      color: product.colors[0] || null,
      fabric: product.fabrics[0] || null,
    })
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden mb-4">
        <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <span className="text-stone-400 text-xs text-center px-6 leading-relaxed">
            {product.images[0]}
          </span>
        </div>

        {product.oldPrice && (
          <span className="absolute top-3 left-3 bg-graphite text-white text-xs px-2 py-1">
            Скидка
          </span>
        )}

        {/* Quick add */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-graphite text-white text-xs py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          В корзину
        </button>
      </div>

      {/* Info */}
      <div>
        <p className="text-xs text-stone-400 mb-1 uppercase tracking-widest">
          {product.colors.slice(0, 3).join(' · ')}
          {product.colors.length > 3 && ` +${product.colors.length - 3}`}
        </p>
        <h3 className="text-sm font-medium text-graphite mb-2 group-hover:text-stone-500 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-medium text-graphite">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-stone-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
