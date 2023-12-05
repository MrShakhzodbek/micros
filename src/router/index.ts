import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Workers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'worker',
      component: HomeView
    },
    {
      path: '/document',
      name: 'document',
      component: () => import('../views/Documents.vue')
    }
  ]
})

export default router
