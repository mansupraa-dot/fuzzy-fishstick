import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import { WishlistProvider, useWishlist } from '../../context/WishlistContext'
import WishlistPage from '../WishlistPage'

function renderWishlist() {
  return render(
    <CartProvider>
      <WishlistProvider>
        <MemoryRouter>
          <WishlistPage />
        </MemoryRouter>
      </WishlistProvider>
    </CartProvider>
  )
}

function WishlistWithItem() {
  const { toggle } = useWishlist()
  return (
    <>
      <button data-testid="add-btn" onClick={() => toggle(1)} />
      <WishlistPage />
    </>
  )
}
function renderWishlistWithItem() {
  const utils = render(
    <CartProvider>
      <WishlistProvider>
        <MemoryRouter>
          <WishlistWithItem />
        </MemoryRouter>
      </WishlistProvider>
    </CartProvider>
  )
  fireEvent.click(utils.getByTestId('add-btn'))
  return utils
}

describe('WishlistPage', () => {
  test('renders heading Избранное', () => {
    renderWishlist()
    expect(screen.getByRole('heading', { name: 'Избранное' })).toBeInTheDocument()
  })

  test('shows empty state when wishlist is empty', () => {
    renderWishlist()
    expect(screen.getByText('В избранном пока ничего нет')).toBeInTheDocument()
  })

  test('shows product card when wishlist has a product', () => {
    renderWishlistWithItem()
    // Product id=1 is "Диван Forma"
    expect(screen.getByText('Диван Forma')).toBeInTheDocument()
  })
})
