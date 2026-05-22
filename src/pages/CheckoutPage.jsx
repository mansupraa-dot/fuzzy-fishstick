import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Button from '../components/ui/Button'

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

export default function CheckoutPage() {
  const { items, total, dispatch } = useCart()
  const [step, setStep] = useState(1)
  const [contact, setContact] = useState({ name: '', phone: '', email: '' })
  const [delivery, setDelivery] = useState({ address: '', payment: 'card' })
  const [error, setError] = useState('')
  const [orderNum] = useState(() => Math.floor(100000 + Math.random() * 900000))

  useEffect(() => {
    if (step === 3) dispatch({ type: 'CLEAR' })
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleContactNext(e) {
    e.preventDefault()
    if (!contact.name.trim() || !contact.phone.trim()) {
      setError('Пожалуйста, заполните Имя и Телефон')
      return
    }
    setError('')
    setStep(2)
  }

  function handleOrder(e) {
    e.preventDefault()
    if (!delivery.address.trim()) {
      setError('Укажите адрес доставки')
      return
    }
    setError('')
    setStep(3)
  }

  if (items.length === 0 && step < 3) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-md mx-auto px-6 py-16 text-center">
          <p className="text-ink-3 mb-4">Корзина пуста</p>
          <Link to="/catalog" className="text-sm text-ink border-b border-ink/30 pb-0.5">
            Перейти в каталог
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Оформление заказа — Archittell</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-light text-ink mb-6">Оформление заказа</h1>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full text-xs flex items-center justify-center
                    ${step >= n ? 'bg-ink text-white' : 'bg-black/10 text-ink-4'}`}
                >
                  {n}
                </span>
                {n < 3 && (
                  <div className={`h-px w-10 ${step > n ? 'bg-ink' : 'bg-black/10'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <form onSubmit={handleContactNext} className="glass-card p-8 flex flex-col gap-5">
              <h2 className="text-base font-normal text-ink">Контактные данные</h2>
              <input
                placeholder="Имя *"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4
                  bg-transparent focus:outline-none focus:border-ink transition-colors"
                aria-label="Имя"
              />
              <input
                placeholder="Телефон *"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4
                  bg-transparent focus:outline-none focus:border-ink transition-colors"
                aria-label="Телефон"
              />
              <input
                placeholder="Email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4
                  bg-transparent focus:outline-none focus:border-ink transition-colors"
                aria-label="Email"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="flex justify-end">
                <Button type="submit" variant="primary">Далее →</Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOrder} className="glass-card p-8 flex flex-col gap-5">
              <h2 className="text-base font-normal text-ink">Доставка и оплата</h2>
              <textarea
                placeholder="Адрес доставки *"
                value={delivery.address}
                onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                rows={3}
                className="border border-black/10 rounded-xl p-3 text-sm text-ink placeholder-ink-4
                  bg-white/60 focus:outline-none focus:border-ink transition-colors resize-none"
                aria-label="Адрес доставки"
              />
              <div className="flex flex-col gap-3">
                <p className="text-xs text-ink-3 uppercase tracking-wider">Способ оплаты</p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={delivery.payment === 'card'}
                    onChange={(e) => setDelivery({ ...delivery, payment: e.target.value })}
                    aria-label="Банковская карта"
                  />
                  <span className="text-sm text-ink">Банковская карта</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="sbp"
                    checked={delivery.payment === 'sbp'}
                    onChange={(e) => setDelivery({ ...delivery, payment: e.target.value })}
                    aria-label="СБП"
                  />
                  <span className="text-sm text-ink">СБП</span>
                </label>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="flex justify-between items-center pt-2 border-t border-black/8">
                <span className="text-sm text-ink-3">
                  К оплате: <strong className="text-ink font-normal">{formatPrice(total)}</strong>
                </span>
              </div>
              <div className="flex gap-3 justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-ink-3 hover:text-ink transition-colors"
                >
                  ← Назад
                </button>
                <Button type="submit" variant="primary">Подтвердить →</Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="glass-card p-8 text-center flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <span className="text-emerald-700 text-xl">✓</span>
              </div>
              <h2 className="text-xl font-light text-ink">Заказ принят</h2>
              <p className="text-sm text-ink-3">
                Номер заказа: <strong className="text-ink font-normal">#{orderNum}</strong>
              </p>
              <p className="text-sm text-ink-3 leading-relaxed">
                Скоро свяжемся для подтверждения доставки и оплаты.
              </p>
              <Link
                to="/catalog"
                className="mt-4 text-sm text-ink border-b border-ink/30 pb-0.5 self-center"
              >
                Продолжить покупки
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
