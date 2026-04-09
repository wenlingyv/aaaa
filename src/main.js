import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import { createPinia } from 'pinia'
const pinia = createPinia()


createApp(App).use(Vant.Lazyload).use(pinia).use(Vant).use(router).use(ElementPlus).mount('#app')
