<template>
  <span class="motto"></span>
</template>

<style lang="less" scoped>
  .motto {
    display: inline-block;
    height: 1px;
    width: 9px;
    border-bottom: 2px solid;
    opacity: 1;

    animation: blink 0.9s infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes blink {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes blink {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>