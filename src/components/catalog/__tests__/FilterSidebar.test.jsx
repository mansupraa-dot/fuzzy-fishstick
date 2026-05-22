import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import FilterSidebar from '../FilterSidebar'

const twoProducts = [
  { id: 1, price: 98000, colors: ['Серый', 'Бежевый'] },
  { id: 2, price: 145000, colors: ['Бежевый', 'Терракот'] },
]

function renderSidebar({
  products = twoProducts,
  minPrice = 98000,
  maxPrice = 145000,
  activeColors = [],
} = {}) {
  return render(
    <FilterSidebar
      products={products}
      minPrice={minPrice}
      maxPrice={maxPrice}
      activeColors={activeColors}
      onPriceChange={vi.fn()}
      onColorChange={vi.fn()}
      onReset={vi.fn()}
    />
  )
}

describe('FilterSidebar', () => {
  test('renders «Цена» heading', () => {
    renderSidebar()
    expect(screen.getByText('Цена')).toBeInTheDocument()
  })

  test('renders «Цвет» heading when products have colors', () => {
    renderSidebar()
    expect(screen.getByText('Цвет')).toBeInTheDocument()
  })

  test('«Сбросить фильтры» hidden when no active filters', () => {
    // minPrice=globalMin(98000), maxPrice=globalMax(145000), no colors → no active filter
    renderSidebar({ minPrice: 98000, maxPrice: 145000, activeColors: [] })
    expect(screen.queryByText('Сбросить фильтры')).not.toBeInTheDocument()
  })

  test('«Сбросить фильтры» visible when price filter is active', () => {
    // minPrice(100000) !== globalMin(98000) → filter is active
    renderSidebar({ minPrice: 100000, maxPrice: 145000 })
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument()
  })
})
