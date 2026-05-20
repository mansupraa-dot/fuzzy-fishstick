import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProcessPage from '../ProcessPage'

function renderProcess() {
  return render(<MemoryRouter><ProcessPage /></MemoryRouter>)
}

describe('ProcessPage', () => {
  test('renders heading', () => {
    renderProcess()
    expect(screen.getByRole('heading', { name: 'Как это работает' })).toBeInTheDocument()
  })

  test('CTA links to /brief', () => {
    renderProcess()
    expect(screen.getByRole('link', { name: 'Обсудить проект' })).toHaveAttribute('href', '/brief')
  })
})
