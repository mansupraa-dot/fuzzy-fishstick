import { COLLECTIONS, getCollectionBySlug } from '../collections'

describe('collections data', () => {
  it('exports 3 collections', () => {
    expect(COLLECTIONS).toHaveLength(3)
  })

  it('getCollectionBySlug returns correct collection', () => {
    const c = getCollectionBySlug('minimalizm')
    expect(c).toBeDefined()
    expect(c.title).toBe('Минимализм')
  })
})
