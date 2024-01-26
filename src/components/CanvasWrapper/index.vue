<script setup>
</script>

<template>
  <div class="canvas__wrapper">
    <slot />
  </div>
</template>

<style lang="less" scoped>
  .canvas__wrapper {
    width: 100%;
    height: 56vh;
    max-height: 600px;
    border: 9px solid #fff;
    transform: translate(0, 12vh);
    box-shadow: 0 3px 9px 0px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    .canvas__wrapper {
      height: 30vh;
    }
  }
</style>