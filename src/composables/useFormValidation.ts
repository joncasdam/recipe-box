import { ref } from 'vue'
import type { FormErrors } from '../types'

interface FieldRule {
  label: string
  getValue: () => unknown
  required?: boolean
  minLen?: number
  min?: number
  max?: number
  minVal?: number
}

type FieldRules = Record<string, FieldRule>

export function useFormValidation(fields: FieldRules) {
  const errors = ref<FormErrors>({})

  function validate(): boolean {
    errors.value = {}

    for (const [key, rules] of Object.entries(fields)) {
      const val = rules.getValue()

      if (rules.required && (!val || (typeof val === 'string' && !val.trim()))) {
        errors.value[key] = `${rules.label} is verplicht`
        continue
      }

      if (rules.minLen && typeof val === 'string' && val.trim().length < rules.minLen) {
        errors.value[key] = `${rules.label} moet minimaal ${rules.minLen} tekens bevatten`
        continue
      }

      if (rules.min !== undefined && Number(val) <= rules.min) {
        errors.value[key] = `${rules.label} moet groter zijn dan ${rules.min}`
        continue
      }

      if (rules.minVal !== undefined && Number(val) < rules.minVal) {
        errors.value[key] = `${rules.label} moet minimaal ${rules.minVal} zijn`
        continue
      }

      if (rules.max !== undefined && Number(val) > rules.max) {
        errors.value[key] = `${rules.label} mag maximaal ${rules.max} zijn`
        continue
      }
    }

    return Object.keys(errors.value).length === 0
  }

  function clearError(key: string): void {
    delete errors.value[key]
  }

  function clearAll(): void {
    errors.value = {}
  }

  return { errors, validate, clearError, clearAll }
}
