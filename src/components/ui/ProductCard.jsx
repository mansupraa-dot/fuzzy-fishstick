import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

export default function ProductCard({ product }) {
  const { dispatch } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  function handleAddToCart(e) {
    e.preventDefault()
    dispatch({
      type: 'ADD',
      product,
      color: product.colors?.[0] ?? null,
      fabric: product.fabrics?.[0] ?? null,
    })
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="glass-card overflow-hidden transition-transform duration-200 hover:-translate-y-1">

        {/* Image area */}
        <div className="relative aspect-[4/3] bg-white/40 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-ink-5 text-xs
            tracking-widest transition-transform duration-500 group-hover:scale-105">
            {product.images?.[0] ?? 'фото товара'}
          </div>

          {product.oldPrice && (
            <span className="absolute top-3 left-3 bg-ink text-white text-[10px]
              px-2.5 py-1 rounded-full tracking-wide">
              Скидка
            </span>
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); toggle(product.id) }}
            className="absolute top-3 right-3 w-7 h-7 glass-circle flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label={wishlisted ? 'Убрать из избранного' : 'В избранное'}
          >
            <Heart
              size={13}
              className={wishlisted ? 'text-ink' : 'text-ink-3'}
              strokeWidth={1.5}
              fill={wishlisted ? 'currentColor' : 'none'}
            />
          </button>

          {/* Quick add */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-ink/90 text-white text-xs py-3
              translate-y-full group-hover:translate-y-0 transition-transform duration-300
              tracking-wide"
          >
            В корзину
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          {product.brand && (
            <p className="text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-1">
              {product.brand}
            </p>
          )}
          <h3 className="text-[13px] font-normal text-ink mb-2 leading-snug">
            {product.name}
          </h3>

          {/* Color swatches preview */}
          {product.colors?.length > 0 && (
            <div className="flex gap-1 mb-3">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c}
                  className="text-[9px] text-ink-4 bg-black/5 px-1.5 py-0.5 rounded-full"
                >
                  {c}
                </span>
              ))}
              {product.colors.length > 4 && (
                <span className="text-[9px] text-ink-4">+{product.colors.length - 4}</span>
              )}
            </div>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-sm font-normal text-ink">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-ink-4 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  )
}
