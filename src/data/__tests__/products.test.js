import { sortProducts } from '../products'

const sample = [
  { id: 1, price: 100, isPopular: false },
  { id: 2, price: 50, isPopular: true },
  { id: 3, price: 200, isPopular: false },
]

describe('sortProducts', () => {
  test('price_asc sorts ascending by price', () => {
    const sorted = sortProducts(sample, 'price_asc')
    expect(sorted.map((p) => p.price)).toEqual([50, 100, 200])
  })

  test('price_desc sorts descending by price', () => {
    const sorted = sortProducts(sample, 'price_desc')
    expect(sorted.map((p) => p.price)).toEqual([200, 100, 50])
  })

  test('popular puts isPopular=true items first', () => {
    const sorted = sortProducts(sample, 'popular')
    expect(sorted[0].id).toBe(2)
  })

  test('does not mutate the original array', () => {
    const copy = [...sample]
    sortProducts(sample, 'price_asc')
    expect(sample).toEqual(copy)
  })
})
