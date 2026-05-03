<template>
  <div class="min-h-screen">
    <div class="relative overflow-hidden bg-linear-to-r from-slate-900 via-slate-900 to-slate-800 border-b border-slate-800">
      <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle at 20% 50%, #f97f0d 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f97f0d 0%, transparent 50%)" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div class="flex flex-col sm:flex-row sm:items-end gap-4">
          <div class="flex-1">
            <p class="text-saffron-500 text-sm font-medium uppercase tracking-widest mb-1">Mijn keuken</p>
            <h1 class="font-display text-4xl sm:text-5xl font-bold dark:text-white text-slate-500">Recipe Box</h1>
            <p class="dark:text-slate-400 text-slate-100 mt-1 text-sm">{{ recipes.length }} recepten · {{ totalFavs }} favorieten</p>
          </div>
          <BaseButton variant="primary" size="lg" @click="openAdd">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Nieuw recept
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <!-- Filters -->
      <div class="home-filter-search">
        <div class="relative">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input v-model="filters.search" placeholder="Zoek op titel, tag of ingrediënt (bv. 'kip')" class="w-full dark:bg-slate-800/60 bg-slate-100/50 border border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500/30 transition-all" />
        </div>
        <div class="flex flex-wrap gap-3 items-end">
          <div class="flex flex-col gap-1">
            <label class="text-xs text-slate-500 uppercase tracking-wide">Categorie</label>
            <select v-model="filters.category" class="dark:bg-slate-800/60 bg-slate-100/50 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-saffron-500">
              <option value="">Alle</option>
              <option v-for="c in CATEGORIES" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-slate-500 uppercase tracking-wide">Moeilijkheid</label>
            <select v-model="filters.difficulty" class="dark:bg-slate-800/60 bg-slate-100/50 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-saffron-500">
              <option value="">Alle</option>
              <option v-for="d in DIFFICULTIES" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1 flex-1 min-w-36">
            <label class="text-xs text-slate-500 uppercase tracking-wide">Max. tijd: <span class="text-saffron-400">{{ timeLabel }}</span></label>
            <input type="range" v-model.number="filters.maxTime" min="5" max="180" step="5" class="w-full h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-saffron-500" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs text-slate-500 uppercase tracking-wide">Sorteren</label>
            <select v-model="filters.sortBy" class="dark:bg-slate-800/60 bg-slate-100/50 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-saffron-500">
              <option value="createdAt">Nieuwste</option>
              <option value="title">Naam A–Z</option>
              <option value="prepTime">Bereidingstijd</option>
            </select>
          </div>
          <button @click="filters.favOnly = !filters.favOnly"
            :class="['flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all', filters.favOnly ? 'border-rose-500 bg-rose-500/10 text-rose-400' : 'border-slate-700 dark:text-slate-400 text-slate-700 hover:border-slate-500']">
            <svg :class="['w-4 h-4', filters.favOnly ? 'fill-rose-500 text-rose-500' : 'fill-none']" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
            Favorieten
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between mb-5">
        <p class="text-slate-500 text-sm">{{ filtered.length }} recept{{ filtered.length !== 1 ? 'en' : '' }} gevonden</p>
        <button v-if="hasActiveFilters" @click="resetFilters" class="text-xs text-saffron-500 hover:text-saffron-400 transition-colors">Filters wissen</button>
      </div>

      <div v-if="filtered.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <RecipeCard v-for="recipe in filtered" :key="recipe.id" :recipe="recipe"
          @click="router.push(`/recipe/${recipe.id}`)"
          @toggle-fav="store.toggleFav(recipe.id)" />
      </div>

      <div v-else class="flex flex-col items-center justify-center py-24 text-center">
        <div class="text-6xl mb-4">🍽️</div>
        <h3 class="font-display text-xl font-semibold mb-2">Geen recepten gevonden</h3>
        <p class="text-slate-500 text-sm mb-6">Probeer andere zoektermen of filters</p>
        <BaseButton variant="primary" @click="openAdd">Voeg eerste recept toe</BaseButton>
      </div>
    </div>

    <Transition name="slide">
      <RecipeModal v-if="showModal" :recipe="editRecipe" @close="showModal = false" @saved="onSaved" />
    </Transition>
    <Transition name="fade">
      <ConfirmDialog v-if="showConfirm" title="Recept verwijderen" message="Weet je zeker dat je dit recept wilt verwijderen? Dit kan niet ongedaan worden gemaakt." @confirm="doDelete" @cancel="showConfirm = false" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipeStore'
import { useToastStore } from '../stores/toastStore'
import { useRecipeFilter } from '../composables/useRecipeFilter'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { CATEGORIES, DIFFICULTIES } from '../constants/recipeConstants'
import type { Recipe } from '../types'
import RecipeCard from '../components/recipe/RecipeCard.vue'
import RecipeModal from '../components/recipe/RecipeModal.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import ConfirmDialog from '../components/ui/ConfirmDialog.vue'

const router = useRouter()
const store = useRecipeStore()
const { recipes } = storeToRefs(store)

const { filters, filtered, resetFilters, hasActiveFilters } = useRecipeFilter(recipes)

const showModal = ref(false)
const editRecipe = ref<Recipe | null>(null)
const showConfirm = ref(false)
const deleteTarget = ref<string | null>(null)

const totalFavs = computed(() => recipes.value.filter(r => r.isFav).length)
const timeLabel = computed(() => filters.value.maxTime >= 180 ? 'Alles' : `≤ ${filters.value.maxTime} min`)

function openAdd() { editRecipe.value = null; showModal.value = true }
// function openEdit(r: Recipe) { editRecipe.value = r; showModal.value = true }
function onSaved() { showModal.value = false }

// function confirmDelete(id: string) { deleteTarget.value = id; showConfirm.value = true }
function doDelete() {
  if (deleteTarget.value) { store.deleteRecipe(deleteTarget.value); useToastStore().show('Recept verwijderd') }
  showConfirm.value = false; deleteTarget.value = null
}
</script>
