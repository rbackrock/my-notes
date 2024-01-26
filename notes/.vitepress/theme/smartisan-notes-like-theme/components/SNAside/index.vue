<script setup>
import {
  ref,
  shallowRef
} from 'vue'
import {
  onContentUpdated
} from 'vitepress'
import {
  getHeaderStructure
} from './composables/outline'
import {
  useAside
} from './composables/aside'
import { asideStore } from '../../store'
import OutlineItem from './OutlineItem.vue'

const headers = shallowRef([])
const headingScrollTopMapper = shallowRef({})
const isShow = ref(false)
const {
  contentRightValue,
  asideHeightValue
} = useAside()

function makeHeadingScrollTopMapper() {
  const mapper = {}
  const contentEl = document.getElementById('content__container__hook')
  const contentRect = contentEl.getBoundingClientRect()
  const headersEl = [
    ...document.querySelectorAll('.layout__container :where(h1, h2, h3, h4, h5, h6)')
  ]
  .filter(el => el.id && el.hasChildNodes())

  for (const headerEl of headersEl) {
    const headingRect = headerEl.getBoundingClientRect()
    mapper[headerEl.id] = Math.abs(contentRect.y - headingRect.y)
  }
  return mapper
}

function handleBackTop() {
  const contentEl = document.getElementById('content__container__hook')
  contentEl.scrollTo({ top: 0, behavior: 'smooth' })
  asideStore.toggleOpenDropdown()
}

function toggleShow() {
  isShow.value = !isShow.value
}

onContentUpdated(() => {
  headers.value = getHeaderStructure()
  headingScrollTopMapper.value = makeHeadingScrollTopMapper()
})
</script>

<template>
  <div
    :class="{ mobile__show: asideStore.isOpenDropdown, hiddenPC: headers.length === 0, show: isShow }"
    id="aside__wrapper__hook" class="aside__wrapper"
  >
    <div class="aside__container">
      <div class="to__top">
        <div class="to__top__wrapper" @click="handleBackTop">回到顶部</div>
      </div>
      <div v-if="headers.length > 0" class="aside__container__wrapper">
        <OutlineItem :headers="headers" :heading-scroll-top-mapper="headingScrollTopMapper" />
      </div>
    </div>

    <div class="bookmark" @click="toggleShow" />
  </div>
</template>

<style lang="less" scoped>
  @media (min-width: 768px) {
    .aside__wrapper {
      position: absolute;
      // top: 0;
      bottom: 0;
      left: v-bind(contentRightValue);
      z-index: -1;
      transition: transform 0.25s, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);

      &.show {
        transform: translate(0, v-bind(asideHeightValue));
      }

      &.hiddenPC {
        display: none;
      }

      .aside__container {
        .to__top {
          display: none;
        }

        .aside__container__wrapper {
          width: var(--aside-width);
          padding: 26px 26px;
          font-size: 0.8em;
          border-radius: 0 0 3px 3px;
          background-image: linear-gradient(#5f5450, #716661);
          box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.1);
          color: #fff;

          .list {

            &.nested {
              padding: 0 0 0 16px;
            }
            .item {
              .item__wrapper {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }

      .bookmark {
        position: absolute;
        bottom: -31px;
        right: 9px;
        width: 36px;
        height: 36px;
        background-image: url('./bookmark.svg#svgView(preserveAspectRatio(none)');
        background-repeat: no-repeat;
        background-position: 100% 100%;
        background-size: cover;
        cursor: pointer;
      }
    }
  }
</style>

<style lang="less" scoped>
  @media (max-width: 768px) {
    .aside__wrapper {
      position: fixed;
      background: linear-gradient(#5f5450, #716661);
      width: 90%;
      top: calc(var(--header-height-mobile) + var(--header-height) + 1vh);
      left: 50%;
      transform: translate(-50%, -20px);
      border-radius: 8px;
      color: #fff;
      opacity: 0;
      z-index: -1;
      transition: all 0.25s, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);

      .aside__container {
        .to__top {
          display: block;
          padding: 0 16px;
          border-bottom: 1px solid #b9a691;

          .to__top__wrapper {
            line-height: 48px;
            font-size: 0.9em;
          }
        }

        .aside__container__wrapper {
          padding: 8px 0;
          max-height: calc(100vh - var(--header-height-mobile) - var(--header-height) - 1vh - 7vh);
          overflow: auto;

          &::-webkit-scrollbar {
            width: 9px;
            background: var(--scrollbar-color);
          }

          &::-webkit-scrollbar-thumb {
            border-radius: var(--scrollbar-border-radius);
            background: var(--scrollbar-bg);
          }

          .list {
            &.nested {
              padding: 0 16px 0 16px;
            }

            .item {
              .item__wrapper {
                line-height: 32px;
                font-size: 0.8em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }

      &.mobile__show {
        opacity: 1;
        z-index: 3;
        transform: translate(-50%, 0);
        transition: all 0.25s, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
      }
    }

    .bookmark {
      display: none;
    }
  }
</style>