<template>
  <el-card class="container" :body-style="{ padding: '12px' }">
    <div ref="target" class="chart-container"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 数据（完全保留你给的格式）
const data = ref([
  { timeStr: '0点', income: '0.33', expense: '2.98', balance: '-2.65' },
  { timeStr: '3点', income: '5.68', expense: '6.33', balance: '-0.65' },
  { timeStr: '6点', income: '0.95', expense: '5.12', balance: '-4.17' },
  { timeStr: '9点', income: '8.07', expense: '2.42', balance: '5.65' },
  { timeStr: '12点', income: '3.46', expense: '5.56', balance: '-2.1' },
  { timeStr: '15点', income: '2.24', expense: '5.55', balance: '-3.31' },
  { timeStr: '18点', income: '0.43', expense: '3.45', balance: '-3.02' },
  { timeStr: '21点', income: '0.23', expense: '6.07', balance: '-3.16' },
])

const target = ref(null)
let myChart = null

onMounted(() => {
  myChart = echarts.init(target.value)
  renderChart()
  // 自适应窗口
  window.addEventListener('resize', () => myChart.resize())
})

const renderChart = () => {
  // 把字符串转成数字，避免渲染异常
  const incomeData = data.value.map(item => Number(item.income))
  const expenseData = data.value.map(item => Number(item.expense))
  const balanceData = data.value.map(item => Number(item.balance))
  const timeData = data.value.map(item => item.timeStr)

  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['收益', '支出', '结余'],
      right: 10
    },
    grid: {
      top: 40,
      right: 60,
      bottom: 10,
      left: 30,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: timeData,
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value} 元' }
    },
    series: [
      {
        name: '收益',
        type: 'bar',
        data: incomeData,
        itemStyle: { color: '#6DC473' },
        label: { show: true, position: 'top' }
      },
      {
        name: '支出',
        type: 'bar',
        data: expenseData,
        itemStyle: { color: '#F56C6C' },
        label: { show: true, position: 'top' }
      },
      {
        name: '结余',
        type: 'line',
        data: balanceData,
        itemStyle: { color: '#409EFF' },
        label: { show: true, position: 'top' }
      }
    ]
  }

  myChart.setOption(options)
}
</script>

<style scoped>
.container {
  height: 418px;
}
.chart-container {
  height: 100%;
  width: 100%;
}
</style>