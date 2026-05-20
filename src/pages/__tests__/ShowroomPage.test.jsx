import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ShowroomPage from '../ShowroomPage'

function renderShowroom() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <ShowroomPage />
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('ShowroomPage', () => {
  test('renders heading', () => {
    renderShowroom()
    expect(screen.getByRole('heading', { name: 'Шоурум' })).toBeInTheDocument()
  })

  test('has Имя input', () => {
    renderShowroom()
    expect(screen.getByLabelText('Имя')).toBeInTheDocument()
  })

  test('has Телефон input', () => {
    renderShowroom()
    expect(screen.getByLabelText('Телефон')).toBeInTheDocument()
  })

  test('shows confirmation after valid submit', () => {
    renderShowroom()
    fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Анна' } })
    fireEvent.change(screen.getByLabelText('Телефон'), { target: { value: '+7 999 123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Записаться' }))
    expect(screen.getByText('Заявка принята!')).toBeInTheDocument()
  })
})
