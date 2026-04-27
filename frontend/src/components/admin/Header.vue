<script setup lang="ts">
import { Menu, Bell, User } from 'lucide-vue-next'

defineProps<{ isCollapsed: boolean }>()
defineEmits(['toggle'])

const hoTen = 'Trần Duy Dũng'
</script>

<template>
  <header
    class="h-16 bg-[#18181b] w-full flex items-center justify-between px-6 z-40 border-b border-[#27272a] fixed top-0 left-0 shadow-sm"
  >
    <div class="flex items-center gap-6">
      <button
        @click="$emit('toggle')"
        class="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#27272a] transition-all"
      >
        <Menu :size="20" />
      </button>

      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-white shadow-md shadow-red-600/20"
        >
          D
        </div>
        <span class="text-xl font-bold tracking-tight uppercase text-white">
          CAR <span class="text-red-600">ADMIN</span>
        </span>
      </div>
    </div>

    <div class="flex items-center gap-6">
      <div class="flex items-center gap-3 pr-4 border-r border-[#27272a]">
        <Bell :size="20" class="text-gray-400 cursor-pointer hover:text-white transition-colors" />
      </div>
      <div class="flex items-center gap-3 group cursor-pointer">
        <div class="text-right hidden sm:block">
          <p
            class="text-sm font-bold text-gray-200 group-hover:text-red-500 transition-colors uppercase"
          >
            {{ hoTen }}
          </p>
          <p class="text-[11px] text-gray-500 uppercase font-semibold tracking-wider text-right">
            Software Engineer
          </p>
        </div>
        <div
          class="w-10 h-10 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center text-red-500 group-hover:border-red-500 transition-colors"
        >
          <User :size="18" />
        </div>
      </div>
    </div>
  </header>
</template>
