<template>
  <aside
    :class="`bg-white shadow-2xl transition-all duration-300 flex flex-col z-20 ${
      isCollapsed ? 'w-18' : 'w-60'
    }`"
  >
    <nav class="flex-1 p-3 space-y-3 mt-2 shadow-2xl border-black overflow-y-auto">
      <button
        v-for="item in menuItems"
        :key="item.path"
        @click="router.push(item.path)"
        :class="[
          'w-full flex items-center gap-3 p-2.5 rounded-lg font-bold text-sm transition-all border-2 overflow-hidden',
          route.path === item.path
            ? 'bg-green-600 text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5'
            : 'bg-white text-black border-black hover:bg-green-100 shadow-xl',
        ]"
      >
        <span class="min-w-[28px] flex justify-center"
          ><component :is="item.icon" :size="28"
        /></span>
        <span v-if="!isCollapsed" class="truncate whitespace-nowrap">{{ item.label }}</span>
      </button>
    </nav>

    <div class="p-3 bg-white shadow-2xl border-t-2 border-gray-400">
      <button
        @click="handleLogout"
        class="w-full flex items-center gap-3 p-2 bg-green-600 text-white font-bold text-sm hover:bg-green-800 rounded-lg transition-all justify-center active:translate-y-0.5 active:shadow-none"
      >
        <LogOut :size="22" />
        <span v-if="!isCollapsed">ĐĂNG XUẤT</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Calendar, LayoutDashboard, LogOut } from 'lucide-vue-next'

defineProps<{
  isCollapsed: boolean
}>()

const router = useRouter()
const route = useRoute() // Lấy pathname hiện tại

const handleLogout = () => {
  const isConfirmed = confirm('Bạn có chắc chắn muốn đăng xuất tài khoản không?')
  if (!isConfirmed) return
  alert('Đã đăng xuất! (Mock)')
}

// Khai báo Menu (Dùng markRaw để Vue không biến Component thành dữ liệu phản ứng)
const menuItems = [
  { icon: markRaw(LayoutDashboard), label: 'Tổng quan', path: '/' },
  { icon: markRaw(Calendar), label: 'Products', path: '/views/ProductsViews' },
]
</script>
