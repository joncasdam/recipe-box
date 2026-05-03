import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Recipe, FilterState } from '../types'

export function useRecipeFilter(recipes: Ref<Recipe[]>) {
  const filters = ref<FilterState>({
    search: '',
    category: '',
    difficulty: '',
    maxTime: 120,
    favOnly: false,
    sortBy: 'createdAt',
  })

  const filtered = computed<Recipe[]>(() => {
    let list = [...recipes.value]

    if (filters.value.favOnly) {
      list = list.filter(r => r.isFav)
    }

    if (filters.value.category) {
      list = list.filter(r => r.category === filters.value.category)
    }

    if (filters.value.difficulty) {
      list = list.filter(r => r.difficulty === filters.value.difficulty)
    }

    list = list.filter(r => r.prepTime <= filters.value.maxTime)

    const q = filters.value.search.trim().toLowerCase()
    if (q) {
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(q))
      )
    }

    list.sort((a, b) => {
      switch (filters.value.sortBy) {
        case 'title':    return a.title.localeCompare(b.title)
        case 'prepTime': return a.prepTime - b.prepTime
        default:         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return list
  })

  function resetFilters(): void {
    filters.value = { search: '', category: '', difficulty: '', maxTime: 120, favOnly: false, sortBy: 'createdAt' }
  }

  const hasActiveFilters = computed(() =>
    !!filters.value.search || !!filters.value.category || !!filters.value.difficulty || filters.value.favOnly
  )

  return { filters, filtered, resetFilters, hasActiveFilters }
}
