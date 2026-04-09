import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import { createPinia } from 'pinia'
import './styles/main.scss'
import i18n from './lang/index'
import { useThemeStore } from './stores/theme'
const pinia = createPinia()

const app = createApp(App)
app.use(Vant.Lazyload).use(pinia).use(Vant).use(router).use(ElementPlus).use(i18n).mount('#app')

// 加载主题状态
const themeStore = useThemeStore()
themeStore.loadThemeFromLocalStorage()

