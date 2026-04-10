<script setup>
import Container from '../components/first/continer.vue'
import SunPrice from '../components/two/SunPrice.vue'
import Data from '../components/two/data.vue'
import Bing from '../components/three/bing.vue'
import Wordtu from '../components/three/wordtu.vue'
import Map from '../components/three/map.vue'
</script>

<template>
<div>
<div>
  <!-- 累计趋势收益图 -->
  <Container></Container>

  <!-- 第二行 -->
  <el-row class="mt-20" :gutter="20">
    <el-col :span="16">
      <!-- 日金额分析图 -->
      <SunPrice></SunPrice>
    </el-col>
    <el-col :span="8">
      <!-- 日历图 -->
      <Data></Data>
    </el-col>
  </el-row>

<!-- 第三行 -->
<el-row class="mt-20" :gutter="20">
  <el-col :span="6">
    <div>
      <!-- 饼图 -->
      <Bing></Bing>
      <!-- 文档云图 -->
      <Wordtu class="mt-20"></Wordtu>
    </div>
  </el-col>
  <el-col :span="18">
    <!-- 地图可视化 -->
    <Map></Map>
  </el-col>
</el-row>

</div>
</div>

</template>
<style scoped>
.mt-20{
  margin-top: 20px;
}
</style>
