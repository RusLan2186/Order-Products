import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/products',
      name: 'products',
      component: () => import('../pages/ProductsPage.vue')
    },

    {
      path: '/orders',
      name: 'OrdersPage',
      component: () => import('../components/Orders.vue')
    },

    {
      path: '/:pathMatch(.*)*', 
      component: () => import('../pages/NotFoundPage.vue')
    },
  ]
})

export default router
