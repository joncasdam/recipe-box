import { onMounted, onUnmounted } from 'vue'

export function useWakeLock() {
  let wakeLock: WakeLockSentinel | null = null

  onMounted(async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen')
      }
    } catch {
      // Wake Lock not supported or permission denied
    }
  })

  onUnmounted(() => {
    wakeLock?.release().catch(() => {})
    wakeLock = null
  })
}
