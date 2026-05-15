import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

const PROMO_CODES = {
  PUFFLUX10: 10,
  DESIGN15: 15,
}

function makeCartId(productId, color, fabric) {
  return `${productId}_${color || ''}_${fabric || ''}`
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const cartId = makeCartId(action.product.id, action.color, action.fabric)
      const existing = state.items.find((i) => i.cartId === cartId)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            cartId,
            product: action.product,
            color: action.color,
            fabric: action.fabric,
            qty: 1,
          },
        ],
      }
    }

    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.cartId !== action.cartId) }

    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.cartId ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      }

    case 'APPLY_PROMO': {
      const discount = PROMO_CODES[action.code.trim().toUpperCase()]
      if (discount) {
        return {
          ...state,
          promo: { code: action.code.trim().toUpperCase(), discount },
          promoError: null,
        }
      }
      return { ...state, promo: null, promoError: 'Промокод не найден' }
    }

    case 'CLEAR_PROMO':
      return { ...state, promo: null, promoError: null }

    case 'CLEAR':
      return { ...state, items: [], promo: null, promoError: null }

    default:
      return state
  }
}

const initialState = { items: [], promo: null, promoError: null }

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0)

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.qty,
    0
  )

  const discount = state.promo ? Math.round(subtotal * (state.promo.discount / 100)) : 0
  const total = subtotal - discount

  return (
    <CartContext.Provider value={{ ...state, itemCount, subtotal, discount, total, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
