<template>
  <div ref="target" class="trend-cahrt-container"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

const target = ref(null)
let myChart = null

onMounted(() => {
  myChart = echarts.init(target.value)
  renderChart()

  // 窗口自适应（可选）
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})

const renderChart = () => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['月累计收益', '日收益曲线'],
      top: 0,
      right:0
    },
    grid: {
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    },
    // X轴 
    xAxis: {
      type: 'category',
      data: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06'],
      axisTick: {
        show: false
      }
    },
    // Y轴 
    yAxis: {
      type: 'value',
      min: 0,
      max: function (value) {
        return parseInt(value.max * 1.2)
      },
      axisLabel: {
        formatter: '{value} 万元'
      }
    },
    // 系列数据 
    series: [
      //柱状图
      {
        type: 'bar',
        name: '月累计收益',
        barWidth: 20,
        tooltip: {
          valueFormatter: function (value) {
            return value + '万元'
          }
        },
        data: [122.84, 80.41, 82.42, 122.64, 72.48, 138.92]
      },
      

      //曲线图

       {
        type: 'line',
        color:'#6EC6D0',
        smooth: true,
        name: '日收益曲线',
        tooltip: {
          valueFormatter: function (value) {
            return value + '万元'
          }
        },
        data: [61.42, 40.205, 41.21, 61.32, 36.24, 69.46]
      }
    ]
  }

  myChart.setOption(options)
}
</script>

<style scoped>
.trend-cahrt-container {
  height: 100%;
}
</style>