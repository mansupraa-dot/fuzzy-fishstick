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
  it('renders heading «Коллекции»', () => {
    render(<HomePage />, { wrapper: Wrapper })
    expect(screen.getByText('Коллекции')).toBeInTheDocument()
  })

  it('collection links point to /collections/:slug', () => {
    render(<HomePage />, { wrapper: Wrapper })
    const links = screen.getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('/collections/skandinavsky')
    expect(hrefs).toContain('/collections/minimalizm')
    expect(hrefs).toContain('/collections/japandi')
  })
})
