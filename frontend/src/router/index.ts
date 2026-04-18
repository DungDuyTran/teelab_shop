import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'), // Sẽ báo lỗi đỏ xíu nếu bạn chưa tạo file này, không sao cả
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsViews.vue'), // Gọi đúng file của bạn
    },
  ],
})

export default router
