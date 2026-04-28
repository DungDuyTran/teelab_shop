<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

const emit = defineEmits(['open-add'])
</script>

<template>
  <div class="flex justify-between items-end mb-8">
    <div>
      <h1 class="text-3xl font-bold uppercase tracking-tight text-white">
        Quản lý <span class="text-red-600">Sản phẩm</span>
      </h1>
      <p class="text-[#a1a1aa] text-sm mt-2 uppercase font-semibold tracking-wider italic">
        E-Commerce Vehicle System
      </p>
    </div>
    <button
      @click="emit('open-add')"
      class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold uppercase shadow-lg shadow-red-600/20 transition-all active:scale-95"
    >
      <Plus :size="18" /> Thêm xe mới
    </button>
  </div>
</template>
