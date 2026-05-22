import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Reveal from '../components/ui/Reveal'

export default function ShowroomPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError('Пожалуйста, заполните Имя и Телефон')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <>
      <Helmet>
        <title>Шоурум — Archittell</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-10">Шоурум</h1>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Info */}
            <Reveal>
              <div>
                <div className="glass-card p-8 mb-6">
                  <p className="text-[10px] uppercase tracking-widest text-ink-4 mb-4">Адрес</p>
                  <p className="text-sm text-ink mb-6">Санкт-Петербург, ул. Примерная, 1</p>
                  <p className="text-[10px] uppercase tracking-widest text-ink-4 mb-4">
                    Часы работы
                  </p>
                  <p className="text-sm text-ink">Пн–Пт 10:00–19:00</p>
                  <p className="text-sm text-ink">Сб 11:00–17:00</p>
                </div>
                <p className="text-sm text-ink-3 leading-relaxed">
                  Здесь вы можете увидеть образцы материалов — ткани, дерево, металл — и обсудить
                  проект лично.
                </p>
              </div>
            </Reveal>

            {/* Booking form */}
            <Reveal delay={80}>
              <div>
                <h2 className="text-base font-normal text-ink mb-6">Записаться на визит</h2>
                {submitted ? (
                  <div className="glass-card p-8 text-center flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                      <span className="text-emerald-700">✓</span>
                    </div>
                    <p className="text-sm text-ink">Заявка принята!</p>
                    <p className="text-sm text-ink-3">
                      Свяжемся для подтверждения в течение дня.
                    </p>
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Телефон *"
                      aria-label="Телефон"
                      className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4 bg-transparent focus:outline-none focus:border-ink transition-colors"
                    />
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="Удобное время (необязательно)"
                      aria-label="Удобное время"
                      className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4 bg-transparent focus:outline-none focus:border-ink transition-colors"
                    />
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
                      >
                        Записаться
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
