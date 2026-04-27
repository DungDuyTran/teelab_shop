import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/client/HomeView.vue'), // Trang chủ khách
    },
    {
      path: '/admin',
      component: AdminLayout, // Sử dụng AdminLayout làm khung
      children: [
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('@/views/admin/CarManagementView.vue'),
        },
      ],
    },
  ],
})

export default router
