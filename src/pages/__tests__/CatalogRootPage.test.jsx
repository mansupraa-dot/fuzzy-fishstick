import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CatalogRootPage from '../CatalogRootPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <CatalogRootPage />
    </MemoryRouter>
  )
}

describe('CatalogRootPage', () => {
  test('renders page heading "Каталог"', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Каталог' })).toBeInTheDocument()
  })

  test('renders Мебель link to /catalog/furniture', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /мебель/i })
    expect(link).toHaveAttribute('href', '/catalog/furniture')
  })

  test('renders Освещение link to /catalog/lighting', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /освещение/i })
    expect(link).toHaveAttribute('href', '/catalog/lighting')
  })

  test('renders Сантехника link to /catalog/plumbing', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /сантехника/i })
    expect(link).toHaveAttribute('href', '/catalog/plumbing')
  })
})
