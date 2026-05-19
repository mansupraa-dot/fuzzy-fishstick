import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import ProductPage from '../ProductPage'

function renderProduct(id = '1') {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  )
}

describe('ProductPage', () => {
  test('renders product name as heading', () => {
    renderProduct()
    expect(screen.getByRole('heading', { name: 'Диван Forma' })).toBeInTheDocument()
  })

  test('renders formatted price', () => {
    renderProduct()
    // price is 145000, formatted as "145 000 ₽" (ru-RU locale uses non-breaking space)
    expect(screen.getByText(/145/)).toBeInTheDocument()
  })

  test('renders color swatch buttons', () => {
    renderProduct()
    // Product 1 has colors: ['Серый', 'Бежевый', 'Графит', 'Синий']
    expect(screen.getByRole('button', { name: 'Серый' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Бежевый' })).toBeInTheDocument()
  })

  test('clicking В корзину changes button text to Добавлено', () => {
    renderProduct()
    const btn = screen.getByRole('button', { name: /в корзину/i })
    fireEvent.click(btn)
    expect(screen.getByRole('button', { name: /добавлено/i })).toBeInTheDocument()
  })

  test('renders Товар не найден for unknown id', () => {
    renderProduct('9999')
    expect(screen.getByText('Товар не найден')).toBeInTheDocument()
  })
})
