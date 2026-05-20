import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PhilosophyPage from '../PhilosophyPage'

function renderPhilosophy() {
  return render(<MemoryRouter><PhilosophyPage /></MemoryRouter>)
}

describe('PhilosophyPage', () => {
  test('renders heading', () => {
    renderPhilosophy()
    expect(screen.getByRole('heading', { name: 'О проекте' })).toBeInTheDocument()
  })

  test('CTA links to /brief', () => {
    renderPhilosophy()
    expect(screen.getByRole('link', { name: 'Начать' })).toHaveAttribute('href', '/brief')
  })
})
