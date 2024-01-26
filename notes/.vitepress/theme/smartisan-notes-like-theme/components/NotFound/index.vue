<script setup>
import {
  onMounted
} from 'vue'
import {
  useData
} from '../../composables/data'
import {
  useCalcFixSidebarElementHeight
} from '../../composables/sidebar'

const {
  theme
} = useData()
const {
  fixContentElementHeight
} = useCalcFixSidebarElementHeight()

onMounted(() => {
  fixContentElementHeight()
})
</script>

<template>
  <div class="container">
    <div class="tips__container">
      <div class="tips__container__wrapper">
        <div class="note__border">
          <div class="adorn w__top_left"></div>
          <div class="adorn w__top_right"></div>
          <div class="adorn w__bottom__right"></div>
          <div class="adorn w__bottom__left"></div>
          <div class="content">
            <p>{{ theme.notFoundMessage }}</p>
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
    .container {
      flex: 1;
      position: relative;

      .tips__container {
        position: absolute;
        width: 600px;
        top: 0;
        left: 50%;
        transform: translate(-50%, 9vh);
        
        .tips__container__wrapper {
          color: #645647;
          background: #fffcf6;
          border-top: 1px solid #fffcf6;
          border-radius: 4px;
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
    .container {
      flex: 1;
      position: relative;

      .tips__container {
        position: absolute;
        width: 90vw;
        top: 0;
        left: 50%;
        transform: translate(-50%, 9vh);
        
        .tips__container__wrapper {
          color: #645647;
          background: #fffcf6;
          border-top: 1px solid #fffcf6;
          border-radius: 4px;
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