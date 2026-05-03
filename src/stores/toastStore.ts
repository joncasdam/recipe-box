import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Toast, ToastType } from '../types'

function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  function show(message: string, type: ToastType = 'success'): void {
    const id = uid()
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  }

  function remove(id: string): void {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return { toasts, show, remove }
})
