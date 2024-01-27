<script setup>
import CanvasWrapper from '../../CanvasWrapper/index.vue'
import useScene from './scene'

const {
  cavansRef
} = useScene()
</script>

<template>
  <CanvasWrapper>
    <div class="webgl__wrapper">
      <canvas ref="cavansRef" class="webgl" />
    </div>
  </CanvasWrapper>
</template>

<style lang="less" scoped>
  .webgl__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background: #c59970;

    .webgl {
      width: 100%;
      height: 100%;
    }
  }
  
</style>