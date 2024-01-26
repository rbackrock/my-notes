<script setup>
import {
  computed
} from 'vue'
import {
  useRoute
} from 'vitepress'
import { sidebarStore } from '../../store'
import {
  useData
} from '../../composables/data'
import {
  useCalcFixSidebarElementHeight
} from '../../composables/sidebar'

const {
  theme
} = useData()
const route = useRoute()
const sidebarList = theme.value?.sidebar || []
const currentLink = computed(() => {
  const path = route.path
  const dotIndex = path.lastIndexOf('.')
  return path.substring(0, dotIndex)
})

useCalcFixSidebarElementHeight()

const sidebarClassNames = computed(() => {
  const classNames = []
  if (sidebarStore.isOpenMenu) {
    classNames.push('open__menu')
  }

  return classNames
})

function handleClose() {
  sidebarStore.toggleOpenMenu()
}
</script>

<template>
  <div v-show="sidebarStore.isOpenMenu" class="mask" @click.self="handleClose" />
  <div
    :class="sidebarClassNames"
    class="sidebar__container"
    @click.self="handleClose"
  >
    <div id="sidebar__container__wrapper__hook" class="sidebar__container__wrapper">
      <div v-if="sidebarList.length === 0" class="empty">文章列表为空</div>
      <ul :key="groupIndex" v-for="(itemGroup, groupIndex) in sidebarList" class="list">
        <li class="category">{{ itemGroup.category }}</li>
        <li :key="itemIndex" v-for="(item, itemIndex) in itemGroup.items" :class="{ active: currentLink === item.link }" class="item">
          <div class="item__wrapper">
            <a :href="item.link" @click="sidebarStore.toggleOpenMenu()">
              <div class="title">{{ item.title }}</div>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @media (min-width: 768px) {
    .mask {
      display: none;
    }

    .empty {
      text-align: center;
      padding: 20px;
      color: var(--text-3);
      height: var(--md-text-height);
    }

    .sidebar__container {
      flex: 0 0 var(--sidebar-width);
      position: relative;
      width: auto;
      height: 100%;
      z-index: var(--layout-mask-zindex);
      background: var(--backdrop-bg-color);
      touch-action: none;
      box-shadow: 1px 0px 9px 0px rgba(0, 0, 0, 0.1);

      .sidebar__container__wrapper {
        width: 100%;
        height: 100%;
        background: var(--sidebar-bg);
        overflow-y: auto;
        border-right: 1px var(--sidebar-border-color) solid;
        touch-action: manipulation;

        &::-webkit-scrollbar {
          width: 9px;
          background: var(--scrollbar-bg);
        }

        &::-webkit-scrollbar-thumb {
          border-radius: var(--scrollbar-border-radius);
          background: var(--scrollbar-color);
        }

        .list {
          .category {
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px var(--sidebar-border-color) solid;
            text-align: center;
            font-size: 1em;
            font-weight: 600;
          }

          .item {
            height: var(--md-text-height);
            box-shadow: 0 1px 4px rgba(0,0,0,.03) inset;

            &.active {
              background: var(--sidebar-item-active-bg);
            }

            &:hover {
              background: var(--sidebar-item-active-bg);
            }

            .item__wrapper {
              height: 100%;
              border-bottom: 1px var(--sidebar-border-color) solid;
              position: relative;
              padding: 0 20px 0 20px;

              .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                position: relative;
                overflow: hidden;
                font-size: 0.8em;
                color: var(--sidebar-title-text);
                word-break: break-all;
                word-wrap: break-word;
                // white-space: nowrap;
                // text-overflow: ellipsis;
                cursor: default;
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  @media (max-width: 768px) {
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: var(--backdrop-bg-color);
      z-index: var(--layout-mask-zindex);
    }

    .empty {
      text-align: center;
      padding: 20px;
      color: var(--text-3);
      height: var(--md-text-height-mobile);
    }

    .sidebar__container {
      opacity: 0;
      position: fixed;
      top: 0;
      left: 0;
      width: var(--sidebar-width-mobile);
      height: 100%;
      touch-action: none;
      transform: translate(calc(0vw - var(--sidebar-width-mobile)), 0);
      transition: opacity 0.25s, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
      z-index: var(--layout-sidebar-zindex);

      .sidebar__container__wrapper {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--sidebar-bg);
        overflow-y: auto;
        border-right: 1px var(--sidebar-border-color) solid;
        touch-action: manipulation;

        &::-webkit-scrollbar {
          width: 9px;
          background: var(--scrollbar-bg);
        }

        &::-webkit-scrollbar-thumb {
          border-radius: var(--scrollbar-border-radius);
          background: var(--scrollbar-color);
        }

        .list {
          .category {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            border-bottom: 1px var(--sidebar-border-color) solid;
            text-align: center;
            font-size: 1em;
            font-weight: 600;
          }

          .item {
            height: var(--md-text-height-mobile);
            box-shadow: 0 1px 4px rgba(0,0,0,.03) inset;

            &.active {
              background: var(--sidebar-item-active-bg);
            }

            &:hover {
              background: var(--sidebar-item-active-bg);
            }

            .item__wrapper {
              height: 100%;
              border-bottom: 1px var(--sidebar-border-color) solid;
              position: relative;
              padding: 0 20px 0 20px;

              .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                position: relative;
                overflow: hidden;
                font-size: 0.7em;
                color: var(--sidebar-title-text);
                word-break: break-all;
                word-wrap: break-word;
                // white-space: nowrap;
                // text-overflow: ellipsis;
                cursor: default;
              }
            }
          }
        }
      }

      &.open__menu {
        opacity: 1;
        transform: translate(0, 0);
      }
    }
  }
</style>
