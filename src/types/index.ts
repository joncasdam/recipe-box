// ─── Domain Types ──────────────────────────────────────────────────────────────

import type { recipeConfig } from '../config/recipeConfig'

export type Category = keyof typeof recipeConfig.categories
export type Difficulty = keyof typeof recipeConfig.difficulties
export type Unit = typeof recipeConfig.units[number]
export type SortKey = 'createdAt' | 'title' | 'prepTime'
export type ToastType = 'success' | 'error' | 'info'

export interface Ingredient {
  id: string
  quantity: string
  unit: Unit
  name: string
}

export interface Step {
  id: string
  text: string
}

export interface Recipe {
  id: string
  title: string
  category: Category
  prepTime: number
  difficulty: Difficulty
  portions: number
  tags: string[]
  ingredients: Ingredient[]
  steps: Step[]
  isFav: boolean
  createdAt: string
}

// ─── Form Types ────────────────────────────────────────────────────────────────

export interface RecipeFormData {
  title: string
  category: Category | ''
  prepTime: number
  difficulty: Difficulty | ''
  portions: number
  tags: string
  ingredients: Ingredient[]
  steps: Step[]
}

export interface FormErrors {
  [key: string]: string | undefined
}

// ─── Filter & Sort Types ───────────────────────────────────────────────────────

export interface FilterState {
  search: string
  category: Category | ''
  difficulty: Difficulty | ''
  maxTime: number
  favOnly: boolean
  sortBy: SortKey
}

// ─── Toast Type ────────────────────────────────────────────────────────────────

export interface Toast {
  id: string
  message: string
  type: ToastType
}
