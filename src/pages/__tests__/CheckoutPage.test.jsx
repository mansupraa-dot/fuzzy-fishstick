import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider, useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'
import CheckoutPage from '../CheckoutPage'

function CheckoutWithItem() {
  const { dispatch } = useCart()
  return (
    <>
      <button
        data-testid="add-btn"
        onClick={() =>
          dispatch({ type: 'ADD', product: PRODUCTS[0], color: null, fabric: null })
        }
      />
      <CheckoutPage />
    </>
  )
}

function renderCheckout(populated = false) {
  const utils = render(
    <CartProvider>
      <MemoryRouter>
        {populated ? <CheckoutWithItem /> : <CheckoutPage />}
      </MemoryRouter>
    </CartProvider>
  )
  if (populated) {
    fireEvent.click(utils.getByTestId('add-btn'))
  }
  return utils
}

describe('CheckoutPage', () => {
  test('shows Корзина пуста when cart is empty', () => {
    renderCheckout()
    expect(screen.getByText('Корзина пуста')).toBeInTheDocument()
  })

  test('shows Оформление заказа heading when cart has items', () => {
    renderCheckout(true)
    expect(screen.getByRole('heading', { name: 'Оформление заказа' })).toBeInTheDocument()
  })

  test('step 1 shows Имя and Телефон inputs', () => {
    renderCheckout(true)
    expect(screen.getByLabelText('Имя')).toBeInTheDocument()
    expect(screen.getByLabelText('Телефон')).toBeInTheDocument()
  })

  test('filling step 1 and clicking Далее shows step 2 with address input', () => {
    renderCheckout(true)
    fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Анна' } })
    fireEvent.change(screen.getByLabelText('Телефон'), { target: { value: '+7 999 123 4567' } })
    fireEvent.click(screen.getByRole('button', { name: /далее/i }))
    expect(screen.getByLabelText('Адрес доставки')).toBeInTheDocument()
  })

  test('step 2 shows СБП radio option', () => {
    renderCheckout(true)
    fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Анна' } })
    fireEvent.change(screen.getByLabelText('Телефон'), { target: { value: '+7 999 123 4567' } })
    fireEvent.click(screen.getByRole('button', { name: /далее/i }))
    expect(screen.getByRole('radio', { name: 'СБП' })).toBeInTheDocument()
  })
})
