import { createRouter, createWebHistory } from 'vue-router'
import StartPage from '../components/StartPage.vue'       // 新增
import LoadingPage from '../components/LoadingPage.vue'   // 新增
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
    component: ResultPage,
    props: route => ({ result: JSON.parse(route.query.result || '{}') })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
