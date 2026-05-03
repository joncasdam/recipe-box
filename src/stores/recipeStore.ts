import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Recipe, RecipeFormData } from '../types'
import { SAMPLE_RECIPES } from '../data/sampleRecipes'

const STORAGE_KEY = 'recipe-box-v1'

function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

function loadFromStorage(): Recipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Recipe[]
  } catch(e) {
    console.error('Niets gevonden op localStorage')
  }
  return SAMPLE_RECIPES
}

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>(loadFromStorage())

  // Persist to localStorage on change
  watch(recipes, (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      // storage may be full
    }
  }, { deep: true })

  function addRecipe(data: RecipeFormData): Recipe {
    const newRecipe: Recipe = {
      ...data,
      id: uid(),
      category: data.category as Recipe['category'],
      difficulty: data.difficulty as Recipe['difficulty'],
      prepTime: Number(data.prepTime),
      portions: Number(data.portions),
      tags: typeof data.tags === 'string'
        ? data.tags.split(',').map(t => t.trim()).filter(Boolean)
        : data.tags,
      isFav: false,
      createdAt: new Date().toISOString().split('T')[0],
    }
    recipes.value.unshift(newRecipe)
    return newRecipe
  }

  function updateRecipe(id: string, data: Partial<RecipeFormData>): void {
    const idx = recipes.value.findIndex(r => r.id === id)
    if (idx === -1) return
    const existing = recipes.value[idx]
    recipes.value[idx] = {
      ...existing,
      ...data,
      category: (data.category || existing.category) as Recipe['category'],
      difficulty: (data.difficulty || existing.difficulty) as Recipe['difficulty'],
      prepTime: data.prepTime !== undefined ? Number(data.prepTime) : existing.prepTime,
      portions: data.portions !== undefined ? Number(data.portions) : existing.portions,
      tags: typeof data.tags === 'string'
        ? data.tags.split(',').map(t => t.trim()).filter(Boolean)
        : (data.tags ?? existing.tags),
    }
  }

  function deleteRecipe(id: string): void {
    recipes.value = recipes.value.filter(r => r.id !== id)
  }

  function toggleFav(id: string): void {
    const recipe = recipes.value.find(r => r.id === id)
    if (recipe) recipe.isFav = !recipe.isFav
  }

  function getById(id: string): Recipe | undefined {
    return recipes.value.find(r => r.id === id)
  }

  return { recipes, addRecipe, updateRecipe, deleteRecipe, toggleFav, getById }
})
