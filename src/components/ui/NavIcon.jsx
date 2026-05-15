import { Link } from 'react-router-dom'

export default function NavIcon({ to, label, count = 0, className = '', children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={`relative flex items-center justify-center w-8 h-8 glass-circle
        hover:-translate-y-0.5 transition-transform duration-200 ${className}`}
    >
      {children}
      {count > 0 && (
        <span
          data-testid="nav-count"
          className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-accent text-white
            text-[9px] font-medium rounded-full flex items-center justify-center px-1"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}
