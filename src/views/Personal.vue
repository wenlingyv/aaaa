<template>
  <div class="personal-page">
    <header class="personal-header">
      <div class="header-left">
        <h1 class="page-title">{{ t('personal.title') }}</h1>
      </div>
      <div class="header-right">
        <button class="header-btn theme-btn" @click="toggleTheme">
          <span class="btn-icon">{{ themeStore.isDark ? '☀️' : '🌙' }}</span>
          <span>{{ t('personal.theme') }}</span>
        </button>
        <button class="header-btn lang-btn" @click="toggleLanguage">
          <span class="btn-icon">🌐</span>
          <span>{{ t('personal.language') }}</span>
        </button>
        <button class="header-btn fullscreen-btn" @click="toggleFullscreen">
          <span class="btn-icon">{{ isFullscreen ? '⛶' : '⛶' }}</span>
          <span>{{ isFullscreen ? t('personal.exitFullscreen') : t('personal.fullscreen') }}</span>
        </button>
      </div>
    </header>
    <main class="personal-content">
      <div class="content-card">
        <h2>{{ t('personal.welcome') }}</h2>
        <p>{{ t('personal.description') }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import '../style/Personal.css'
import { useThemeStore } from '../stores/theme'
import { useI18n } from 'vue-i18n'

const themeStore = useThemeStore()
const { locale, t } = useI18n()

const isFullscreen = ref(false)

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const toggleLanguage = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.error('进入全屏失败:', err)
    })
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.error('退出全屏失败:', err)
      })
    }
  }
}

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>
