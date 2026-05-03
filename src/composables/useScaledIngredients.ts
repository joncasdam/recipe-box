import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Ingredient } from '../types'

export function useScaledIngredients(
  ingredients: Ref<Ingredient[]>,
  ratio: Ref<number>,
) {
  return computed(() =>
    ingredients.value.map(ing => ({
      ...ing,
      scaledQty: ing.quantity
        ? (parseFloat(ing.quantity) * ratio.value).toFixed(2).replace(/\.?0+$/, '')
        : '',
    }))
  )
}
