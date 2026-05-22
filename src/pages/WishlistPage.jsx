import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useWishlist } from '../context/WishlistContext'
import { getProductById } from '../data/products'
import ProductCard from '../components/ui/ProductCard'

export default function WishlistPage() {
  const { items } = useWishlist()
  const products = items.map((id) => getProductById(id)).filter(Boolean)

  return (
    <>
      <Helmet>
        <title>Избранное — Archittell</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <h1 className="text-2xl font-light text-ink mb-8">Избранное</h1>

          {products.length === 0 ? (
            <div className="py-24 flex flex-col items-center gap-4 text-center">
              <p className="text-ink-3">В избранном пока ничего нет</p>
              <Link
                to="/catalog"
                className="text-sm text-ink border-b border-ink/30 pb-0.5"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
