import { recipeConfig } from '../config/recipeConfig'
import type { Category, Difficulty } from '../types'

export const categoryColor = (c: Category) =>
  recipeConfig.categories[c]

export const difficultyColor = (d: Difficulty) =>
  recipeConfig.difficulties[d]