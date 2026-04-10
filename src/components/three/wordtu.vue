<template>
  <el-card :body-style="{ padding: 0 }">
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { ref, onMounted } from 'vue'
// import wordcloudBg from '../assets/vue.svg'

const randomRGB = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgb(${r},${g},${b})`
}

const wordCloudData = ref([
  { name: 'continuous', value: 101.42977866484773 },
  { name: 'controller', value: 24.899799195977465 },
  { name: 'series', value: 523.8988451981928 },
  { name: 'gauge', value: 110.95494581135173 },
  { name: 'detail', value: 34.72751079837067 },
  { name: 'piecewise', value: 69.8927750200262 },
  { name: 'textStyle', value: 179.70531433432902 },
  { name: 'axis', value: 88.2345678901234 },
  { name: 'dataZoom', value: 45.6789012345678 },
  { name: 'tooltip', value: 123.456789012345 },
  { name: 'legend', value: 76.5432109876543 },
  { name: 'grid', value: 99.8877665544332 },
  { name: 'visualMap', value: 55.4433221100998 },
  { name: 'markPoint', value: 22.3344556677889 },
  { name: 'markLine', value: 66.7788990011223 },
  { name: 'toolbox', value: 33.2211009988776 },
  { name: 'brush', value: 44.5566778899001 },
  { name: 'timeline', value: 77.6655443322110 },
  { name: 'graph', value: 88.9900112233445 },
  { name: 'map', value: 55.2233445566778 },
  { name: 'lines', value: 33.5566778899001 },
  { name: 'effectScatter', value: 66.2233445566778 },
  { name: 'heatmap', value: 99.5544332211009 },
  { name: 'bar', value: 44.8877665544332 },
  { name: 'line', value: 77.2233445566778 },
  { name: 'scatter', value: 22.5566778899001 },
  { name: 'k', value: 55.8877665544332 },
  { name: 'radar', value: 88.2233445566778 },
  { name: 'boxplot', value: 33.5566778899001 },
  { name: 'parallel', value: 66.8877665544332 },
  { name: 'sankey', value: 99.2233445566778 },
  { name: 'funnel', value: 44.5566778899001 },
  { name: 'custom', value: 77.8877665544332 },
  { name: 'themeRiver', value: 22.2233445566778 },
  { name: ' Candlestick', value: 55.5566778899001 },
  { name: 'radar', value: 88.5566778899001 },
  { name: 'pictorialBar', value: 33.8877665544332 },
  { name: 'themeRiver', value: 66.2233445566778 },
  { name: 'graph', value: 99.5566778899001 },
  { name: 'map', value: 44.2233445566778 },
  { name: 'lines', value: 77.5566778899001 },
  { name: 'effectScatter', value: 22.8877665544332 },
  { name: 'heatmap', value: 55.2233445566778 },
  { name: 'bar', value: 88.5566778899001 },
  { name: 'line', value: 33.2233445566778 },
  { name: 'scatter', value: 66.5566778899001 },
  { name: 'k', value: 99.8877665544332 },
  { name: 'radar', value: 44.2233445566778 },
  { name: 'boxplot', value: 77.5566778899001 },
  { name: 'parallel', value: 22.8877665544332 },
  { name: 'sankey', value: 55.2233445566778 },
  { name: 'funnel', value: 88.5566778899001 },
  { name: 'custom', value: 33.2233445566778 },
  { name: 'themeRiver', value: 66.5566778899001 },
  { name: ' Candlestick', value: 99.8877665544332 },
  { name: 'radar', value: 44.2233445566778 },
  { name: 'pictorialBar', value: 77.5566778899001 },
  { name: 'themeRiver', value: 22.8877665544332 },
  { name: 'graph', value: 55.2233445566778 },
  { name: 'map', value: 88.5566778899001 },
  { name: 'lines', value: 33.2233445566778 },
  { name: 'effectScatter', value: 66.5566778899001 },
  { name: 'heatmap', value: 99.8877665544332 },
  { name: 'bar', value: 44.2233445566778 },
  { name: 'line', value: 77.5566778899001 },
  { name: 'scatter', value: 22.8877665544332 },
  { name: 'k', value: 55.2233445566778 },
  { name: 'radar', value: 88.5566778899001 },
  { name: 'boxplot', value: 33.2233445566778 },
  { name: 'parallel', value: 66.5566778899001 },
  { name: 'sankey', value: 99.8877665544332 },
  { name: 'funnel', value: 44.2233445566778 },
  { name: 'custom', value: 77.5566778899001 },
  { name: 'themeRiver', value: 22.8877665544332 },
  { name: ' Candlestick', value: 55.2233445566778 },
  { name: 'radar', value: 88.5566778899001 },
  { name: 'pictorialBar', value: 33.2233445566778 },
  { name: 'themeRiver', value: 66.5566778899001 },
  { name: 'graph', value: 99.8877665544332 },
  { name: 'map', value: 44.2233445566778 },
  { name: 'lines', value: 77.5566778899001 },
  { name: 'effectScatter', value: 22.8877665544332 },
  { name: 'heatmap', value: 55.2233445566778 },
  { name: 'bar', value: 88.5566778899001 },
  { name: 'line', value: 33.2233445566778 },
  { name: 'scatter', value: 66.5566778899001 },
  { name: 'k', value: 99.8877665544332 },
  { name: 'radar', value: 44.2233445566778 },
  { name: 'boxplot', value: 77.5566778899001 },
  { name: 'parallel', value: 22.8877665544332 },
  { name: 'sankey', value: 55.2233445566778 },
  { name: 'funnel', value: 88.5566778899001 },
  { name: 'custom', value: 33.2233445566778 },
  { name: 'themeRiver', value: 66.5566778899001 },
  { name: ' Candlestick', value: 99.8877665544332 },
  { name: 'radar', value: 44.2233445566778 },
  { name: 'pictorialBar', value: 77.5566778899001 },
  { name: 'themeRiver', value: 22.8877665544332 },
  { name: 'graph', value: 55.2233445566778 },
  { name: 'map', value: 88.5566778899001 },
  { name: 'lines', value: 33.2233445566778 },
  { name: 'effectScatter', value: 66.5566778899001 },
  { name: 'heatmap', value: 99.8877665544332 },
  { name: 'bar', value: 44.2233445566778 },
  { name: 'line', value: 77.5566778899001 },
  { name: 'scatter', value: 22.8877665544332 },
  { name: 'k', value: 55.2233445566778 },
  { name: 'radar', value: 88.5566778899001 },
  { name: 'boxplot', value: 33.2233445566778 },
  { name: 'parallel', value: 66.5566778899001 },
  { name: 'sankey', value: 99.8877665544332 },
  { name: 'funnel', value: 44.2233445566778 },
  { name: 'custom', value: 77.5566778899001 },
  { name: 'themeRiver', value: 22.8877665544332 },
  { name: ' Candlestick', value: 55.2233445566778 },
  { name: 'radar', value: 88.5566778899001 },
  { name: 'pictorialBar', value: 33.2233445566778 },
  { name: 'themeRiver', value: 66.5566778899001 },
  { name: 'graph', value: 99.8877665544332 },
  { name: 'map', value: 44.2233445566778 },
  { name: 'lines', value: 77.5566778899001 },
  { name: 'effectScatter', value: 22.8877665544332 },
  { name: 'heatmap', value: 55.2233445566778 },
  { name: 'bar', value: 88.5566778899001 },
  { name: 'line', value: 33.2233445566778 },
  { name: 'scatter', value: 66.5566778899001 },
  { name: 'k', value: 99.8877665544332 },
  { name: 'radar', value: 44.2233445566778 },
  { name: 'boxplot', value: 77.5566778899001 },
  { name: 'parallel', value: 22.8877665544332 },
  { name: 'sankey', value: 55.2233445566778 },
  { name: 'funnel', value: 88.5566778899001 },
  { name: 'custom', value: 33.2233445566778 },
  { name: 'themeRiver', value: 66.5566778899001 },
  { name: ' Candlestick', value: 99.8877665544332 },
  { name: 'radar', value: 44.2233445566778 },
  { name: 'pictorialBar', value: 77.5566778899001 },
  { name: 'themeRiver', value: 22.8877665544332 },
])

const target = ref(null)
let myChart = null

onMounted(() => {
  myChart = echarts.init(target.value)
  renderChart()
  window.addEventListener('resize', () => myChart.resize())
})

const renderChart = () => {
  // const maskImage=new Image()
  // maskImage.src=wordcloudBg


  const options = {
    title: {
      text: '练习两年半的文档云图',
      left: 'center'
    },
    series: [
      {
        type: 'wordCloud',
        sizeRange: [12, 60], 
        rotationRange: [0, 0],
        gridSize: 8,
        // maskImage: maskImage,
        layoutAnimation: true,
        textStyle: {
          color() {
            return randomRGB()
          }
        },
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color: '#000'
          }
        },
        data: wordCloudData.value
      }
    ]
  }
  myChart.setOption(options)
}
</script>

<style scoped>
.container {
  height: 240px;
  width: 100%;
}
</style>