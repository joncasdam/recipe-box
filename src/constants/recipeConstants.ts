import { recipeConfig } from '../config/recipeConfig'
import type { Category, Difficulty, Unit } from '../types'

export const CATEGORIES = Object.keys(
  recipeConfig.categories
) as Category[]

export const DIFFICULTIES = Object.keys(
  recipeConfig.difficulties
) as Difficulty[]

export const UNITS = recipeConfig.units as readonly Unit[]