<template>
  <el-card class="container">
    <el-row :gutter="32">
      <el-col :span="6">
        <!-- 数据模块 -->
         <Shuju></Shuju>
      </el-col>
      <el-col :span="18">
        <!-- 图标模块 -->
         <Tubiao></Tubiao>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import Shuju from './shuju.vue'
import Tubiao from './tubiao.vue'
</script>

<style scoped>
.container {
  height: 320px;
  padding: 20px;
  /* background-color:#bcbfc3; */
}

.el-card {
  border: none;
  box-shadow: none;
}
</style>