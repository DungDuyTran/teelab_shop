<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

// Kiểm tra xem có phải đang ở trang chủ không
// Nếu ở trang '/', chúng ta sẽ ẩn Sidebar và Header kiểu cũ đi
const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <div v-if="isHomePage" class="w-full h-screen overflow-hidden">
    <RouterView />
  </div>

  <div v-else class="flex flex-col h-screen overflow-hidden bg-slate-50">
    <Header :is-collapsed="isCollapsed" @toggle="toggleSidebar" />

    <div class="flex flex-1 overflow-hidden">
      <Sidebar :is-collapsed="isCollapsed" />

      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
/* Reset cơ bản để 3D mượt mà */
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* Hiệu ứng chuyển cảnh nhẹ nhàng giữa các trang */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
