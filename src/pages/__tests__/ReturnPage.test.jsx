import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ReturnPage from '../ReturnPage'

const Wrapper = ({ children }) => (
  <HelmetProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </HelmetProvider>
)

describe('ReturnPage', () => {
  it('renders heading «Возврат и обмен»', () => {
    render(<ReturnPage />, { wrapper: Wrapper })
    expect(screen.getByText('Возврат и обмен')).toBeInTheDocument()
  })

  it('CTA link points to /brief', () => {
    render(<ReturnPage />, { wrapper: Wrapper })
    const link = screen.getByRole('link', { name: /связаться с нами/i })
    expect(link).toHaveAttribute('href', '/brief')
  })
})
