import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PortfolioItemPage from '../PortfolioItemPage'

function renderItem(slug = 'studiya-petrogradskaya') {
  return render(
    <MemoryRouter initialEntries={[`/portfolio/${slug}`]}>
      <Routes>
        <Route path="/portfolio/:slug" element={<PortfolioItemPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('PortfolioItemPage', () => {
  test('renders project title for valid slug', () => {
    renderItem()
    expect(
      screen.getByRole('heading', { name: 'Студия на Петроградской' })
    ).toBeInTheDocument()
  })

  test('renders Проект не найден for unknown slug', () => {
    renderItem('unknown-slug')
    expect(screen.getByText('Проект не найден')).toBeInTheDocument()
  })

  test('CTA links to /brief for valid slug', () => {
    renderItem()
    expect(screen.getByRole('link', { name: 'Обсудить проект' })).toHaveAttribute(
      'href',
      '/brief'
    )
  })
})
