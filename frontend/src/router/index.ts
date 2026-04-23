import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'), // Trang chủ 3D
    },
    {
      path: '/products', // Đổi từ /cars thành /products cho khớp với URL
      name: 'products',
      component: () => import('@/views/CarManagementView.vue'),
    },
  ],
})

export default router
