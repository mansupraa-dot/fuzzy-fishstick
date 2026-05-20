import { render, screen } from '@testing-library/react'
import HowWeWork from '../HowWeWork'

describe('HowWeWork', () => {
  it('renders heading «Как это работает»', () => {
    render(<HowWeWork />)
    expect(screen.getByText('Как это работает')).toBeInTheDocument()
  })

  it('renders step numbers 01, 02, 03', () => {
    render(<HowWeWork />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
  })
})
