import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../../context/CartContext'
import { WishlistProvider } from '../../../context/WishlistContext'
import { describe, it, expect } from 'vitest'
import Header from '../Header'

const wrap = (ui) =>
  render(
    <MemoryRouter>
      <CartProvider>
        <WishlistProvider>{ui}</WishlistProvider>
      </CartProvider>
    </MemoryRouter>
  )

describe('Header', () => {
  it('renders logo link', () => {
    wrap(<Header />)
    expect(screen.getByRole('link', { name: /brand/i })).toBeInTheDocument()
  })

  it('renders Каталог nav link', () => {
    wrap(<Header />)
    expect(screen.getByRole('link', { name: /каталог/i })).toBeInTheDocument()
  })

  it('renders cart icon link', () => {
    wrap(<Header />)
    expect(screen.getByRole('link', { name: /корзина/i })).toBeInTheDocument()
  })

  it('renders wishlist icon link', () => {
    wrap(<Header />)
    expect(screen.getByRole('link', { name: /избранное/i })).toBeInTheDocument()
  })
})
