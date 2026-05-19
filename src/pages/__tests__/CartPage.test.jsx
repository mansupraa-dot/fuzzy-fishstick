import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider, useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'
import CartPage from '../CartPage'

// Helper: renders CartPage with an empty cart
function renderCart() {
  return render(
    <CartProvider>
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    </CartProvider>
  )
}

// Helper: renders CartPage pre-populated with one item
function CartWithItem() {
  const { dispatch } = useCart()
  return (
    <>
      <button
        data-testid="add-btn"
        onClick={() =>
          dispatch({ type: 'ADD', product: PRODUCTS[0], color: 'Серый', fabric: 'Велюр' })
        }
      />
      <CartPage />
    </>
  )
}
function renderCartWithItem() {
  const utils = render(
    <CartProvider>
      <MemoryRouter>
        <CartWithItem />
      </MemoryRouter>
    </CartProvider>
  )
  fireEvent.click(utils.getByTestId('add-btn'))
  return utils
}

describe('CartPage', () => {
  test('renders Корзина heading', () => {
    renderCart()
    expect(screen.getByRole('heading', { name: 'Корзина' })).toBeInTheDocument()
  })

  test('shows empty state when cart is empty', () => {
    renderCart()
    expect(screen.getByText('Корзина пуста')).toBeInTheDocument()
  })

  test('shows product name when item is in cart', () => {
    renderCartWithItem()
    expect(screen.getByText('Диван Forma')).toBeInTheDocument()
  })

  test('Оформить заказ links to /checkout', () => {
    renderCartWithItem()
    const link = screen.getByRole('link', { name: /оформить заказ/i })
    expect(link).toHaveAttribute('href', '/checkout')
  })

  test('shows promo error for invalid code', () => {
    renderCartWithItem()
    const input = screen.getByPlaceholderText('Промокод')
    fireEvent.change(input, { target: { value: 'INVALID' } })
    fireEvent.submit(input.closest('form'))
    expect(screen.getByText('Промокод не найден')).toBeInTheDocument()
  })
})
