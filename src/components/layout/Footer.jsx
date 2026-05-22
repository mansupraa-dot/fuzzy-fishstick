import { Link } from 'react-router-dom'

const CATALOG_LINKS = [
  ['Мебель', '/catalog/furniture'],
  ['Освещение', '/catalog/lighting'],
  ['Сантехника', '/catalog/plumbing'],
  ['Коллекции', '/collections'],
]

const SERVICE_LINKS = [
  ['Дизайн-проект', '/services'],
  ['Как работаем', '/process'],
  ['Шоурум', '/showroom'],
  ['Рассказать о проекте', '/brief'],
]

const BRAND_LINKS = [
  ['О нас', '/philosophy'],
  ['Портфолио', '/portfolio'],
]

const HELP_LINKS = [
  ['Доставка', '/delivery'],
  ['Возврат', '/return'],
  ['Контакты', '/contact'],
]

export default function Footer() {
  return (
    <footer className="bg-white/50 border-t border-white/80 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">

          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-5">Каталог</div>
            <nav className="flex flex-col gap-3">
              {CATALOG_LINKS.map(([label, to]) => (
                <Link key={to} to={to} className="text-sm text-ink-3 hover:text-ink transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-5">Услуги</div>
            <nav className="flex flex-col gap-3">
              {SERVICE_LINKS.map(([label, to]) => (
                <Link key={to} to={to} className="text-sm text-ink-3 hover:text-ink transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-5">О бренде</div>
            <nav className="flex flex-col gap-3">
              {BRAND_LINKS.map(([label, to]) => (
                <Link key={to} to={to} className="text-sm text-ink-3 hover:text-ink transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-5">Помощь</div>
            <nav className="flex flex-col gap-3">
              {HELP_LINKS.map(([label, to]) => (
                <Link key={to} to={to} className="text-sm text-ink-3 hover:text-ink transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Email subscribe */}
        <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center
          justify-between gap-6 mb-12">
          <div>
            <div className="text-sm font-medium text-ink mb-1">Новинки и подборки</div>
            <div className="text-[13px] text-ink-3">Раз в месяц — новые товары и кураторские коллекции.</div>
          </div>
          <form
            className="flex gap-2 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.ru"
              className="flex-1 md:w-52 px-4 py-2.5 text-sm bg-white/60 border border-white/90
                rounded-full outline-none focus:bg-white/80 transition-colors text-ink
                placeholder:text-ink-4"
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-sm bg-ink text-white rounded-full
                hover:bg-ink/85 transition-colors whitespace-nowrap"
            >
              Подписаться
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-[11px] text-ink-4">© 2026 Archittell. Все права защищены.</span>
          <div className="flex items-center gap-5">
            <a href="https://t.me/" className="text-[11px] text-ink-4 hover:text-ink transition-colors">
              Telegram
            </a>
            <a href="#" className="text-[11px] text-ink-4 hover:text-ink transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
