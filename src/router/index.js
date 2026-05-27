import { createRouter, createWebHistory } from 'vue-router'
import StartPage from '../components/StartPage.vue'      
import LoadingPage from '../components/LoadingPage.vue'  
import TravelTest from '../components/TravelTest.vue'
import ResultPage from '../components/ResultPage.vue'

const routes = [
  {
    path: '/',
    name: 'StartPage',       // 默认跳转到开始页
    component: StartPage
  },
  {
    path: '/test',
    name: 'TravelTest',
    component: TravelTest
  },
  {
    path: '/loading',        // 新增：loading页路由
    name: 'LoadingPage',
    component: LoadingPage
  },
  {
    path: '/result',
    name: 'ResultPage',
    component: ResultPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
