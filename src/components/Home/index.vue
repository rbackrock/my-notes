<script setup>
import { useData } from 'vitepress'

const {
  theme
} = useData()
</script>

<template>
  <div class="home__container">
    <div class="tips__container">
      <div class="tips__container__wrapper">
        <div class="note__border">
          <div class="adorn w__top_left"></div>
          <div class="adorn w__top_right"></div>
          <div class="adorn w__bottom__right"></div>
          <div class="adorn w__bottom__left"></div>
          <div class="content">
            <div>欢迎您，我是{{ theme.who }}</div>
            <br>
            <div>喜欢计算机，愿望之一是可以撸代码撸到老</div>
            <br>
            <div>点击<a href="https://github.com/rbackrock" target="_blank" class="a__wrapper">这里</a>可以访问我的 Github</div>
            <br>
            <div>感谢你的访问</div>
          </div>
        </div>
        <div class="via">
          <div class="tips__p1">样式完全参照于锤子便签</div>
          <div class="tips__p2">{{ theme.icp }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @media (min-width: 768px) {
    .home__container {
      width: 100%;
      height: 100%;

      .tips__container {
        position: absolute;
        width: 600px;
        top: 0;
        left: 50%;
        transform: translate(-50%, 9vh);
        
        .tips__container__wrapper {
          color: #645647;
          background: #fff;
          border-top: 1px solid #fffcf6;
          border-radius: 0px;
          box-shadow: 0 3px 8px rgba(69,18,10,.4);

          .note__border {
            position: relative;
            border: 2px solid #e9e5d9;
            padding: 2px;
            margin: 33px 19px 0 19px;

            .adorn {
              position: absolute;
              width: 2px;
              height: 2px;
              box-sizing: content-box;
              border: 2px solid #e9e5d9;

              &.w__top_left {
                top: -6px;
                left: -6px;
              }

              &.w__top_right {
                top: -6px;
                right: -6px;
              }

              &.w__bottom__right {
                bottom: -6px;
                right: -6px;
              }

              &.w__bottom__left {
                bottom: -6px;
                left: -6px;
              }
            }

            .content {
              position: relative;
              border: 2px solid #e9e5d9;
              padding: 30px 60px 30px 60px;

              .a__wrapper{
                padding: 0 2px;
                text-underline-offset: 4px;
              }
            }
          }

          .via {
            display: flex;
            align-items: stretch;
            justify-content: space-between;
            padding: 10px 15px 15px 15px;
            color: #ded8c5;
            font-size: 0.8em;
          }
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  @media (max-width: 768px) {
    .home__container {
      width: 100%;
      height: 100%;

      .tips__container {
        position: absolute;
        width: 90vw;
        top: 0;
        left: 50%;
        transform: translate(-50%, 9vh);
        
        .tips__container__wrapper {
          color: #645647;
          background: #fff;
          border-top: 1px solid #fffcf6;
          border-radius: 0;
          box-shadow: 0 3px 8px rgba(69,18,10,.4);

          .note__border {
            position: relative;
            border: 2px solid #e9e5d9;
            padding: 2px;
            margin: 33px 19px 0 19px;

            .adorn {
              position: absolute;
              width: 2px;
              height: 2px;
              box-sizing: content-box;
              border: 2px solid #e9e5d9;

              &.w__top_left {
                top: -6px;
                left: -6px;
              }
              
              &.w__top_right {
                top: -6px;
                right: -6px;
              }

              &.w__bottom__right {
                bottom: -6px;
                right: -6px;
              }

              &.w__bottom__left {
                bottom: -6px;
                left: -6px;
              }
            }

            .content {
              position: relative;
              border: 2px solid #e9e5d9;
              padding: 30px 35px 30px 35px;

              .a__wrapper{
                padding: 0 2px;
                text-underline-offset: 4px;
              }
            }
          }

          .via {
            display: flex;
            align-items: stretch;
            justify-content: space-between;
            padding: 10px 15px 15px 15px;
            color: #ded8c5;
            font-size: 0.8em;
          }
        }
      }
    }
  }
</style>