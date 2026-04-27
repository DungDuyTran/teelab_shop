<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/admin/Header.vue'
import Sidebar from '@/components/admin/Sidebar.vue'

const isCollapsed = ref(false)
</script>

<template>
  <div class="min-h-screen bg-[#09090b] text-white font-sans overflow-hidden">
    <Header :is-collapsed="isCollapsed" @toggle="isCollapsed = !isCollapsed" />

    <div class="flex pt-16 h-screen overflow-hidden">
      <Sidebar :is-collapsed="isCollapsed" />

      <main
        :class="`flex-1 transition-all duration-300 p-8 overflow-y-auto ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`"
      >
        <RouterView />
      </main>
    </div>
  </div>
</template>
