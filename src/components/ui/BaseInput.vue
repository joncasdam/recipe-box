<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-xs font-medium text-slate-400 uppercase tracking-wide">
      {{ label }}<span v-if="required" class="text-saffron-500 ml-1">*</span>
    </label>
    <input
      :type="type ?? 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="[
        'w-full dark:bg-slate-800/60 bg-slate-100 border rounded-xl px-4 py-2.5 text-sm transition-all',
        'focus:outline-none focus:ring-2 placeholder:text-slate-600',
        error
          ? 'border-rose-500 focus:ring-rose-500/30'
          : 'border-slate-700 focus:ring-saffron-500/30 focus:border-saffron-500',
      ]"
    />
    <span v-if="error" class="text-xs text-rose-400">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
