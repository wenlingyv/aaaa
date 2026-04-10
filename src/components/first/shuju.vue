<template>
  <div class="trend-data-container">
    <!-- 累计盈利 -->
    <div class="title">
      <div class="title-name">本月累计收益（万元）</div>
      <div class="title-amount">
        &yen;<span ref="titleAmountRef">0</span>
      </div>
    </div>

    <!-- 今日新增收益 -->
    <div class="item">
      <div class="item-name item-name-border-1">今日新增收益</div>
      <div class="item-amount">
        <span ref="incomeRef" class="item-amount-number">0</span>
        万元
      </div>
    </div>

    <!-- 今日新增支出 -->
    <div class="item">
      <div class="item-name item-name-border-2">今日新增支出</div>
      <div class="item-amount">
        <span ref="expenseRef" class="item-amount-number">0</span>
        万元
      </div>
    </div>

    <!-- 今日结余 -->
    <div class="item">
      <div class="item-name item-name-border-3">今日结余</div>
      <div class="item-amount">
        <span ref="balanceRef" class="item-amount-number">0</span>
        万元
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

// 定义 DOM 引用
const titleAmountRef = ref(null)
const incomeRef = ref(null)
const expenseRef = ref(null)
const balanceRef = ref(null)

// 页面加载后执行数字动画
onMounted(() => {
  // 配置项（保留2位小数、千分位逗号）
  const options = {
    duration: 1.5,
    separator: ',',
    decimalPlaces: 2
  }

  // 本月累计收益
  new CountUp(titleAmountRef.value, 284348.43, options).start()
  
  // 今日收益
  new CountUp(incomeRef.value, 952.92, options).start()
  
  // 今日支出
  new CountUp(expenseRef.value, 831.52, options).start()
  
  // 今日结余
  new CountUp(balanceRef.value, 121.40, options).start()
})
</script>

<style scoped>
.trend-data-container {
  width: 100%;
}

.title {
  padding: 12px 20px;
  background: linear-gradient(to right, #0ea5e9, #6366f1);
  border-radius: 5px;
  color: white;
  margin-bottom: 10px;
}

.title-name {
  font-size: 12px;
  font-weight: bold;
}

.title-amount {
  font-size: 24px;
  margin-top: 4px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c9c9c9;
  padding: 16px 0;
  color: #666;
}

.item-name {
  font-size: 12px;
  padding: 4px 0 4px 8px;
}

.item-amount {
  font-size: 12px;
}

.item-amount-number {
  color: #333;
  font-weight: bold;
  font-size: 20px;
}

.item-name-border-1 {
  border-left: 6px solid #409eff;
}
.item-name-border-2 {
  border-left: 6px solid #e6a23c;
}
.item-name-border-3 {
  border-left: 6px solid #67c23a;
}
</style>