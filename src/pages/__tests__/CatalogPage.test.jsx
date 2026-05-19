import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import { WishlistProvider } from '../../context/WishlistContext'
import CatalogPage from '../CatalogPage'

function renderCatalog(path = '/catalog/furniture') {
  return render(
    <CartProvider>
      <WishlistProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/catalog/:category" element={<CatalogPage />} />
          </Routes>
        </MemoryRouter>
      </WishlistProvider>
    </CartProvider>
  )
}

describe('CatalogPage', () => {
  test('renders category heading Мебель for furniture', () => {
    renderCatalog()
    expect(screen.getByRole('heading', { name: 'Мебель' })).toBeInTheDocument()
  })

  test('renders product cards for the category', () => {
    renderCatalog()
    expect(screen.getByText('Диван Forma')).toBeInTheDocument()
  })

  test('shows error message for unknown category', () => {
    renderCatalog('/catalog/unknown')
    expect(screen.getByText('Каталог не найден')).toBeInTheDocument()
  })

  test('renders subcategory filter buttons', () => {
    renderCatalog()
    expect(screen.getByRole('button', { name: 'Диваны' })).toBeInTheDocument()
  })

  test('renders sort select with default value popular', () => {
    renderCatalog()
    const select = screen.getByRole('combobox', { name: 'Сортировка' })
    expect(select).toBeInTheDocument()
    expect(select.value).toBe('popular')
  })

  test('sort select renders alongside subcategory filters', () => {
    renderCatalog()
    // Both subcategory pills and sort must coexist
    expect(screen.getByRole('button', { name: 'Диваны' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Сортировка' })).toBeInTheDocument()
  })
})
