import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PortfolioPage from '../PortfolioPage'

function renderPortfolio() {
  return render(<MemoryRouter><PortfolioPage /></MemoryRouter>)
}

describe('PortfolioPage', () => {
  test('renders heading', () => {
    renderPortfolio()
    expect(screen.getByRole('heading', { name: 'Портфолио' })).toBeInTheDocument()
  })

  test('shows at least one Реализован status badge', () => {
    renderPortfolio()
    expect(screen.getAllByText('Реализован').length).toBeGreaterThan(0)
  })
})
