import { describe, it, expect } from 'vitest'
import { normalizeTags } from './tags'

describe('normalizeTags', () => {
  it('splits a comma-separated string into trimmed tags', () => {
    expect(normalizeTags('pasta, italian, quick')).toEqual(['pasta', 'italian', 'quick'])
  })

  it('trims whitespace around each tag', () => {
    expect(normalizeTags('  vegan ,  gluten-free  ')).toEqual(['vegan', 'gluten-free'])
  })

  it('filters out empty entries from extra commas', () => {
    expect(normalizeTags('soup,,stew,')).toEqual(['soup', 'stew'])
  })

  it('returns an empty array for an empty string', () => {
    expect(normalizeTags('')).toEqual([])
  })

  it('returns a string with no commas as a single-element array', () => {
    expect(normalizeTags('dessert')).toEqual(['dessert'])
  })

  it('passes an array through unchanged', () => {
    const tags = ['breakfast', 'healthy']
    expect(normalizeTags(tags)).toBe(tags)
  })

  it('passes an empty array through unchanged', () => {
    expect(normalizeTags([])).toEqual([])
  })
})
