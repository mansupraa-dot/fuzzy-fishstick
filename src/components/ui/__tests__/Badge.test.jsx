import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Badge from '../Badge'

describe('Badge', () => {
  it('renders text', () => {
    render(<Badge>В наличии</Badge>)
    expect(screen.getByText('В наличии')).toBeInTheDocument()
  })

  it('neutral variant is default', () => {
    const { container } = render(<Badge>text</Badge>)
    expect(container.firstChild.className).toContain('text-ink-3')
  })

  it('success variant applies green color', () => {
    const { container } = render(<Badge variant="success">Реализован</Badge>)
    expect(container.firstChild.className).toContain('text-emerald')
  })

  it('warning variant applies amber color', () => {
    const { container } = render(<Badge variant="warning">В реализации</Badge>)
    expect(container.firstChild.className).toContain('text-amber')
  })
})
