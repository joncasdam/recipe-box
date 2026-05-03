import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRecipeStore } from '../stores/recipeStore'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

describe('useRecipeStore', () => {
  beforeEach(() => {
    localStorageMock.clear()
    setActivePinia(createPinia())
  })

  it('adds a new recipe with correct defaults', () => {
    const store = useRecipeStore()
    const initial = store.recipes.length

    store.addRecipe({
      title: 'Test Recept',
      category: 'Dessert',
      prepTime: 30,
      difficulty: 'Makkelijk',
      portions: 4,
      tags: 'test, recept',
      ingredients: [{ id: 'i1', quantity: '100', unit: 'g', name: 'bloem' }],
      steps: [{ id: 's1', text: 'Meng alles' }],
    })

    expect(store.recipes.length).toBe(initial + 1)
    const added = store.recipes[0]
    expect(added.title).toBe('Test Recept')
    expect(added.isFav).toBe(false)
    expect(added.id).toBeTruthy()
    expect(added.createdAt).toBeTruthy()
    expect(added.tags).toEqual(['test', 'recept'])
  })

  it('converts prepTime and portions to numbers on add', () => {
    const store = useRecipeStore()
    store.addRecipe({
      title: 'Num Test',
      category: 'Ontbijt',
      prepTime: '20' as unknown as number,
      difficulty: 'Makkelijk',
      portions: '2' as unknown as number,
      tags: '',
      ingredients: [],
      steps: [],
    })
    const added = store.recipes[0]
    expect(typeof added.prepTime).toBe('number')
    expect(typeof added.portions).toBe('number')
    expect(added.prepTime).toBe(20)
    expect(added.portions).toBe(2)
  })

  it('updates an existing recipe', () => {
    const store = useRecipeStore()
    store.addRecipe({ title: 'Oud', category: 'Dessert', prepTime: 10, difficulty: 'Makkelijk', portions: 2, tags: '', ingredients: [], steps: [] })
    const id = store.recipes[0].id

    store.updateRecipe(id, { title: 'Nieuw' })
    expect(store.recipes[0].title).toBe('Nieuw')
  })

  it('does nothing when updating non-existent recipe', () => {
    const store = useRecipeStore()
    const before = store.recipes.length
    store.updateRecipe('nonexistent', { title: 'X' })
    expect(store.recipes.length).toBe(before)
  })

  it('deletes a recipe by id', () => {
    const store = useRecipeStore()
    store.addRecipe({ title: 'To Delete', category: 'Drinks', prepTime: 5, difficulty: 'Makkelijk', portions: 1, tags: '', ingredients: [], steps: [] })
    const id = store.recipes[0].id
    const before = store.recipes.length

    store.deleteRecipe(id)
    expect(store.recipes.length).toBe(before - 1)
    expect(store.recipes.find(r => r.id === id)).toBeUndefined()
  })

  it('toggles favorite status', () => {
    const store = useRecipeStore()
    store.addRecipe({ title: 'Fav Test', category: 'Hoofdgerecht', prepTime: 20, difficulty: 'Gemiddeld', portions: 4, tags: '', ingredients: [], steps: [] })
    const id = store.recipes[0].id
    expect(store.recipes[0].isFav).toBe(false)

    store.toggleFav(id)
    expect(store.recipes[0].isFav).toBe(true)

    store.toggleFav(id)
    expect(store.recipes[0].isFav).toBe(false)
  })

  it('getById returns the correct recipe', () => {
    const store = useRecipeStore()
    store.addRecipe({ title: 'Find Me', category: 'Voorgerecht', prepTime: 15, difficulty: 'Makkelijk', portions: 3, tags: '', ingredients: [], steps: [] })
    const id = store.recipes[0].id

    const found = store.getById(id)
    expect(found).toBeDefined()
    expect(found?.title).toBe('Find Me')
  })

  it('getById returns undefined for missing id', () => {
    const store = useRecipeStore()
    expect(store.getById('ghost')).toBeUndefined()
  })

  it('persists to localStorage on change', async () => {
    const store = useRecipeStore()
    store.addRecipe({ title: 'Persist', category: 'Dessert', prepTime: 5, difficulty: 'Makkelijk', portions: 1, tags: '', ingredients: [], steps: [] })

    // Allow watcher to fire
    await new Promise(resolve => setTimeout(resolve, 0))

    const saved = localStorageMock.getItem('recipe-box-v1')
    expect(saved).toBeTruthy()
    const parsed = JSON.parse(saved!)
    expect(parsed.some((r: { title: string }) => r.title === 'Persist')).toBe(true)
  })
})

describe('useRecipeStore - filter logic', () => {
  beforeEach(() => {
    localStorageMock.clear()
    setActivePinia(createPinia())
  })

  it('stores multiple recipes and retrieves them all', () => {
    const store = useRecipeStore()
    const count = store.recipes.length
    store.addRecipe({ title: 'A', category: 'Dessert', prepTime: 10, difficulty: 'Makkelijk', portions: 2, tags: '', ingredients: [], steps: [] })
    store.addRecipe({ title: 'B', category: 'Ontbijt', prepTime: 5, difficulty: 'Makkelijk', portions: 1, tags: '', ingredients: [], steps: [] })
    expect(store.recipes.length).toBe(count + 2)
  })
})
