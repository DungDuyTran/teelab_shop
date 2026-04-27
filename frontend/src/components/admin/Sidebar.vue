<script setup lang="ts">
import { markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { LayoutDashboard, Car, LogOut, Settings } from 'lucide-vue-next'

defineProps<{ isCollapsed: boolean }>()

const router = useRouter()
const route = useRoute()

const menuItems = [
  { icon: markRaw(LayoutDashboard), label: 'Tổng quan', path: '/admin/dashboard' },
  { icon: markRaw(Car), label: 'Kho xe 3D', path: '/admin/products' },
  { icon: markRaw(Settings), label: 'Cài đặt', path: '/admin/settings' },
]
</script>

<template>
  <aside
    :class="`bg-[#18181b] border-r border-[#27272a] transition-all duration-300 fixed left-0 top-16 bottom-0 z-30 flex flex-col ${
      isCollapsed ? 'w-20' : 'w-64'
    }`"
  >
    <nav class="flex-1 p-4 space-y-2 mt-2">
      <button
        v-for="item in menuItems"
        :key="item.path"
        @click="router.push(item.path)"
        :class="[
          'w-full flex items-center gap-4 p-3 rounded-lg font-bold text-sm transition-all overflow-hidden',
          route.path === item.path
            ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
            : 'text-gray-400 hover:bg-[#27272a] hover:text-white',
        ]"
      >
        <span class="min-w-[24px] flex justify-center">
          <component :is="item.icon" :size="20" />
        </span>
        <span v-if="!isCollapsed" class="truncate uppercase tracking-wide">{{ item.label }}</span>
      </button>
    </nav>

    <div class="p-4 border-t border-[#27272a]">
      <button
        class="w-full flex items-center gap-4 p-3 text-gray-500 hover:text-red-500 hover:bg-[#27272a] rounded-lg transition-colors font-bold text-sm uppercase"
      >
        <LogOut :size="20" />
        <span v-if="!isCollapsed">Đăng xuất</span>
      </button>
    </div>
  </aside>
</template>
