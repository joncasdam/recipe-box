<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-saffron-500/50',
      sizeClasses[size ?? 'md'],
      variantClasses[variant ?? 'primary'],
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size = 'sm' | 'md' | 'lg'

withDefaults(defineProps<{
  variant?: Variant
  size?: Size
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
})

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1',
  md: 'px-4 py-2 text-sm gap-1.5',
  lg: 'px-6 py-3 text-base gap-2',
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-saffron-500 hover:bg-saffron-400 text-white shadow-lg shadow-saffron-500/25',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100',
  ghost:     'bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-slate-200',
  danger:    'bg-rose-600 hover:bg-rose-500 text-white',
  outline:   'border border-slate-600 bg-transparent hover:bg-slate-800/50 text-slate-300',
}
</script>
