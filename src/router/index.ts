import { createRouter, createWebHistory, RouterView } from 'vue-router'
import Tr from "@/i18n/translation"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:locale?",
      component: RouterView,
      beforeEnter: Tr.routeMiddleware,
      children: [{
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
        {
          path: 'overunder',
          name: 'overunder',
          component: () => import('../views/OverUnderView.vue')
        },
        {
          path: 'gong',
          name: 'gong',
          component: () => import('../views/GongView.vue')
        },
        {
          path: 'dice',
          name: 'dice',
          component: () => import('../views/DiceView.vue')
        }]
    }
  ]
})

export default router
