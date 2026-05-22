import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function BriefPage() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) {
      setError('Пожалуйста, заполните Имя и Телефон или email')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <>
      <Helmet>
        <title>Рассказать о проекте — Archittell</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-lg mx-auto px-6 py-10 md:py-16">
          <h1 className="text-2xl font-light text-ink mb-8">Рассказать о проекте</h1>

          {submitted ? (
            <div className="glass-card p-8 text-center flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <span className="text-emerald-700 text-xl">✓</span>
              </div>
              <h2 className="text-xl font-light text-ink">Спасибо!</h2>
              <p className="text-sm text-ink-3">Свяжемся в течение дня.</p>
              <Link
                to="/catalog"
                className="mt-2 text-sm text-ink border-b border-ink/30 pb-0.5 self-center"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя *"
                aria-label="Имя"
                className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4 bg-transparent focus:outline-none focus:border-ink transition-colors"
              />
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Телефон или email *"
                aria-label="Телефон или email"
                className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4 bg-transparent focus:outline-none focus:border-ink transition-colors"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Расскажите о проекте"
                aria-label="Расскажите о проекте"
                rows={4}
                className="border border-black/10 rounded-xl p-3 text-sm text-ink placeholder-ink-4 bg-white/60 focus:outline-none focus:border-ink transition-colors resize-none"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
                >
                  Отправить
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
