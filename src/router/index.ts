import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/overunder',
      name: 'Over / Under',
      component: () => import('../views/OverUnderView.vue')
    }
  ]
})

export default router
