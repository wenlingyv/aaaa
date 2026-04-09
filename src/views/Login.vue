<template>
  <div class="login">
    <button @click="login">登录</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const login = () => router.push('/home')
</script>

<style scoped>
.login {
  height: 100vh;
  background: #121222;
  display: grid;
  place-items: center;
}
button {
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
}
</style>