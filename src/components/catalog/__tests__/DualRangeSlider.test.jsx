import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import DualRangeSlider from '../DualRangeSlider'

describe('DualRangeSlider', () => {
  test('renders two range inputs', () => {
    const { container } = render(
      <DualRangeSlider
        min={3200}
        max={210000}
        valueMin={3200}
        valueMax={210000}
        onChange={vi.fn()}
      />
    )
    expect(container.querySelectorAll('input[type="range"]')).toHaveLength(2)
  })

  test('calls onChange with updated min when min input changes', () => {
    const onChange = vi.fn()
    const { container } = render(
      <DualRangeSlider
        min={3200}
        max={210000}
        valueMin={3200}
        valueMax={210000}
        onChange={onChange}
      />
    )
    const [minInput] = container.querySelectorAll('input[type="range"]')
    fireEvent.change(minInput, { target: { value: '50000' } })
    expect(onChange).toHaveBeenCalledWith(50000, 210000)
  })
})
