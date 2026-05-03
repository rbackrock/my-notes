---
---

### 组合式 setup 中使用组件

```vue
/* HelloWorld.vue */

<script setup>
import { ref } from 'vue'

const props = defineProps({
  msg: {
    type: String,
    default: ''
  }
})

function show() {
  console.log(`被点击了，这是${props.msg}`)
}

defineExpose({
  show
})
</script>

<template>
  <div>{{ msg }}</div>
</template>
```

```vue
<script setup>
import { ref, h, defineAsyncComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const source = ref([])
const components = [
  /**
   * 常规引用组件的方式
   */
  {
    refSelf: null,
    component: h(
      HelloWorld,
      {
        msg: '这是组件列表中的第一个组件'
      }
    ),
    onClickHandle() {
      this.refSelf.show()
    }
  },
  /**
   * 通过组件地址引入组件的方式
   */
  {
    refSelf: null,
    component: h(
      defineAsyncComponent(() =>
        import('/src/components/HelloWorld.vue')
      ),
      {
        msg: '这是组件列表中的第二个组件'
      }
    ),
    onClickHandle() {
      this.refSelf.show()
    }
  },
]
components.forEach(it => {
  it.onClickHandle = it.onClickHandle.bind(it)
})

source.value = components
</script>

<template>
  <component
    :key="idx"
    v-for="(it, idx) in source"
    :ref="el => { it.refSelf = el }"
    :is="it.component"
    @click="it.onClickHandle"
  />
</template>
```

### 在 echarts 中使用组件提供给例如 tooltip 的 formatter

也有其他办法，例如使用 `renderToString` 函数或者 `createVNode` 和 `render` 函数构建之后拿取 html 代码，为了尽可能不破坏 Vue 组件关于自身的创建和销毁管理，所以只记录这一种办法

```vue
/* ChartTooltip.vue */

<script setup>
import { ref } from 'vue'

const props = defineProps({
  msg: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="tooltip__contianer">{{ msg }}</div>
</template>

<style scoped lang="less">
  .tooltip__contianer {
    padding: 22px 22px;
    background: #adacac;
    color: #fff;
  }
</style>
```

```js
/* useComponent.js */
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import ChartTooltip from './components/ChartTooltip.vue'

echarts.use([GridComponent, TooltipComponent, BarChart, CanvasRenderer])

export default function(chartContainerRef, chartTooltipRef) {
  const chartTooltipMsg = ref('')

  onMounted(() => {
    const chartInstance = echarts.init(chartContainerRef.value)
    const chartOpts = {
      tooltip: {
        show: true,
        formatter: params => {
          const { name, value } = params
          chartTooltipMsg.value = `name=${name}, value=${value}`
          return chartTooltipRef.value.$el
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: [120, 200, 150, 80, 70, 110, 130],
        }
      ]
    }
    chartInstance.setOption(chartOpts)
  })

  return {
    ChartTooltip,
    chartTooltipMsg
  }
}
```

```vue
<script setup>
import { ref } from 'vue'
import ChartTooltip from './components/ChartTooltip.vue'
import useComponent from './useComponent.js'

const chartContainerRef = ref(null)
const chartTooltipRef = ref(null)
const { chartTooltipMsg } = useComponent(chartContainerRef, chartTooltipRef)
</script>

<template>
  <div ref="chartContainerRef" class="main__container"></div>
  <div style="display: none;">
    <ChartTooltip ref="chartTooltipRef" :msg="chartTooltipMsg" />
  </div>
</template>

<style scoped lang="less">
  .main__container {
    width: 100vw;
    height: 100vh;
  }
</style>

```