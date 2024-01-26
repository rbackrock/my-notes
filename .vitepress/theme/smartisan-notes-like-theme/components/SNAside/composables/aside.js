import {
  nextTick,
  ref,
  onUnmounted
} from 'vue'
import {
  onContentUpdated
} from 'vitepress'

export function useAside() {
  const contentRightValue = ref(0)
  const asideHeightValue = ref(0)

  async function calc() {
    await nextTick()
    const {
      right: contentRectRightValue
    } = document.querySelector('.sn.content__block').getBoundingClientRect()
    const {
      height: asideRectHeightValue
    } = document.querySelector('#aside__wrapper__hook').getBoundingClientRect()

    contentRightValue.value = `${contentRectRightValue - 300 + 20}px`
    asideHeightValue.value = `${asideRectHeightValue}px`
  }

  onContentUpdated(async () => {
    await calc()
    window.addEventListener('resize', calc)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', calc)
  })

  return {
    contentRightValue,
    asideHeightValue
  }
}