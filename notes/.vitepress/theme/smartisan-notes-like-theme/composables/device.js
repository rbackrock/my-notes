import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'

export function useIsDesktop() {
  const is768 = useMediaQuery('(min-width: 768px)')
  const isDesktop = computed(() => {
    return is768.value
  })

  return {
    isDesktop
  }
}