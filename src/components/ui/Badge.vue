<template>
  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider', color ?? 'bg-slate-700/60 text-slate-400']">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
  defineProps<{ text: string; color?: string }>()
</script>
