import { describe, test, expect } from 'vitest'
import { PROJECTS, getProjectBySlug } from '../../data/portfolio'

describe('portfolio data', () => {
  test('PROJECTS has 6 items', () => {
    expect(PROJECTS).toHaveLength(6)
  })

  test('getProjectBySlug returns correct project', () => {
    const p = getProjectBySlug('studiya-petrogradskaya')
    expect(p).toBeDefined()
    expect(p.title).toBe('Студия на Петроградской')
  })

  test('getProjectBySlug returns undefined for unknown slug', () => {
    expect(getProjectBySlug('unknown-slug')).toBeUndefined()
  })
})
