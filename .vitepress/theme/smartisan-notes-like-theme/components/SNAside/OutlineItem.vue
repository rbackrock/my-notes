<script setup>
  import { asideStore } from '../../store'

  const props = defineProps({
    headers: Array,
    headingScrollTopMapper: Object
  })

  function onClick(link) {
    const id = link.split('#')[1]
    const contentEl = document.getElementById('content__container__hook')
    const {
      headingScrollTopMapper
    } = props

    contentEl.scrollTo({ top: headingScrollTopMapper[decodeURIComponent(id)], behavior: 'smooth' })
    asideStore.toggleOpenDropdown()
  }
</script>

<template>
  <ul class="list nested">
    <li v-for="{ children, link, title } in props.headers" class="item">
      <div class="item__wrapper outline-link" :href="link" :title="title" @click.stop.prevent="onClick(link)">{{ title }}</div>
      <template v-if="children?.length">
        <OutlineItem :headers="children" :heading-scroll-top-mapper="props.headingScrollTopMapper" />
      </template>
    </li>
  </ul>
</template>

<style lang="less" scoped>
  .outline-link {
    display: block;
    font-weight: 400;
    color: #f1ece1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.5s;
    cursor: pointer;
  }

  .outline-link:hover,
  .outline-link.active {
    color: #fff;
    transition: color 0.25s;
  }

  .outline-link.nested {
    padding-left: 13px;
  }

@media (min-width: 768px) {
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

@media (max-width: 768px) {
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
</style>