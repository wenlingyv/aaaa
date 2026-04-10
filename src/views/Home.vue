<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ collapse: isCollapse }">
      <div class="logo">
        <div class="icon">🔥</div>
        <span v-show="!isCollapse">{{ t('sidebar.title') }}</span>
      </div>

      <div class="menu">
        <div class="item" @click="$router.push('/home')">
          <span>👤</span>
          <span v-show="!isCollapse">{{ t('sidebar.personal') }}</span>
        </div>
        <div class="item" @click="$router.push('/home/user')">
          <span>👥</span>
          <span v-show="!isCollapse">{{ t('sidebar.user') }}</span>
        </div>
        <div class="item" @click="$router.push('/home/role')">
          <span>📜</span>
          <span v-show="!isCollapse">{{ t('sidebar.role') }}</span>
        </div>
        <div class="item" @click="$router.push('/home/permission')">
          <span>🔐</span>
          <span v-show="!isCollapse">{{ t('sidebar.permission') }}</span>
        </div>
        <div class="item" @click="$router.push('/home/article')">
          <span>🔐</span>
          <span v-show="!isCollapse">{{ t('sidebar.article') }}</span>
        </div>
        <div class="item" @click="$router.push('/home/create-article')">
          <span>🔐</span>
          <span v-show="!isCollapse">{{ t('sidebar.createArticle') }}</span>
        </div>
        <div class="item" @click="$router.push('/home/shuju')">
          <span>🔐</span>
          <span v-show="!isCollapse">{{ t('sidebar.shuju') }}</span>
        </div>
      </div>

      <div class="toggle" @click="isCollapse = !isCollapse">
        {{ isCollapse ? '▶' : '◀' }}
      </div>
    </aside>

    <!-- 主内容 -->
    <div class="main">
      <header class="header">
        <div class="left" @click="isCollapse = !isCollapse">☰</div>
      </header>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const isCollapse = ref(false)
const { t } = useI18n()
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { overflow: hidden; }

.layout {
  display: flex;
  height: 100vh;
  background: #121222;
  color: #fff;
}

/* 侧边栏 */
.sidebar {
  width: 220px;
  background: #1a1a2e;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
}
.sidebar.collapse { width: 60px; }

.logo {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
}
.logo .icon {
  width: 40px;
  height: 40px;
  background: #ff4400;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu {
  flex: 1;
  padding: 10px 0;
}
.item {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}
.item:hover {
  background: #2d2d44;
}

.toggle {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top: 1px solid #333;
}

/* 主内容 */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.header {
  height: 60px;
  background: #1a1a2e;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 20px;
  cursor: pointer;
}
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>