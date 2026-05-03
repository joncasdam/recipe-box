<template>
  <span class="flex gap-0.5">
    <span v-for="n in 3" :key="n" :class="['text-xs', n <= levelNum ? 'dark:text-saffron-500 text-white' : 'text-slate-700']">●</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Difficulty } from '../../types'

const props = defineProps<{ level: Difficulty }>()

const levelNum = computed<number>(() => ({ 'Makkelijk': 1, 'Gemiddeld': 2, 'Moeilijk': 3 }[props.level] ?? 0))
</script>
