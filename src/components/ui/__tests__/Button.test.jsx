import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from '../Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick} disabled>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('primary variant has dark background class', () => {
    const { container } = render(<Button variant="primary">P</Button>)
    expect(container.firstChild.className).toContain('bg-ink')
  })

  it('secondary variant has glass style', () => {
    const { container } = render(<Button variant="secondary">S</Button>)
    expect(container.firstChild.className).toContain('glass-pill')
  })

  it('defaults to primary variant', () => {
    const { container } = render(<Button>Default</Button>)
    expect(container.firstChild.className).toContain('bg-ink')
  })
})
