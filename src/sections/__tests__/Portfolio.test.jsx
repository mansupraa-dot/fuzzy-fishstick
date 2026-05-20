import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Portfolio from '../Portfolio'

describe('Portfolio section', () => {
  it('renders heading «Портфолио»', () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    )
    expect(screen.getByText('Портфолио')).toBeInTheDocument()
  })

  it('shows at least one «Реализован» badge', () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    )
    expect(screen.getAllByText('Реализован').length).toBeGreaterThan(0)
  })
})
