import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AccountPage from '../AccountPage'

function renderAccount() {
  return render(<MemoryRouter><AccountPage /></MemoryRouter>)
}

describe('AccountPage', () => {
  test('renders Личный кабинет heading', () => {
    renderAccount()
    expect(screen.getByRole('heading', { name: 'Личный кабинет' })).toBeInTheDocument()
  })

  test('has email input', () => {
    renderAccount()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  test('has Войти button', () => {
    renderAccount()
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument()
  })
})
