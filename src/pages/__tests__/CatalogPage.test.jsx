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

  test('price filter removes products outside range', () => {
    // furniture prices: Forma 145000, Arco 98000, Plano 210000, Linea 89000, Nord 65000, Slab 72000, Rondo 28000
    // range 140000–150000 → only Forma (145000) passes
    renderCatalog('/catalog/furniture?minPrice=140000&maxPrice=150000')
    expect(screen.getByText('Диван Forma')).toBeInTheDocument()
    expect(screen.queryByText('Диван Arco')).not.toBeInTheDocument()
    expect(screen.queryByText('Диван Plano модульный')).not.toBeInTheDocument()
  })

  test('color filter removes products without matching color', () => {
    // sofas: Forma has 'Серый', Arco ['Бежевый','Терракот','Оливковый'], Plano has 'Серый'
    // %D0%A1%D0%B5%D1%80%D1%8B%D0%B9 = percent-encoded 'Серый'
    renderCatalog('/catalog/furniture?sub=sofas&colors=%D0%A1%D0%B5%D1%80%D1%8B%D0%B9')
    expect(screen.getByText('Диван Forma')).toBeInTheDocument()
    expect(screen.queryByText('Диван Arco')).not.toBeInTheDocument()
  })
})
