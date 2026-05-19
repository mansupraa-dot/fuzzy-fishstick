import { createContext, useContext, useState, useCallback } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([])

  const toggle = useCallback((productId) => {
    setItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }, [])

  const isWishlisted = useCallback((productId) => items.includes(productId), [items])

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}
