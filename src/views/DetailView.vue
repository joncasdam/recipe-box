<template>
  <div v-if="!recipe" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="text-5xl mb-4">🔍</div>
      <h2 class="font-display text-xl font-semibold mb-2">Recept niet gevonden</h2>
      <BaseButton variant="primary" @click="router.push('/')">Terug naar overzicht</BaseButton>
    </div>
  </div>

  <div v-else class="min-h-screen">
    <Transition name="fade">
      <CookingMode v-if="showCooking" :recipe="recipe" :portions="portions" @close="showCooking = false" />
    </Transition>
    <Transition name="slide">
      <RecipeModal v-if="showEdit" :recipe="recipe" @close="showEdit = false" @saved="showEdit = false" />
    </Transition>
    <Transition name="fade">
      <ConfirmDialog v-if="showConfirm" title="Recept verwijderen" message="Weet je zeker dat je dit recept wilt verwijderen? Dit kan niet ongedaan worden gemaakt." @confirm="doDelete" @cancel="showConfirm = false" />
    </Transition>

    <div class="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <RouterLink to="/" class="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          Terug
        </RouterLink>
        <div class="flex items-center gap-2">
          <button @click="showCooking = true" class="flex items-center gap-2 bg-saffron-500 hover:bg-saffron-400 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-saffron-500/25">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Kookmodus
          </button>
          <button @click="showEdit = true" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
          <button @click="showConfirm = true" class="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div class="mb-10">
        <div class="flex items-start gap-4 mb-4">
          <div class="flex-1">
            <h1 class="font-display text-3xl sm:text-4xl font-bold mb-3">{{ recipe.title }}</h1>
            <div class="flex flex-wrap gap-2 mb-3">
              <Badge :text="recipe.category" :color="categoryColor(recipe.category)" />
              <Badge :text="recipe.difficulty" :color="difficultyColor(recipe.difficulty)" />
              <span v-for="tag in recipe.tags" :key="tag" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400">#{{ tag }}</span>
            </div>
          </div>
          <FavButton :is-fav="recipe.isFav" size="lg" @toggle="store.toggleFav(recipe.id)" />
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div class="recipe-detail-metadata">
            <svg class="w-5 h-5 dark:text-saffron-500 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div class="font-display text-2xl font-bold dark:text-saffron-500 text-white">{{ recipe.prepTime }}</div>
            <div class="text-xs dark:text-slate-300">minuten</div>
          </div>
          <div class="recipe-detail-metadata">
            <DifficultyStars :level="recipe.difficulty" />
            <div class="font-display text-lg font-bold dark:text-saffron-500 text-white mt-1">{{ recipe.difficulty }}</div>
            <div class="text-xs dark:text-slate-300">niveau</div>
          </div>
          <div class="recipe-detail-metadata">
            <svg class="w-5 h-5 dark:text-saffron-500 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <div class="flex items-center justify-center gap-2 my-1">
              <button @click="portions = Math.max(1, portions - 1)" class="w-6 h-6 rounded-full bg-slate-700 hover:bg-saffron-500 text-white flex items-center justify-center transition-colors text-sm">−</button>
              <span class="font-display text-2xl font-bold dark:text-saffron-500 text-white min-w-6 text-center">{{ portions }}</span>
              <button @click="portions = Math.min(20, portions + 1)" class="w-6 h-6 rounded-full bg-slate-700 hover:bg-saffron-500 text-white flex items-center justify-center transition-colors text-sm">+</button>
            </div>
            <div class="text-xs dark:text-slate-300">porties</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-2">
          <h2 class="font-display text-xl font-semibold mb-4 flex items-center gap-2">
            <span class="w-7 h-7 bg-saffron-500/20 rounded-lg flex items-center justify-center text-sm">🧂</span>
            Ingrediënten
            <span v-if="portions !== recipe.portions" class="text-xs text-white dark:text-saffron-500 font-normal bg-saffron-500/10 px-2 py-0.5 rounded-full">×{{ (portions / recipe.portions).toFixed(1) }}</span>
          </h2>
          <div class="bg-slate-800/30 rounded-2xl border border-slate-700/50 overflow-hidden">
            <div v-for="(ing, i) in scaledIngredients" :key="ing.id" :class="['flex gap-3 px-4 py-3 text-sm', i % 2 === 0 ? '' : 'dark:bg-slate-800/30 bg-slate-800/10']">
              <span class="dark:text-saffron-400 text-white font-medium w-28 shrink-0">{{ ing.scaledQty }} {{ ing.unit }}</span>
              <span class="dark:text-slate-300">{{ ing.name }}</span>
            </div>
            <div v-if="!scaledIngredients.length" class="py-6 text-center text-slate-600 text-sm">Geen ingrediënten</div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <h2 class="font-display text-xl font-semibold mb-4 flex items-center gap-2">
            <span class="w-7 h-7 bg-saffron-500/20 rounded-lg flex items-center justify-center text-sm">📋</span>
            Bereiding
          </h2>
          <div class="space-y-4">
            <div v-for="(step, i) in recipe.steps" :key="step.id" class="flex gap-4">
              <div class="recipe-detail-steps-bullets">{{ i + 1 }}</div>
              <div class="recipe-detail-steps">{{ step.text }}</div>
            </div>
            <div v-if="!recipe.steps.length" class="py-6 text-center text-slate-600 text-sm">Geen stappen</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipeStore'
import { useToastStore } from '../stores/toastStore'
import { categoryColor, difficultyColor } from '../helpers/recipeHelpers'
import { useScaledIngredients } from '../composables/useScaledIngredients'
import Badge from '../components/ui/Badge.vue'
import FavButton from '../components/ui/FavButton.vue'
import DifficultyStars from '../components/ui/DifficultyStars.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import CookingMode from '../components/recipe/CookingMode.vue'
import RecipeModal from '../components/recipe/RecipeModal.vue'
import ConfirmDialog from '../components/ui/ConfirmDialog.vue'

const props = defineProps<{ id: string }>()
const router = useRouter()
const store = useRecipeStore()
const toast = useToastStore()

const recipe = computed(() => store.getById(props.id))
const portions = ref(recipe.value?.portions ?? 4)
watch(() => recipe.value?.portions, v => { if (v) portions.value = v }, { immediate: true })

const ratio = computed(() => portions.value / (recipe.value?.portions ?? 1))
const ingredients = computed(() => recipe.value?.ingredients ?? [])
const scaledIngredients = useScaledIngredients(ingredients, ratio)

const showCooking = ref(false)
const showEdit = ref(false)
const showConfirm = ref(false)

function doDelete() {
  store.deleteRecipe(props.id)
  toast.show('Recept verwijderd')
  router.push('/')
}

</script>