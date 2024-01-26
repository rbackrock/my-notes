<script setup>
import { useData } from './composables/data'
import SNHeader from './components/SNHeader/index.vue'
import SNSidebar from './components/SNSidebarNav/index.vue'
import SNContent from './components/SNContent/index.vue'
import NotFound from './components/NotFound/index.vue'

const { frontmatter, page } = useData()
</script>

<template>
  <div v-if="page.isNotFound" class="layout__container">
    <SNHeader />
    <div class="body__container">
      <SNSidebar />
      <SNContent #notFound>
        <NotFound />
      </SNContent>
    </div>
  </div>
  <div v-else-if="frontmatter.layout === 'blank'" class="layout__container">
    <Content />
  </div>
  <div v-else class="layout__container">
    <SNHeader />
    <div class="body__container">
      <SNSidebar />
      <SNContent />
    </div>
  </div>
</template>

<style lang="less" scoped>
  .layout__container {
    background: #F0DAB3 url(./note_bg.jpg);
    background-repeat: repeat;
    color: var(--text-1);
    background-color: var(--bg);
  }
</style>

<style lang="less" scoped>
  @media (min-width: 768px) {
    .layout__container {
      position: relative;
      width: 100%;
      height: 100vh;
      z-index: var(--layout-zindex);

      .body__container {
        max-width: 2000px;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);

        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        width: 100%;
        height: calc(100% - var(--header-height));
        z-index: var(--body-container-zindex);
      }
    }
  }
</style>

<style lang="less" scoped>
  @media (max-width: 768px) {
    .layout__container {
      position: relative;
      width: 100%;
      height: 100vh;
      z-index: var(--layout-zindex);

      .body__container {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        width: 100%;
        height: calc(100% - var(--header-height) * 2);
        z-index: 1;
      }
    }
  }
</style>