import { Helmet } from 'react-helmet-async'

export default function AccountPage() {
  return (
    <>
      <Helmet>
        <title>Личный кабинет — Archittell</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-md mx-auto px-6 py-16">
          <h1 className="text-2xl font-light text-ink mb-8">Личный кабинет</h1>

          <div className="glass-card p-8 flex flex-col gap-5">
            <p className="text-sm text-ink-3">
              Войдите, чтобы просматривать историю заказов.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
              <input
                type="email"
                placeholder="Email"
                aria-label="Email"
                className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4
                  bg-transparent focus:outline-none focus:border-ink transition-colors"
              />
              <input
                type="password"
                placeholder="Пароль"
                aria-label="Пароль"
                className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4
                  bg-transparent focus:outline-none focus:border-ink transition-colors"
              />
              <button
                type="submit"
                className="self-end text-sm bg-ink text-white px-6 py-3 rounded-full
                  hover:bg-ink/85 transition-colors"
              >
                Войти
              </button>
            </form>
            <p className="text-xs text-ink-4 text-center">
              Аккаунты появятся в следующем обновлении.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
