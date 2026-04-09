import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Personal from '../views/Personal.vue'
import User from '../views/User.vue'
import Role from '../views/Role.vue'
import Permission from '../views/Permission.vue'
import Article from '../views/Article.vue'
import CreateArticle from '../views/CreateArticle.vue'

const routes = [
  { path: '/', component: Login },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '', component: Personal },
      { path: 'user', component: User },
      { path: 'role', component: Role },
      { path: 'permission', component: Permission },
      { path: 'article', component: Article },
      { path: 'create-article', component: CreateArticle },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router