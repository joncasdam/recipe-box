<template>
  <div class="fixed inset-0 z-60 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('cancel')" />
    <div class="relative bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-sm w-full shadow-2xl">
      <div class="text-center mb-6">
        <div class="w-14 h-14 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-7 h-7 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
        </div>
        <h3 class="font-display text-lg font-semibold mb-2">{{ title }}</h3>
        <p class="text-slate-400 text-sm">{{ message }}</p>
      </div>
      <div class="flex gap-3">
        <BaseButton variant="ghost" class="flex-1" @click="$emit('cancel')">Annuleren</BaseButton>
        <BaseButton variant="danger" class="flex-1" @click="$emit('confirm')">Verwijderen</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

defineProps<{ title: string; message: string }>()
defineEmits<{ confirm: []; cancel: [] }>()
</script>
