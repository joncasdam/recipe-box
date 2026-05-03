<template>
  <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
    <TransitionGroup name="fade">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        @click="$emit('dismiss', toast.id)"
        :class="[
          'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium border max-w-sm cursor-pointer',
          toast.type === 'success' ? 'bg-emerald-900/90 border-emerald-700 text-emerald-200' :
          toast.type === 'error'   ? 'bg-rose-900/90 border-rose-700 text-rose-200' :
                                     'bg-blue-900/90 border-blue-700 text-blue-200',
        ]"
      >
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { Toast } from '../../types'

defineProps<{ toasts: Toast[] }>()
defineEmits<{ dismiss: [id: string] }>()
</script>
