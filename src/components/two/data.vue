<template>
  <div style="height: 443px; border:1px solid #eee">
    <el-calendar v-model="currentDate">
      <template #default="{ data }">
        <div style="text-align:center; line-height:1.2">
          {{ data.day.split('-')[2] }}
          <br />
          <span style="font-size:12px; color:green">
            {{ getAmount(data.day) }}
          </span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentDate = ref('2025-04-01')

const list = ref([
  { date: '2025-04-01', amount: 25.69 },
  { date: '2025-04-02', amount: 29.29 },
  { date: '2025-04-03', amount: -0.11 },
  { date: '2025-04-04', amount: 14.65 },
  { date: '2025-04-05', amount: 31.25 },
  { date: '2025-04-06', amount: 20.71 },
])

const getAmount = (date) => {
  const res = list.value.find(item => item.date === date)
  return res ? res.amount : ''
}
</script>