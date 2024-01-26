import { reactive } from 'vue'

export const sidebarStore = reactive({
  isOpenMenu: false,
  toggleOpenMenu() {
    this.isOpenMenu = !this.isOpenMenu
  }
})

export const asideStore = reactive({
  isOpenDropdown: false,
  toggleOpenDropdown() {
    this.isOpenDropdown = !this.isOpenDropdown
  }
})