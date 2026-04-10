<template>
  <el-card class="container">
    <div class="title">营收业绩图示</div>
    <div ref="target" class="box"></div>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// 导入bmap模块
import 'echarts/extension/bmap/bmap.js'
import * as echarts from 'echarts'

const charData = ref([
  { name: "北京", value: [116.403874, 39.915168, 286] },
  { name: "上海", value: [121.473701, 31.230416, 265] },
  { name: "广州", value: [113.264434, 23.129162, 243] },
  { name: "深圳", value: [114.057868, 22.543096, 231] },
  { name: "杭州", value: [120.153576, 30.287459, 217] },
  { name: "南京", value: [118.796877, 32.060255, 205] },
  { name: "成都", value: [104.065735, 30.659462, 198] },
  { name: "重庆", value: [106.551559, 29.563009, 189] },
  { name: "武汉", value: [114.305544, 30.593099, 176] },
  { name: "西安", value: [108.939838, 34.341275, 165] },
  { name: "天津", value: [117.200982, 39.084159, 154] },
  { name: "苏州", value: [120.619508, 31.298633, 148] },
  { name: "郑州", value: [113.625367, 34.746599, 139] },
  { name: "长沙", value: [112.938814, 28.228214, 130] },
  { name: "东莞", value: [113.746250, 23.046220, 125] },
  { name: "佛山", value: [113.128668, 23.025974, 118] },
  { name: "宁波", value: [121.549377, 29.868337, 112] },
  { name: "青岛", value: [120.382639, 36.106210, 106] },
  { name: "合肥", value: [117.282699, 31.866942, 99] },
  { name: "昆明", value: [102.712251, 25.040609, 93] },
  { name: "福州", value: [119.306239, 26.075302, 88] },
  { name: "厦门", value: [118.089140, 24.479830, 82] },
  { name: "济南", value: [117.000923, 36.675808, 77] },
  { name: "温州", value: [120.672111, 28.000575, 72] },
  { name: "南宁", value: [108.320004, 22.824020, 68] },
  { name: "长春", value: [125.324506, 43.886846, 63] },
  { name: "哈尔滨", value: [126.642464, 45.756967, 59] },
  { name: "太原", value: [112.548887, 37.870590, 55] },
  { name: "石家庄", value: [114.502464, 38.045474, 51] },
  { name: "贵阳", value: [106.713477, 26.578350, 47] },
  { name: "南昌", value: [115.892151, 28.676493, 44] },
  { name: "无锡", value: [120.311998, 31.507945, 40] },
  { name: "大连", value: [121.618622, 38.914592, 37] },
  { name: "烟台", value: [121.397898, 37.535035, 34] },
  { name: "兰州", value: [103.834170, 36.061382, 31] },
  { name: "惠州", value: [114.412599, 23.111429, 28] },
  { name: "中山", value: [113.382510, 22.522244, 26] },
  { name: "台州", value: [121.428551, 28.652759, 23] },
  { name: "保定", value: [115.483390, 38.873888, 300] },
  { name: "徐州", value: [117.185760, 34.264891, 19] },
  { name: "嘉兴", value: [120.752872, 30.757239, 17] },
  { name: "绍兴", value: [120.586394, 30.041177, 16] },
  { name: "潍坊", value: [119.107065, 36.770793, 14] },
  { name: "扬州", value: [119.420368, 32.393191, 13] },
  { name: "镇江", value: [119.452758, 32.204408, 12] },
  { name: "泰州", value: [119.910155, 32.491074, 11] },
  { name: "盐城", value: [120.139508, 33.377631, 10] },
  { name: "淮安", value: [119.021243, 33.596746, 9] },
  { name: "连云港", value: [119.161618, 34.591232, 8] },
  { name: "宿迁", value: [118.267340, 33.958363, 7] },
  { name: "常州", value: [119.957112, 31.780992, 15] },
  { name: "南通", value: [120.864612, 32.015560, 18] },
  { name: "金华", value: [119.649508, 29.089624, 22] },
  { name: "湖州", value: [120.091682, 30.896810, 24] },
  { name: "舟山", value: [122.106863, 30.017062, 25] },
  { name: "衢州", value: [118.682432, 28.953779, 27] },
  { name: "丽水", value: [119.921782, 28.466460, 29] },
  { name: "芜湖", value: [118.437819, 31.354119, 30] },
  { name: "蚌埠", value: [117.367970, 32.930894, 32] },
  { name: "淮南", value: [117.000753, 32.648357, 33] },
  { name: "马鞍山", value: [118.499992, 31.680808, 35] },
  { name: "淮北", value: [116.790279, 33.953960, 36] },
  { name: "铜陵", value: [117.810033, 30.940119, 38] },
  { name: "安庆", value: [117.057374, 30.515509, 39] },
  { name: "黄山", value: [118.329998, 29.712399, 41] },
  { name: "滁州", value: [118.317409, 32.319112, 42] },
  { name: "阜阳", value: [115.819097, 32.894133, 43] },
  { name: "宿州", value: [116.974113, 33.636266, 45] },
  { name: "六安", value: [116.490570, 31.742311, 46] },
  { name: "亳州", value: [115.778091, 33.848308, 48] },
  { name: "池州", value: [117.486306, 30.667289, 49] },
  { name: "宣城", value: [118.756735, 30.947041, 50] },
  { name: "福州", value: [119.306239, 26.075302, 52] },
  { name: "莆田", value: [119.007665, 25.454119, 53] },
  { name: "三明", value: [117.636613, 26.254612, 54] },
  { name: "泉州", value: [118.588626, 24.900586, 56] },
  { name: "漳州", value: [117.022227, 24.517788, 57] },
  { name: "南平", value: [118.110871, 26.643333, 58] },
  { name: "龙岩", value: [117.020914, 25.081320, 60] },
  { name: "宁德", value: [119.527036, 26.662877, 61] },
  { name: "南昌", value: [115.892151, 28.676493, 62] },
  { name: "景德镇", value: [117.191826, 29.261911, 64] },
  { name: "萍乡", value: [113.852197, 27.616298, 65] },
  { name: "九江", value: [115.985924, 29.714555, 66] },
  { name: "新余", value: [114.926881, 27.815390, 67] },
  { name: "鹰潭", value: [117.074219, 28.269471, 69] },
  { name: "赣州", value: [114.933330, 25.856740, 70] },
  { name: "吉安", value: [114.975102, 27.110308, 71] },
  { name: "宜春", value: [114.422419, 27.816665, 73] },
  { name: "抚州", value: [116.357193, 27.960560, 74] },
  { name: "上饶", value: [117.970721, 28.450023, 75] },
  { name: "济南", value: [117.000923, 36.675808, 76] },
  { name: "青岛", value: [120.382639, 36.106210, 78] },
  { name: "淄博", value: [118.047112, 36.807199, 79] },
  { name: "枣庄", value: [117.574638, 34.819002, 80] },
  { name: "东营", value: [118.493305, 37.464622, 81] },
  { name: "烟台", value: [121.397898, 37.535035, 83] },
  { name: "潍坊", value: [119.107065, 36.770793, 84] },
  { name: "济宁", value: [116.587104, 35.415009, 85] },
  { name: "泰安", value: [117.128924, 36.190930, 86] }
])

const target = ref(null)
let mChart

onMounted(() => {
  mChart = echarts.init(target.value)
  renderBMap()
})

const renderBMap = () => {
  const options = {
    tooltip: {
      trigger: 'item',
    },
    bmap: {
      center: [109.114129, 36.550339],
      zoom: 5,
      roam: true
    },
    series: [
      {
        name: '营收 （万元）',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: charData.value,
        symbolSize: function (val) {
          return val[2] / 10
        },
        encode: {
          value: 2
        },
        emphasis: {
          label: {
            show: true
          }
        },
        color: "#15803d"
      },
      {
        name: '营收 TOP 5 万元',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: charData.value.sort((a, b) => {
          return b.value[2] - a.value[2]
        }).slice(0, 6),
        symbolSize: function (val) {
          return val[2] / 10
        },
        encode: {
          value: 2
        },
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        zlevel: 2,
        color: '#166534'
      }
    ]
  }

  // 关键：把配置设置到图表
  mChart.setOption(options)
}
</script>

<style scoped>
.container {
  position: relative;
}

.title {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  color: #333;
  font-size: 22px;
  font-weight: bold;
  z-index: 9;
}

.box {
  height: 462px;
}
</style>