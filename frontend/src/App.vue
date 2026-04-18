<template>
  <div class="flex flex-col h-screen bg-slate-50 font-sans overflow-hidden">
    <Header :isCollapsed="isCollapsed" @toggle="isCollapsed = !isCollapsed" />

    <div class="flex flex-1 overflow-hidden">
      <Sidebar :isCollapsed="isCollapsed" />

      <main class="flex-1 overflow-y-auto p-6 bg-slate-50">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

// State quản lý việc đóng/mở Sidebar (Mặc định là false - mở)
const isCollapsed = ref(false)
</script>
