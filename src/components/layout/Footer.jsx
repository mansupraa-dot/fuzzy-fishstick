import { Link } from 'react-router-dom'

const LINKS = [
  ['Услуги', '/services'],
  ['Портфолио', '/portfolio'],
  ['Как работаем', '/process'],
  ['Блог', '/blog'],
  ['Контакт', '/contact'],
]

export default function Footer() {
  return (
    <footer className="bg-graphite text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <div className="text-xl font-semibold tracking-tight mb-4">Pufflux</div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Архитектурный подбор мебели, освещения и сантехники для квартир в Санкт-Петербурге.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-white/30 mb-5">Разделы</div>
            <nav className="flex flex-col gap-3">
              {LINKS.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-white/55 hover:text-white transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-white/30 mb-5">Контакты</div>
            <div className="flex flex-col gap-3 text-sm text-white/55">
              <span>Санкт-Петербург</span>
              <a href="tel:+78121234567" className="hover:text-white transition-colors w-fit">
                +7 (812) 123-45-67
              </a>
              <a href="mailto:hello@pufflux.ru" className="hover:text-white transition-colors w-fit">
                hello@pufflux.ru
              </a>
              <div className="flex gap-5 mt-2">
                <a href="https://t.me/pufflux" className="hover:text-white transition-colors">
                  Telegram
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-xs text-white/25">© 2024 Pufflux. Все права защищены.</span>
          <span className="text-xs text-white/25">
            Подбор мебели, освещения и сантехники в Санкт-Петербурге
          </span>
        </div>
      </div>
    </footer>
  )
}
