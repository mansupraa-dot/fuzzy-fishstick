import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import NavIcon from '../NavIcon'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('NavIcon', () => {
  it('renders as a link with aria-label', () => {
    wrap(<NavIcon to="/cart" label="Корзина"><span>icon</span></NavIcon>)
    expect(screen.getByRole('link', { name: 'Корзина' })).toBeInTheDocument()
  })

  it('does not show count bubble when count is 0', () => {
    wrap(<NavIcon to="/cart" label="Корзина" count={0}><span>icon</span></NavIcon>)
    expect(screen.queryByTestId('nav-count')).not.toBeInTheDocument()
  })

  it('shows count bubble when count > 0', () => {
    wrap(<NavIcon to="/cart" label="Корзина" count={3}><span>icon</span></NavIcon>)
    expect(screen.getByTestId('nav-count')).toHaveTextContent('3')
  })

  it('caps count display at 99+', () => {
    wrap(<NavIcon to="/cart" label="Корзина" count={150}><span>icon</span></NavIcon>)
    expect(screen.getByTestId('nav-count')).toHaveTextContent('99+')
  })
})
