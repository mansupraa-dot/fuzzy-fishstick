import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import CollectionsPage from '../CollectionsPage'

const Wrapper = ({ children }) => (
  <HelmetProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </HelmetProvider>
)

describe('CollectionsPage', () => {
  it('renders heading «Коллекции»', () => {
    render(<CollectionsPage />, { wrapper: Wrapper })
    expect(screen.getByText('Коллекции')).toBeInTheDocument()
  })

  it('renders links to all three collections', () => {
    render(<CollectionsPage />, { wrapper: Wrapper })
    const links = screen.getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('/collections/skandinavsky')
    expect(hrefs).toContain('/collections/minimalizm')
    expect(hrefs).toContain('/collections/japandi')
  })
})
