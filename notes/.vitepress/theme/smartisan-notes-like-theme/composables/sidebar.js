import {
  ref,
  onUnmounted
} from 'vue'
import {
  onContentUpdated
} from 'vitepress'
import {
  stepHeight
} from '../consts'
import {
  useIsDesktop
} from './device'

export function useSidebar() {
  const isOpenMenu = ref(false)
  const toggleMenu = () => {
    isOpenMenu.value = !isOpenMenu.value
  }

  return {
    isOpenMenu,
    toggleMenu
  }
}

export function useCalcFixSidebarElementHeight() {
  const lineHeightPc = stepHeight.PC
  const lineHeightMobile = stepHeight.MOBILE
  const {
    isDesktop
  } = useIsDesktop()

  function setElementHeight(el, stepHeight) {
    if (el) {
      const elHeight = el.offsetHeight
      if (elHeight !== undefined && elHeight !== 0) {
        el.style.height = `${Math.ceil(elHeight / stepHeight + 0) * stepHeight}px`
      }
    }
  }
  
  function fixContentElementHeight() {
    const stepHeight = isDesktop.value ? lineHeightPc : lineHeightMobile
  
    // 所有 li 计算高度
    const navListWrapperEl = document.querySelector('#sidebar__container__wrapper__hook')
    const navElList = navListWrapperEl.querySelectorAll('li.category, li.item')
    for (const navEl of navElList) {
      setElementHeight(navEl, stepHeight)
    }
  }

  onContentUpdated(() => {
    window.addEventListener('resize', fixContentElementHeight)
    fixContentElementHeight()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', fixContentElementHeight)
  })

  return {
    fixContentElementHeight
  }
}