import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import NavIcon from '../ui/NavIcon'

const NAV = [
  { to: '/catalog/furniture', label: 'Каталог' },
  { to: '/collections', label: 'Коллекции' },
  { to: '/portfolio', label: 'Портфолио' },
  { to: '/services', label: 'Услуги' },
  { to: '/philosophy', label: 'О нас' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount } = useCart()
  const { count: wishlistCount } = useWishlist()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-pill mx-4 mt-3 px-2' : 'bg-transparent px-0 mt-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          aria-label="Brand"
          className="text-[15px] font-normal tracking-[0.2em] uppercase text-ink"
        >
          Brand
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-[13px] transition-colors ${
                  isActive ? 'text-ink font-medium' : 'text-ink-3 hover:text-ink'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <NavIcon to="/search" label="Поиск">
            <Search size={15} className="text-ink-2" strokeWidth={1.5} />
          </NavIcon>
          <NavIcon to="/wishlist" label="Избранное" count={wishlistCount}>
            <Heart size={15} className="text-ink-2" strokeWidth={1.5} />
          </NavIcon>
          <NavIcon to="/cart" label="Корзина" count={itemCount}>
            <ShoppingBag size={15} className="text-ink-2" strokeWidth={1.5} />
          </NavIcon>

          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 glass-circle ml-1"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            {open
              ? <X size={15} className="text-ink-2" strokeWidth={1.5} />
              : <Menu size={15} className="text-ink-2" strokeWidth={1.5} />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-card mx-4 mb-3 px-6 py-6 flex flex-col gap-5">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-ink font-medium' : 'text-ink-3'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/brief"
            onClick={() => setOpen(false)}
            className="text-sm text-center py-3 glass-pill text-ink"
          >
            Обсудить проект
          </Link>
        </div>
      )}
    </header>
  )
}
