<script setup>
import {
  watch
} from 'vue'
import {
  useRoute
} from 'vitepress'
import {
  useCalcFixContentElementHeight
} from '../../composables/content'

useCalcFixContentElementHeight()
const route = useRoute()

watch(route, () => {
  const contentEl = document.getElementById('content__container__hook')
  contentEl.scrollTo({ top: 0})
})

</script>

<template>
  <div id="content__container__hook" class="content__container">
    <div  class="content__container__wrapper">
      <div class="content__block__wrapper">
        <slot name="notFound" />
        <Content v-if="!$slots.notFound" ref="el" class="sn content__block" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @media (min-width: 768px) {
    .content__container {
      flex: 0 0 calc(100% - var(--sidebar-width));
      height: 100%;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 9px;
        background: var(--scrollbar-bg);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: var(--scrollbar-border-radius);
        background: var(--scrollbar-color);
      }

      .content__container__wrapper {
        position: relative;
        min-height: calc(100vh - var(--header-height));

        background-color: var(--content-bg);
        background-image: url(./grid.jpg);
        background-repeat: repeat;
        background-position: left top;
        background-size: 100% var(--md-text-height);

        .content__block__wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          min-height: calc(100vh - var(--header-height));
          
          padding-top: calc(1 * var(--md-text-height));
          padding-right: var(--content-wrapper-padding-right);
          padding-left: var(--content-wrapper-padding-left);
          padding-bottom: calc(3 * var(--md-text-height));

          background-image: url(./note_detail_edge.jpg);
          background-repeat: repeat-y;
          background-size: auto var(--md-text-height);

          .content__block {
            flex: 1;
            max-width: 900px;
            width: 100%;
          }
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  @media (max-width: 768px) {
    .content__container {
      flex: 1;
      height: 100%;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 9px;
        background: var(--scrollbar-bg);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: var(--scrollbar-border-radius);
        background: var(--scrollbar-color);
      }

      .content__container__wrapper {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        min-height: calc(100vh - var(--header-height) * 2);

        background-color: var(--content-bg);
        background-image: url(./grid.jpg);
        background-repeat: repeat;
        background-position: left top;
        background-size: 100% var(--md-text-height-mobile);

        .content__block__wrapper {
          width: 100%;

          .content__block {
            width: 100%;
            min-height: calc(100vh - var(--header-height) * 2);
            flex: 1;
            padding-top: calc(1 * var(--md-text-height-mobile));
            padding-right: var(--content-wrapper-padding-right-mobile);
            padding-left: var(--content-wrapper-padding-left-mobile);
            padding-bottom: calc(3 * var(--md-text-height-mobile));

            background-image: url(./note_detail_edge.jpg);
            background-repeat: repeat-y;
            background-size: auto var(--md-text-height-mobile);
          }
        }
      }
    }
  }
</style>
