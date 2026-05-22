import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import HomePage from '../HomePage'

const Wrapper = ({ children }) => (
  <HelmetProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </HelmetProvider>
)

describe('HomePage', () => {
  it('renders without crash', () => {
    render(<HomePage />, { wrapper: Wrapper })
    expect(screen.getByText('Каталог')).toBeInTheDocument()
  })

  it('category links point to /catalog/furniture, /catalog/lighting, /catalog/plumbing', () => {
    render(<HomePage />, { wrapper: Wrapper })
    const links = screen.getAllByRole('link', { name: /мебель/i })
    const furnitureLink = links.find((link) => link.getAttribute('href') === '/catalog/furniture')
    expect(furnitureLink).toHaveAttribute('href', '/catalog/furniture')

    const lightingLinks = screen.getAllByRole('link', { name: /освещение/i })
    const lightingLink = lightingLinks.find((link) => link.getAttribute('href') === '/catalog/lighting')
    expect(lightingLink).toHaveAttribute('href', '/catalog/lighting')

    const plumbingLinks = screen.getAllByRole('link', { name: /сантехника/i })
    const plumbingLink = plumbingLinks.find((link) => link.getAttribute('href') === '/catalog/plumbing')
    expect(plumbingLink).toHaveAttribute('href', '/catalog/plumbing')
  })
})
