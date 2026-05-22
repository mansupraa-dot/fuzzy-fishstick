import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import DeliveryPage from '../DeliveryPage'

const Wrapper = ({ children }) => (
  <HelmetProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </HelmetProvider>
)

describe('DeliveryPage', () => {
  it('renders heading «Доставка и сборка»', () => {
    render(<DeliveryPage />, { wrapper: Wrapper })
    expect(screen.getByText('Доставка и сборка')).toBeInTheDocument()
  })

  it('CTA link points to /showroom', () => {
    render(<DeliveryPage />, { wrapper: Wrapper })
    const link = screen.getByRole('link', { name: /записаться в шоурум/i })
    expect(link).toHaveAttribute('href', '/showroom')
  })
})
