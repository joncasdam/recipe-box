<template>
  <nav
    :class="[
      'sticky top-0 z-30 border-b transition-colors backdrop-blur-md',
      darkMode.isDark
        ? 'bg-slate-950/95 border-slate-800'
        : 'bg-white/95 border-gray-200'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
      <RouterLink
        to="/"
        class="font-display font-bold text-lg flex items-center gap-2 hover:text-saffron-500 transition-colors"
      >
        🍳 <span>Recipe Box</span>
      </RouterLink>

      <button
        @click="darkMode.toggle()"
        :class="[
          'p-2 rounded-xl transition-all',
          darkMode.isDark
            ? 'bg-slate-800 text-amber-400 hover:bg-slate-700'
            : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
        ]"
        :title="darkMode.isDark ? 'Lichte modus' : 'Donkere modus'"
      >
        <svg v-if="darkMode.isDark" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
        </svg>
        <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '../stores/darkModeStore'

const darkMode = useDarkModeStore()
</script>
