import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CTA from '../CTA'

describe('CTA section', () => {
  it('renders heading «Расскажите о проекте»', () => {
    render(
      <MemoryRouter>
        <CTA />
      </MemoryRouter>
    )
    expect(screen.getByText('Расскажите о проекте')).toBeInTheDocument()
  })

  it('CTA link points to /brief', () => {
    render(
      <MemoryRouter>
        <CTA />
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: /оставить заявку/i })
    expect(link).toHaveAttribute('href', '/brief')
  })
})
