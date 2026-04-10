<template>
  <el-card :body-style="{ padding: 0 }">
    <!-- 容器放 card 内部 -->
    <div ref="target" class="container"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const charData = ref([
  { value: 1048, name: '华北' },
  { value: 735, name: '东北' },
  { value: 580, name: '华东' },
  { value: 484, name: '中南' },
  { value: 300, name: '西南' },
  { value: 251, name: '西北' }
])

const target = ref(null)
let myChart = null // 👈 全局定义，才能在 renderChart 里使用

onMounted(() => {
  myChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  const options = {
    title: {
      text: '大区营销示图'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 万元'
    },
    // 👇 修复：series 拼写正确
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          formatter: '{b}: {d}% ',
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '22',
            fontWeight: 'bold'
          }
        },
        data: charData.value
      }
    ]
  }
  myChart.setOption(options)
}
</script>

<style scoped>
.container {
  height: 240px;
}
</style>