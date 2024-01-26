<script setup>
import CanvasWrapper from '../../CanvasWrapper/index.vue'
import useScene from './scene'

const {
  sceneRef
} = useScene()
</script>

<template>
  <CanvasWrapper>
    <div ref="sceneRef" class="scene" />
  </CanvasWrapper>
</template>

<style lang="less" scoped>
  .scene {
    width: 100%;
    height: 100%;
  }
</style>