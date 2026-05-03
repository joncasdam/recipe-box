import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useRecipeFilter } from './useRecipeFilter'
import type { Recipe } from '../types'

function makeRecipe(overrides: Partial<Recipe>): Recipe {
  return {
    id: '1',
    title: 'Test Recipe',
    category: 'Hoofdgerecht',
    prepTime: 30,
    difficulty: 'Makkelijk',
    portions: 4,
    tags: [],
    ingredients: [],
    steps: [],
    isFav: false,
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

const RECIPES: Recipe[] = [
  makeRecipe({ id: '1', title: 'Chicken Curry', tags: ['spicy'], ingredients: [{ id: 'i1', quantity: '200', unit: 'g', name: 'chicken' }] }),
  makeRecipe({ id: '2', title: 'Chocolate Cake', tags: ['dessert'], ingredients: [{ id: 'i2', quantity: '100', unit: 'g', name: 'chocolate' }] }),
  makeRecipe({ id: '3', title: 'Pasta Bolognese', tags: ['italian'], ingredients: [{ id: 'i3', quantity: '300', unit: 'g', name: 'minced beef' }] }),
  makeRecipe({ id: '4', title: 'Tomato Soup', tags: ['vegetarian', 'soup'], ingredients: [{ id: 'i4', quantity: '4', unit: 'stuks', name: 'tomato' }], prepTime: 20, isFav: true }),
]

describe('useRecipeFilter – search', () => {
  it('returns all recipes when search is empty', () => {
    const { filtered } = useRecipeFilter(ref(RECIPES))
    expect(filtered.value).toHaveLength(RECIPES.length)
  })

  it('matches by title', () => {
    const { filters, filtered } = useRecipeFilter(ref(RECIPES))
    filters.value.search = 'pasta'
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0].id).toBe('3')
  })

  it('matches by tag', () => {
    const { filters, filtered } = useRecipeFilter(ref(RECIPES))
    filters.value.search = 'italian'
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0].id).toBe('3')
  })

  it('matches by ingredient name', () => {
    const { filters, filtered } = useRecipeFilter(ref(RECIPES))
    filters.value.search = 'chocolate'
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0].id).toBe('2')
  })

  it('matches multiple words independently (OR logic)', () => {
    const { filters, filtered } = useRecipeFilter(ref(RECIPES))
    filters.value.search = 'chicken chocolate'
    const ids = filtered.value.map(r => r.id).sort()
    expect(ids).toEqual(['1', '2'])
  })

  it('strips stop words before matching', () => {
    const { filters, filtered } = useRecipeFilter(ref(RECIPES))
    filters.value.search = 'What can I make with chicken'
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0].id).toBe('1')
  })

  it('returns nothing when only stop words are entered', () => {
    const { filters, filtered } = useRecipeFilter(ref(RECIPES))
    filters.value.search = 'can i make with a the'
    expect(filtered.value).toHaveLength(RECIPES.length)
  })

  it('is case-insensitive', () => {
    const { filters, filtered } = useRecipeFilter(ref(RECIPES))
    filters.value.search = 'TOMATO'
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0].id).toBe('4')
  })
})

describe('useRecipeFilter – other filters', () => {
  it('filters by favOnly', () => {
    const { filters, filtered } = useRecipeFilter(ref(RECIPES))
    filters.value.favOnly = true
    expect(filtered.value).toHaveLength(1)
    expect(filtered.value[0].id).toBe('4')
  })

  it('filters by category', () => {
    const { filters, filtered } = useRecipeFilter(ref(RECIPES))
    filters.value.category = 'Hoofdgerecht'
    expect(filtered.value).toHaveLength(RECIPES.length)
  })

  it('filters by maxTime', () => {
    const { filters, filtered } = useRecipeFilter(ref(RECIPES))
    filters.value.maxTime = 20
    expect(filtered.value.every(r => r.prepTime <= 20)).toBe(true)
  })
})

describe('useRecipeFilter – reset', () => {
  it('resetFilters clears all active filters', () => {
    const { filters, filtered, resetFilters, hasActiveFilters } = useRecipeFilter(ref(RECIPES))
    filters.value.search = 'chicken'
    filters.value.favOnly = true
    expect(hasActiveFilters.value).toBe(true)

    resetFilters()
    expect(filters.value.search).toBe('')
    expect(filters.value.favOnly).toBe(false)
    expect(filtered.value).toHaveLength(RECIPES.length)
    expect(hasActiveFilters.value).toBe(false)
  })
})
