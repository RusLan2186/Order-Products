import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/products',
      name: 'products',
      component: () => import('../components/ProductsPage.vue')
    },

    {
      path: '/orders',
      name: 'orders',
      component: () => import('../components/Orders.vue')
    }
  ]
})

export default router
