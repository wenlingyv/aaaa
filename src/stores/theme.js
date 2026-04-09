import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // 主题状态，默认为亮色主题
    isDark: false
  }),
  
  actions: {
    // 切换主题
    toggleTheme() {
      this.isDark = !this.isDark;
      this.updateBodyClass();
      this.saveThemeToLocalStorage();
    },
    
    // 更新 body 类名
    updateBodyClass() {
      if (this.isDark) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    },
    
    // 保存主题到本地存储
    saveThemeToLocalStorage() {
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    },
    
    // 从本地存储加载主题
    loadThemeFromLocalStorage() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDark = savedTheme === 'dark';
        this.updateBodyClass();
      }
    }
  }
});
