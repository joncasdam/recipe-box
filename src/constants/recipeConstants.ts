import { recipeConfig } from '../config/recipeConfig'
import type { Category, Difficulty, Unit } from '../types'

export const CATEGORIES = Object.keys(
  recipeConfig.categories
) as Category[]

export const DIFFICULTIES = Object.keys(
  recipeConfig.difficulties
) as Difficulty[]

export const UNITS = recipeConfig.units as readonly Unit[]

export const SEARCH_STOP_WORDS = ['can', 'i', 'make', 'with', 'using', 'recipe', 'for', 'some', 'a', 'an', 'the', 'how', 'do', 'have', 'wat', 'kan', 'ik', 'maken', 'met', 'om']
