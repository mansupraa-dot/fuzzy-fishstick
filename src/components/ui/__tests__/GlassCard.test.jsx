import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GlassCard from '../GlassCard'

describe('GlassCard', () => {
  it('renders children', () => {
    render(<GlassCard>Hello</GlassCard>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies glass-card class by default', () => {
    const { container } = render(<GlassCard>content</GlassCard>)
    expect(container.firstChild).toHaveClass('glass-card')
  })

  it('merges custom className', () => {
    const { container } = render(<GlassCard className="p-8">content</GlassCard>)
    expect(container.firstChild).toHaveClass('glass-card', 'p-8')
  })

  it('renders as a different element via as prop', () => {
    const { container } = render(<GlassCard as="section">content</GlassCard>)
    expect(container.firstChild.tagName).toBe('SECTION')
  })

  it('forwards additional props', () => {
    const { container } = render(<GlassCard data-testid="card">content</GlassCard>)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })
})
