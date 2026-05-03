import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useDarkModeStore = defineStore('darkMode', () => {
  const isDark = ref<boolean>(localStorage.getItem('dark') !== 'false')

  watch(isDark, (value) => {
    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem('dark', String(value))
  }, { immediate: true })

  function toggle(): void {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
})
