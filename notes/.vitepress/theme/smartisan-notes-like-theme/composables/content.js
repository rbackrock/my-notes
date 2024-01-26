import {
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

export function useCalcFixContentElementHeight() {
  const {
    isDesktop
  } = useIsDesktop()
  const lineHeightPc = stepHeight.PC
  const lineHeightMobile = stepHeight.MOBILE
  const fixImgHandleFnList = []
  // customBlock 的观察者列表
  const customBlockMutationObserverList = []
  // group 形式的 code block 的观察者列表
  const groupCodeBlockMutationObserverList = []

  function setElementHeight(el) {
    const stepHeight = isDesktop.value ? lineHeightPc : lineHeightMobile

    if (el) {
      const elHeight = el.offsetHeight
      if (elHeight !== undefined && elHeight !== 0) {
        el.style.height = `${Math.ceil(elHeight / stepHeight + 0) * stepHeight}px`
      }
    }
  }
  
  function setGroupCodeBlockWrapperElementHeight(groupCodeBlockEl, activeCodeblockEl) {
    const stepHeight = isDesktop.value ? lineHeightPc : lineHeightMobile
    const groupCodeBlockHeight = groupCodeBlockEl.offsetHeight
    const shouldGroupCodeBlockHeight = `${Math.ceil(groupCodeBlockHeight / stepHeight + 0) * stepHeight}`
    const tabHeight = groupCodeBlockEl.querySelector('.tabs').offsetHeight
  
    activeCodeblockEl.style.height = `${shouldGroupCodeBlockHeight - tabHeight}px`
  }

  function initFixHeight() {
    /**
     * group 代码块
     */
    const groupCodeBlockListEl = document.querySelectorAll(`.sn.content__block .vp-code-group`)
    for (const groupCodeBlockEl of groupCodeBlockListEl) {
      const groupCodeBlockMutationObserver = new MutationObserver((mutationsList, observer) => {
        const [
          mutation
        ] = mutationsList
        const targetEl = mutation.target
        const groupCodeWrapperEl = targetEl.parentElement.parentElement
        const currentCodeBlockEl = groupCodeWrapperEl.querySelector(`div[class*='language-'].active`)
        
        groupCodeWrapperEl.style.height = 'auto'
        setGroupCodeBlockWrapperElementHeight(groupCodeWrapperEl, currentCodeBlockEl)
      })
  
      for (const codeBlockEl of groupCodeBlockEl.querySelectorAll(`div[class*='language-']`)) {
        groupCodeBlockMutationObserver.observe(codeBlockEl, { attributeFilter: ['class'] })
        groupCodeBlockMutationObserverList.push(groupCodeBlockMutationObserver)
      }

      groupCodeBlockEl.style.height = 'auto'
      setGroupCodeBlockWrapperElementHeight(
        groupCodeBlockEl,
        groupCodeBlockEl.querySelector(`div[class*='language-'].active`)
      )
    }

    /**
     * img 图片
     */
    const imgListEl = document.querySelectorAll(`.sn.content__block img`)
    for (const imgEl of imgListEl) {
      const currentFixImgHeightFn = setElementHeight.bind(null, imgEl)
      fixImgHandleFnList.push({
        el: imgEl,
        handler: currentFixImgHeightFn
      })
      imgEl.addEventListener('load', currentFixImgHeightFn)
    }

    /**
     * custom-block
     */
    const customBlockListEl = document.querySelectorAll(`.sn.content__block .custom-block`)
    for (const customBlockEl of customBlockListEl) {
      setElementHeight(customBlockEl)
  
      if (customBlockEl.classList.contains('details')) {
        const customBlockMutationObserver = new MutationObserver((mutationsList, observer) => {
          const [mutation] = mutationsList
          customBlockEl.style.height = `auto`
          setElementHeight(mutation.target)
        })
        customBlockMutationObserver.observe(customBlockEl, { attributeFilter: ['open'] })
        customBlockMutationObserverList.push(customBlockMutationObserver)
      }
    }
  }
  
  function fixContentElementHeight() {
    /**
     * 一般代码块
     */
    const codeBlockListEl = document.querySelectorAll(`.sn.content__block div[class*='language-']`)
    for (const codeBlockEl of codeBlockListEl) {
      const parentElementClassName = codeBlockEl.parentElement.className
      if (parentElementClassName === '') {
        setElementHeight(codeBlockEl)
      }
    }
  
    /**
     * 表格
     */
    const tableListEl = document.querySelectorAll(`.sn.content__block table`)
    const stepHeight = isDesktop.value ? lineHeightPc : lineHeightMobile
    for (const tableEl of tableListEl) {
      const tableHeight = tableEl.offsetHeight
      const theadHeight = tableEl.querySelector('thead').offsetHeight
  
      if (tableHeight !== undefined && tableHeight !== 0) {
        const calcHeight = Math.ceil(tableHeight / stepHeight + 0) * stepHeight
        tableEl.style.height = `${calcHeight}px`
        tableEl.querySelector('tbody').style.height = `${calcHeight - theadHeight - 1}px`
      }
    }
  
    /**
     * 数学公式
     */
    const mathListEl = document.querySelectorAll(`.sn.content__block .MathJax`)
    for (const mathEl of mathListEl) {
      if (mathEl.parentElement.nodeName === 'DIV') {
        setElementHeight(mathEl)
      }
    }

    /**
     * img 图片
     */
    for (const imageHandleObject of fixImgHandleFnList) {
      if (imageHandleObject.el.complete === true) {
        imageHandleObject.handler()
      }
    }
  }

  onContentUpdated(() => {
    initFixHeight()
    fixContentElementHeight()
    window.addEventListener('resize', fixContentElementHeight)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', fixContentElementHeight)
  
    for (const imageHandleObject of fixImgHandleFnList) {
      imageHandleObject.el.removeEventListener('load', imageHandleObject.handler)
    }
  
    for (const customBlockMutationObserver of customBlockMutationObserverList) {
      customBlockMutationObserver.disconnect()
    }
  
    for (const groupCodeBlockMutationObserver of groupCodeBlockMutationObserverList) {
      groupCodeBlockMutationObserver.disconnect()
    }
  })
}