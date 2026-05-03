<template>
  <div
    @click="$emit('click')"
    class="card-hover cursor-pointer recipe-card group"
  >
    <div class="h-1.5 w-full" :class="recipe.isFav ? 'bg-linear-to-r from-saffron-500 to-orange-400' : 'bg-slate-700'" />

    <div class="p-5">
      <div class="flex items-start justify-between gap-2 mb-3">
        <h3 class="font-display font-semibold text-lg leading-tight truncate flex-1 group-hover:text-saffron-400 transition-colors">
          {{ recipe.title }}
        </h3>
        <FavButton :is-fav="recipe.isFav" @toggle="$emit('toggleFav')" />
      </div>

      <div class="flex flex-wrap gap-1.5 mb-4">
        <Badge :text="recipe.category" :color="categoryColor(recipe.category)" />
        <Badge :text="recipe.difficulty" :color="difficultyColor(recipe.difficulty)" />
      </div>

      <div class="grid grid-cols-3 gap-2 mb-4">
        <div class="flex flex-col items-center dark:bg-slate-900/50 rounded-xl p-2">
          <span class="dark:text-saffron-500 text-slate-500 text-base font-bold">{{ recipe.prepTime }}</span>
          <span class="text-slate-500 text-xs">min</span>
        </div>
        <div class="flex flex-col items-center dark:bg-slate-900/50 rounded-xl p-2 justify-between">
          <DifficultyStars :level="recipe.difficulty" />
          <span class="text-slate-500 text-xs mt-0.5">niveau</span>
        </div>
        <div class="flex flex-col items-center dark:bg-slate-900/50 p-2">
          <span class="dark:text-saffron-500 text-slate-500 text-base font-bold">{{ recipe.portions }}</span>
          <span class="text-slate-500 text-xs">porties</span>
        </div>
      </div>

      <div v-if="recipe.tags.length" class="flex flex-wrap gap-1">
        <span v-for="tag in recipe.tags.slice(0, 3)" :key="tag" class="text-xs dark:text-slate-500 text-slate-100 dark:bg-slate-900/60 bg-slate-500/60 px-2 py-0.5 rounded-full">
          #{{ tag }}
        </span>
        <span v-if="recipe.tags.length > 3" class="text-xs dark:text-slate-600 text-slate-100">+{{ recipe.tags.length - 3 }}</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { Recipe } from '../../types'
import { categoryColor, difficultyColor } from '../../helpers/recipeHelpers'
import Badge from '../ui/Badge.vue'
import FavButton from '../ui/FavButton.vue'
import DifficultyStars from '../ui/DifficultyStars.vue'

defineProps<{ recipe: Recipe }>()
defineEmits<{ click: []; toggleFav: [] }>()
</script>
