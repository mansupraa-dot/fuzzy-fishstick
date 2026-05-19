import { render, screen, fireEvent } from '@testing-library/react'
import { WishlistProvider, useWishlist } from '../../context/WishlistContext'

function Consumer() {
  const { count, isWishlisted, toggle } = useWishlist()
  return (
    <div>
      <span data-testid="count">{count}</span>
      <span data-testid="w1">{isWishlisted(1) ? 'yes' : 'no'}</span>
      <button onClick={() => toggle(1)}>toggle-1</button>
    </div>
  )
}

describe('WishlistContext', () => {
  test('initial count is 0', () => {
    render(<WishlistProvider><Consumer /></WishlistProvider>)
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  test('toggle adds product — count becomes 1, isWishlisted returns true', () => {
    render(<WishlistProvider><Consumer /></WishlistProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'toggle-1' }))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getByTestId('w1')).toHaveTextContent('yes')
  })

  test('toggling the same product twice removes it', () => {
    render(<WishlistProvider><Consumer /></WishlistProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'toggle-1' }))
    fireEvent.click(screen.getByRole('button', { name: 'toggle-1' }))
    expect(screen.getByTestId('count')).toHaveTextContent('0')
    expect(screen.getByTestId('w1')).toHaveTextContent('no')
  })
})
