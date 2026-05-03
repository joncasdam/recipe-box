<template>
  <div class="cooking-mode-modal">
    <div class="cooking-mode-modal-header">
      <div>
        <div class="cooking-mode-modal-title">Kookmodus</div>
        <h1 class="font-display text-2xl font-bold">{{ recipe.title }}</h1>
      </div>
      <button @click="$emit('close')" class="cooking-mode-modal-close-btn">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="cooking-mode-modal-content">
      <div class="w-72 shrink-0 border-r border-slate-800 overflow-y-auto p-6">
        <h3 class="font-display text-lg font-semibold mb-4 dark:text-slate-300 text-slate-500">Ingrediënten</h3>
        <div class="space-y-2">
          <div v-for="ing in scaledIngredients" :key="ing.id" class="flex gap-2 text-sm py-2 border-b border-slate-800/50">
            <span class="text-saffron-400 font-medium w-24 shrink-0">{{ ing.scaledQty }} {{ ing.unit }}</span>
            <span class="dark:text-slate-300 text-slate-500">{{ ing.name }}</span>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center p-12">
        <div class="flex gap-2 mb-10">
          <div v-for="(s, i) in recipe.steps" :key="s.id"
            :class="['rounded-full transition-all duration-300', i === stepIdx ? 'bg-saffron-500 w-8 h-2' : i < stepIdx ? 'bg-saffron-700 w-2 h-2' : 'bg-slate-700 w-2 h-2']" />
        </div>

        <div class="text-center max-w-2xl">
          <div class="text-8xl font-display font-bold dark:text-saffron-500/20 text-saffron-300 mb-2">{{ stepIdx + 1 }}</div>
          <p class="text-2xl dark:text-slate-100 text-slate-700 leading-relaxed font-medium">{{ currentStep?.text }}</p>
        </div>

        <div class="flex items-center gap-6 mt-16">
          <button @click="prev" :disabled="stepIdx === 0"
            :class="['p-4 rounded-2xl border transition-all', stepIdx === 0 ? 'dark:border-slate-800 border-slate-300 dark:text-slate-700 text-slate-300 cursor-not-allowed' : 'border-slate-600 dark:text-slate-300 text-slate-600 hover:border-saffron-500 hover:text-saffron-500']">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span class="text-slate-500 text-lg">{{ stepIdx + 1 }} / {{ total }}</span>
          <button @click="next" :disabled="stepIdx === total - 1"
            :class="['p-4 rounded-2xl border transition-all', stepIdx === total - 1 ? 'dark:border-slate-800 border-slate-300 dark:text-slate-700 text-slate-300 cursor-not-allowed' : 'border-saffron-500 bg-saffron-500/10 text-saffron-500 hover:bg-saffron-500/20']">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <div v-if="stepIdx === total - 1" class="mt-8 text-center">
          <div class="text-5xl mb-2">🎉</div>
          <p class="text-saffron-400 font-medium">Smakelijk eten!</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Recipe } from '../../types'
import { useWakeLock } from '../../composables/useWakeLock'

const props = defineProps<{ recipe: Recipe; portions: number }>()
const emit = defineEmits<{ close: [] }>()

useWakeLock()

const stepIdx = ref(0)
const total = computed(() => props.recipe.steps.length)
const currentStep = computed(() => props.recipe.steps[stepIdx.value])
const ratio = computed(() => props.portions / props.recipe.portions)
const scaledIngredients = computed(() =>
  props.recipe.ingredients.map(ing => ({
    ...ing,
    scaledQty: ing.quantity
      ? (parseFloat(ing.quantity) * ratio.value).toFixed(2).replace(/\.?0+$/, '')
      : '',
  }))
)

function next() { if (stepIdx.value < total.value - 1) stepIdx.value++ }
function prev() { if (stepIdx.value > 0) stepIdx.value-- }

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'Escape') emit('close')
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>
