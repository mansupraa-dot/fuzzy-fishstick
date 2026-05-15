import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useCart } from '../context/CartContext'
import Reveal from '../components/ui/Reveal'

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

export default function CartPage() {
  const { items, promo, promoError, subtotal, discount, total, dispatch } = useCart()
  const [promoInput, setPromoInput] = useState('')

  function handleQty(cartId, qty) {
    dispatch({ type: 'UPDATE_QTY', cartId, qty })
  }

  function handleRemove(cartId) {
    dispatch({ type: 'REMOVE', cartId })
  }

  function handleApplyPromo(e) {
    e.preventDefault()
    dispatch({ type: 'APPLY_PROMO', code: promoInput })
  }

  return (
    <>
      <Helmet>
        <title>Корзина — Pufflux</title>
      </Helmet>

      <div className="pt-16 min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-3xl md:text-4xl font-light text-graphite mb-10">Корзина</h1>
          </Reveal>

          {items.length === 0 ? (
            <Reveal>
              <div className="py-24 flex flex-col items-center gap-6 text-center">
                <div className="w-16 h-16 border border-stone-200 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="1.5"
                  >
                    <path d="M6 2L3 6v12a1 1 0 001 1h12a1 1 0 001-1V6l-3-4z" />
                    <line x1="3" y1="6" x2="17" y2="6" />
                    <path d="M13 10a3 3 0 01-6 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-graphite font-medium mb-1">Корзина пуста</p>
                  <p className="text-stone-400 text-sm">Добавьте товары из каталога</p>
                </div>
                <div className="flex gap-4 flex-wrap justify-center">
                  <Link
                    to="/catalog/furniture"
                    className="text-sm border border-graphite text-graphite px-6 py-3 hover:bg-graphite hover:text-white transition-colors"
                  >
                    Мебель
                  </Link>
                  <Link
                    to="/catalog/lighting"
                    className="text-sm border border-graphite text-graphite px-6 py-3 hover:bg-graphite hover:text-white transition-colors"
                  >
                    Освещение
                  </Link>
                  <Link
                    to="/catalog/plumbing"
                    className="text-sm border border-graphite text-graphite px-6 py-3 hover:bg-graphite hover:text-white transition-colors"
                  >
                    Сантехника
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="grid md:grid-cols-[1fr_360px] gap-10 md:gap-16 items-start">
              {/* Cart items */}
              <div>
                <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 text-xs uppercase tracking-widest text-stone-400 pb-3 border-b border-stone-100 mb-2">
                  <span>Товар</span>
                  <span className="text-center w-28">Количество</span>
                  <span className="text-right w-28">Цена</span>
                  <span className="w-6" />
                </div>

                <div className="flex flex-col divide-y divide-stone-100">
                  {items.map((item) => (
                    <Reveal key={item.cartId}>
                      <div className="py-5 grid md:grid-cols-[1fr_auto_auto_auto] gap-4 items-center">
                        {/* Product info */}
                        <div className="flex gap-4 items-center">
                          <Link to={`/product/${item.product.id}`}>
                            <div className="w-16 h-16 bg-stone-100 shrink-0 overflow-hidden">
                              <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                                <span className="text-stone-400 text-[8px]">Фото</span>
                              </div>
                            </div>
                          </Link>
                          <div>
                            <Link
                              to={`/product/${item.product.id}`}
                              className="text-sm font-medium text-graphite hover:text-stone-500 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <div className="flex gap-2 mt-0.5">
                              {item.color && (
                                <span className="text-xs text-stone-400">{item.color}</span>
                              )}
                              {item.fabric && (
                                <span className="text-xs text-stone-400">· {item.fabric}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Qty controls */}
                        <div className="flex items-center border border-stone-200 w-fit md:w-28">
                          <button
                            onClick={() => handleQty(item.cartId, item.qty - 1)}
                            disabled={item.qty <= 1}
                            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-graphite disabled:opacity-30 transition-colors"
                          >
                            −
                          </button>
                          <span className="flex-1 text-center text-sm text-graphite min-w-[2rem]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => handleQty(item.cartId, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-graphite transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="text-sm font-medium text-graphite text-right md:w-28">
                          {formatPrice(item.product.price * item.qty)}
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(item.cartId)}
                          className="w-6 h-6 flex items-center justify-center text-stone-300 hover:text-graphite transition-colors"
                          aria-label="Удалить"
                        >
                          ×
                        </button>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center pt-4">
                  <Link
                    to="/"
                    className="text-sm text-stone-400 hover:text-graphite transition-colors border-b border-stone-200 pb-0.5"
                  >
                    ← Продолжить покупки
                  </Link>
                  <button
                    onClick={() => dispatch({ type: 'CLEAR' })}
                    className="text-xs text-stone-400 hover:text-graphite transition-colors"
                  >
                    Очистить корзину
                  </button>
                </div>
              </div>

              {/* Order summary */}
              <Reveal delay={100}>
                <div className="bg-cream p-6 md:p-8 sticky top-20">
                  <h2 className="text-base font-medium text-graphite mb-6">Итого</h2>

                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Товары</span>
                      <span className="text-graphite">{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-500">
                          Промокод ({promo.code} −{promo.discount}%)
                        </span>
                        <span className="text-green-700">−{formatPrice(discount)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-baseline py-4 border-t border-stone-200 mb-6">
                    <span className="text-base font-medium text-graphite">К оплате</span>
                    <span className="text-xl font-medium text-graphite">{formatPrice(total)}</span>
                  </div>

                  {/* Promo code */}
                  {!promo ? (
                    <form onSubmit={handleApplyPromo} className="flex gap-2 mb-6">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Промокод"
                        className="flex-1 border-b border-stone-300 py-2 text-sm text-graphite placeholder-stone-300 focus:outline-none focus:border-graphite transition-colors bg-transparent"
                      />
                      <button
                        type="submit"
                        className="text-sm text-graphite border-b border-graphite pb-2 hover:text-stone-500 transition-colors"
                      >
                        Применить
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between mb-6 py-2 px-3 bg-green-50 border border-green-200">
                      <span className="text-xs text-green-700">
                        {promo.code} — скидка {promo.discount}%
                      </span>
                      <button
                        onClick={() => dispatch({ type: 'CLEAR_PROMO' })}
                        className="text-xs text-stone-400 hover:text-graphite ml-3"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  {promoError && (
                    <p className="text-xs text-red-500 mb-4 -mt-4">{promoError}</p>
                  )}

                  <button className="w-full bg-graphite text-white text-sm py-4 hover:bg-stone-700 transition-colors">
                    Оформить заказ
                  </button>

                  <p className="text-xs text-stone-400 mt-4 text-center leading-relaxed">
                    Свяжемся для подтверждения в течение дня
                  </p>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
