<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="absolute inset-0 dark:bg-black/70 backdrop-blur-sm" @click="$emit('close')" />

    <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto dark:bg-slate-900 bg-slate-200 rounded-2xl shadow-2xl border border-slate-700/50">
      <!-- Header -->
      <div class="sticky top-0 dark:bg-slate-900 bg-slate-50 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
        <h2 class="font-display text-xl font-semibold">{{ isEdit ? 'Recept bewerken' : 'Nieuw recept' }}</h2>
        <button @click="$emit('close')" class="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="p-6 space-y-6">
        <!-- Basic Info -->
        <div class="space-y-4">
          <BaseInput v-model="form.title" label="Titel" placeholder="Naam van het recept" :error="errors.title" required />
          <div class="grid grid-cols-2 gap-4">
            <BaseSelect v-model="form.category" label="Categorie" :options="CATEGORIES" :error="errors.category" required />
            <BaseSelect v-model="form.difficulty" label="Moeilijkheid" :options="DIFFICULTIES" :error="errors.difficulty" required />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <BaseInput v-model="form.prepTime" label="Bereidingstijd (min)" type="number" placeholder="0" :error="errors.prepTime" required />
            <BaseInput v-model="form.portions" label="Porties (1–20)" type="number" placeholder="1" :error="errors.portions" required />
          </div>
          <BaseInput v-model="form.tags" label="Tags (kommagescheiden)" placeholder="pasta, snel, vegetarisch" />
        </div>

        <!-- Ingredients -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-display text-base font-semibold dark:text-slate-300 text-slate-600">Ingrediënten</h3>
            <button @click="addIngredient" class="text-xs text-saffron-500 hover:text-saffron-400 font-medium flex items-center gap-1 transition-colors">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Toevoegen
            </button>
          </div>

          <div v-if="form.ingredients.length === 0" class="text-center py-4 text-slate-600 text-sm border border-dashed border-slate-700 rounded-xl">
            Nog geen ingrediënten
          </div>

          <div class="space-y-2">
            <div v-for="ing in form.ingredients" :key="ing.id" class="ingredient-row flex gap-2 items-center">
              <input v-model="ing.quantity" placeholder="Hoeveelheid"
                class="w-24 dark:bg-slate-800/60 bg-slate-100 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-saffron-500 shrink-0" />
              <select v-model="ing.unit"
                class="w-20 dark:bg-slate-800/60 bg-slate-100 border border-slate-700 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-saffron-500 shrink-0">
                <option v-for="u in UNITS" :key="u" :value="u">{{ u }}</option>
              </select>
              <input v-model="ing.name" placeholder="Ingredient naam"
                class="flex-1 dark:bg-slate-800/60 bg-slate-100 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-saffron-500" />
              <button @click="removeIngredient(ing.id)" class="p-2 rounded-lg hover:bg-rose-500/20 text-slate-600 hover:text-rose-400 transition-colors shrink-0">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Steps -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-display text-base font-semibold dark:text-slate-300 text-slate-600">Bereidingsstappen</h3>
            <button @click="addStep" class="text-xs text-saffron-500 hover:text-saffron-400 font-medium flex items-center gap-1 transition-colors">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Toevoegen
            </button>
          </div>

          <div v-if="form.steps.length === 0" class="text-center py-4 text-slate-600 text-sm border border-dashed border-slate-700 rounded-xl">
            Nog geen stappen
          </div>

          <div class="space-y-2">
            <div
              v-for="(step, idx) in form.steps" :key="step.id"
              class="ingredient-row flex gap-2 items-start"
              draggable="true"
              @dragstart="onDragStart(idx)"
              @dragover.prevent
              @drop="onDrop(idx)"
            >
              <div class="flex flex-col gap-1 shrink-0 mt-2">
                <button @click="moveStep(idx, -1)" :disabled="idx === 0" class="p-0.5 rounded text-slate-600 hover:text-saffron-500 disabled:opacity-30 transition-colors">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
                </button>
                <button @click="moveStep(idx, 1)" :disabled="idx === form.steps.length - 1" class="p-0.5 rounded text-slate-600 hover:text-saffron-500 disabled:opacity-30 transition-colors">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
              </div>
              <div class="w-7 h-7 rounded-full bg-saffron-500/20 text-saffron-400 text-xs font-bold flex items-center justify-center shrink-0 mt-2 cursor-grab font-display">
                {{ idx + 1 }}
              </div>
              <textarea v-model="step.text" :placeholder="'Stap ' + (idx + 1)" rows="2"
                class="flex-1 bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-saffron-500 resize-none"></textarea>
              <button @click="removeStep(step.id)" class="p-2 rounded-lg hover:bg-rose-500/20 text-slate-600 hover:text-rose-400 transition-colors shrink-0 mt-1.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 justify-end pt-4 border-t border-slate-800">
          <BaseButton variant="ghost" @click="$emit('close')">Annuleren</BaseButton>
          <BaseButton variant="primary" @click="submit">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            {{ isEdit ? 'Opslaan' : 'Toevoegen' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { Recipe, Ingredient, Step, Unit } from '../../types'
import { CATEGORIES, DIFFICULTIES, UNITS } from '../../constants/recipeConstants'
import { useRecipeStore } from '../../stores/recipeStore'
import { useToastStore } from '../../stores/toastStore'
import { useFormValidation } from '../../composables/useFormValidation'
import BaseButton from '../ui/BaseButton.vue'
import BaseInput from '../ui/BaseInput.vue'
import BaseSelect from '../ui/BaseSelect.vue'

const props = defineProps<{ recipe?: Recipe | null }>()
const emit = defineEmits<{ close: []; saved: [] }>()

const store = useRecipeStore()
const toast = useToastStore()

const isEdit = computed(() => !!props.recipe?.id)

function uid() { return Math.random().toString(36).slice(2, 9) }

const form = reactive({
  title: props.recipe?.title ?? '',
  category: props.recipe?.category ?? '',
  prepTime: props.recipe?.prepTime ?? 0,
  difficulty: props.recipe?.difficulty ?? '',
  portions: props.recipe?.portions ?? 4,
  tags: props.recipe?.tags.join(', ') ?? '',
  ingredients: props.recipe?.ingredients
    ? props.recipe.ingredients.map(i => ({ ...i }))
    : [] as Ingredient[],
  steps: props.recipe?.steps
    ? props.recipe.steps.map(s => ({ ...s }))
    : [] as Step[],
})

const { errors, validate } = useFormValidation({
  title:      { label: 'Titel', required: true, minLen: 3, getValue: () => form.title },
  category:   { label: 'Categorie', required: true, getValue: () => form.category },
  prepTime:   { label: 'Bereidingstijd', required: true, min: 0, getValue: () => form.prepTime },
  difficulty: { label: 'Moeilijkheidsgraad', required: true, getValue: () => form.difficulty },
  portions:   { label: 'Porties', required: true, minVal: 1, max: 20, getValue: () => form.portions },
})

// ── Ingredients ──────────────────────────────────────────────────────────────
function addIngredient() {
  form.ingredients.push({ id: uid(), quantity: '', unit: 'g' as Unit, name: '' })
}
function removeIngredient(id: string) {
  form.ingredients = form.ingredients.filter(i => i.id !== id)
}

// ── Steps ─────────────────────────────────────────────────────────────────────
function addStep() { form.steps.push({ id: uid(), text: '' }) }
function removeStep(id: string) { form.steps = form.steps.filter(s => s.id !== id) }
function moveStep(idx: number, dir: -1 | 1) {
  const to = idx + dir
  if (to < 0 || to >= form.steps.length) return
  const arr = [...form.steps];
  [arr[idx], arr[to]] = [arr[to], arr[idx]]
  form.steps = arr
}

// ── Drag & Drop ──────────────────────────────────────────────────────────────
let dragIdx: number | null = null
function onDragStart(i: number) { dragIdx = i }
function onDrop(i: number) {
  if (dragIdx === null || dragIdx === i) return
  const arr = [...form.steps]
  const [moved] = arr.splice(dragIdx, 1)
  arr.splice(i, 0, moved)
  form.steps = arr
  dragIdx = null
}

// ── Submit ────────────────────────────────────────────────────────────────────
function submit() {
  if (!validate()) return
  const data = {
    ...form,
    category: form.category as Recipe['category'],
    difficulty: form.difficulty as Recipe['difficulty'],
    prepTime: Number(form.prepTime),
    portions: Number(form.portions),
  }
  if (isEdit.value && props.recipe) {
    store.updateRecipe(props.recipe.id, data)
    toast.show('Recept bijgewerkt! ✏️')
  } else {
    store.addRecipe(data)
    toast.show('Recept toegevoegd! 🎉')
  }
  emit('saved')
}
</script>
