import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ServicesPage from '../ServicesPage'

function renderServices() {
  return render(<MemoryRouter><ServicesPage /></MemoryRouter>)
}

describe('ServicesPage', () => {
  test('renders heading', () => {
    renderServices()
    expect(screen.getByRole('heading', { name: 'Подбор, а не продажа' })).toBeInTheDocument()
  })

  test('CTA links to /brief', () => {
    renderServices()
    expect(screen.getByRole('link', { name: 'Обсудить проект' })).toHaveAttribute('href', '/brief')
  })
})
