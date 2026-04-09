<template>
  <div class="personal-page">
    <header class="personal-header">
      <div class="header-left">
        <h1 class="page-title">个人中心</h1>
      </div>
      <div class="header-right">
        <button class="header-btn theme-btn" @click="toggleTheme">
          <span class="btn-icon">{{ themeStore.isDark ? '☀️' : '🌙' }}</span>
          <span>切换主题</span>
        </button>
        <button class="header-btn lang-btn">
          <span class="btn-icon">🌐</span>
          <span>中/EN</span>
        </button>
        <button class="header-btn fullscreen-btn">
          <span class="btn-icon">⛶</span>
          <span>全屏</span>
        </button>
      </div>
    </header>
    <main class="personal-content">
      <div class="content-card">
        <h2>欢迎来到个人中心</h2>
        <p>这里是您的个人信息管理区域</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import '../style/Personal.css'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>
