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
      name: 'OrdersPage',
      component: () => import('../components/Orders.vue')
    },

    {
      path: '/:pathMatch(.*)*', 
      component: () => import('../components/NotFoundPage.vue')
    },
  ]
})

export default router
