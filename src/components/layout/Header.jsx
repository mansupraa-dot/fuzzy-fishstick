import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const NAV = [
  { to: '/catalog/furniture', label: 'Мебель' },
  { to: '/catalog/lighting', label: 'Освещение' },
  { to: '/catalog/plumbing', label: 'Сантехника' },
  { to: '/services', label: 'Услуги' },
  { to: '/contact', label: 'Контакт' },
]

function CartIcon({ scrolled }) {
  const { itemCount } = useCart()
  return (
    <Link
      to="/cart"
      className={`relative flex items-center justify-center w-9 h-9 transition-colors ${
        scrolled ? 'text-graphite hover:text-stone-500' : 'text-white hover:text-white/70'
      }`}
      aria-label="Корзина"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2L3 6v12a1 1 0 001 1h12a1 1 0 001-1V6l-3-4z" />
        <line x1="3" y1="6" x2="17" y2="6" />
        <path d="M13 10a3 3 0 01-6 0" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-accent text-white text-[10px] font-medium rounded-full flex items-center justify-center px-1 leading-none">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-sm border-b border-stone-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className={`text-lg font-semibold tracking-tight transition-colors ${
            scrolled ? 'text-graphite' : 'text-white'
          }`}
        >
          Pufflux
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? scrolled
                      ? 'text-graphite font-medium'
                      : 'text-white font-medium'
                    : scrolled
                    ? 'text-stone-500 hover:text-graphite'
                    : 'text-white/70 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <CartIcon scrolled={scrolled} />

          <Link
            to="/contact"
            className={`hidden md:block text-sm px-5 py-2.5 transition-all border ${
              scrolled
                ? 'border-graphite text-graphite hover:bg-graphite hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-graphite'
            }`}
          >
            Обсудить проект
          </Link>

          {/* Burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setOpen(!open)}
            aria-label="Открыть меню"
          >
            <span
              className={`block w-5 h-px transition-all origin-center ${
                open ? 'rotate-45 translate-y-[5px]' : ''
              } ${scrolled ? 'bg-graphite' : 'bg-white'}`}
            />
            <span
              className={`block w-5 h-px transition-all ${open ? 'opacity-0' : ''} ${
                scrolled ? 'bg-graphite' : 'bg-white'
              }`}
            />
            <span
              className={`block w-5 h-px transition-all origin-center ${
                open ? '-rotate-45 -translate-y-[5px]' : ''
              } ${scrolled ? 'bg-graphite' : 'bg-white'}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-6 flex flex-col gap-5">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-graphite font-medium' : 'text-stone-500'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="text-sm border border-graphite text-graphite px-5 py-3 text-center"
          >
            Обсудить проект
          </Link>
        </div>
      )}
    </header>
  )
}
