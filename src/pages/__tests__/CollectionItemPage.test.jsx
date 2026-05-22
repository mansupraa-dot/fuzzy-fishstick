import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { CartProvider } from '../../context/CartContext'
import { WishlistProvider } from '../../context/WishlistContext'
import CollectionItemPage from '../CollectionItemPage'

function renderCollection(slug) {
  return render(
    <HelmetProvider>
      <CartProvider>
        <WishlistProvider>
          <MemoryRouter initialEntries={[`/collections/${slug}`]}>
            <Routes>
              <Route path="/collections/:slug" element={<CollectionItemPage />} />
            </Routes>
          </MemoryRouter>
        </WishlistProvider>
      </CartProvider>
    </HelmetProvider>
  )
}

describe('CollectionItemPage', () => {
  it('renders collection title for known slug', () => {
    renderCollection('skandinavsky')
    expect(screen.getByText('Скандинавский интерьер')).toBeInTheDocument()
  })

  it('renders «Коллекция не найдена» for unknown slug', () => {
    renderCollection('unknown-slug')
    expect(screen.getByText('Коллекция не найдена')).toBeInTheDocument()
  })

  it('renders at least one category heading', () => {
    renderCollection('skandinavsky')
    // skandinavsky has furniture(1,5,6), lighting(8,12), plumbing(16,18)
    expect(screen.getByText('Мебель')).toBeInTheDocument()
  })
})
