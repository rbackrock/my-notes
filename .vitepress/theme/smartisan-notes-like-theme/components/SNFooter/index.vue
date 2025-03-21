<script setup>
import { useData } from 'vitepress'

const {
  theme
} = useData()
</script>

<template>
  <footer class="footer">
    <div class="footer__wrapper"><span class="info"><a href="https://beian.miit.gov.cn">{{ theme.icp }}</a></span></div>
  </footer>
</template>

<style lang="less" scoped>
.footer {
  position: relative;
  height: var(--footer-height);
  box-shadow: rgba(0,0,0,.15) 0 1px 8px;
  background: linear-gradient(#716661,#5f5450);

  .footer__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: var(--footer-title-fontsize);
    font-weight: 450;

    .info {
      padding: 0 0.4vw 0 0;
    }
  }
}
</style>
