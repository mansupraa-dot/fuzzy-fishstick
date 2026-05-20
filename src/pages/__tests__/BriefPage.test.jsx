import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BriefPage from '../BriefPage'

function renderBrief() {
  return render(<MemoryRouter><BriefPage /></MemoryRouter>)
}

describe('BriefPage', () => {
  test('renders heading', () => {
    renderBrief()
    expect(screen.getByRole('heading', { name: 'Рассказать о проекте' })).toBeInTheDocument()
  })

  test('has Имя input', () => {
    renderBrief()
    expect(screen.getByLabelText('Имя')).toBeInTheDocument()
  })

  test('has Телефон или email input', () => {
    renderBrief()
    expect(screen.getByLabelText('Телефон или email')).toBeInTheDocument()
  })

  test('shows error on submit with empty required fields', () => {
    renderBrief()
    fireEvent.click(screen.getByRole('button', { name: 'Отправить' }))
    expect(screen.getByText(/заполните/i)).toBeInTheDocument()
  })

  test('shows confirmation after valid submit', () => {
    renderBrief()
    fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Анна' } })
    fireEvent.change(screen.getByLabelText('Телефон или email'), {
      target: { value: '+7 999 123 45 67' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Отправить' }))
    expect(screen.getByText('Спасибо!')).toBeInTheDocument()
  })
})
