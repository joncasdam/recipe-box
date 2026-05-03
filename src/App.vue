<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDarkModeStore } from './stores/darkModeStore'
import { useToastStore } from './stores/toastStore'
import AppNavbar from './components/AppNavbar.vue'
import ToastContainer from './components/ui/ToastContainer.vue'

const darkMode = useDarkModeStore()
const { isDark } = storeToRefs(darkMode)
const toastStore = useToastStore()
</script>

<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-300',
      isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-gray-50 text-slate-900'
    ]"
  >
    <AppNavbar />
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <ToastContainer :toasts="toastStore.toasts" @dismiss="toastStore.remove" />
  </div>
</template>
