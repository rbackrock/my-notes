<script setup>
import DynamicUnderline from '../DynamicUnderline/index.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String,
    default: '#c59970'
  },
  color: {
    type: String,
    default: '#fff'
  }
})
</script>

<template>
  <Transition>
    <div v-show="props.loading" class="canvas__loading">
      <span class="loading__text">Loading&nbsp;<DynamicUnderline /></span>
    </div>
  </Transition>
</template>

<style lang="less" scoped>
  .canvas__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 1.3em;
    background: v-bind('props.backgroundColor');
    color: v-bind('props.color');

    .loading__text {
      display: inline-block;
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.6s ease;
  }

  .v-enter-from {
    opacity: 1;
  }

  .v-leave-to {
    opacity: 0;
  }
</style>
