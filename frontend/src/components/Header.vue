<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

// Nhận Prop từ Cha
defineProps<{
  isCollapsed: boolean
}>()

// Khai báo sự kiện sẽ gửi lên Cha
defineEmits(['toggle'])

const hoTen = 'Trần Duy Dũng'
</script>

<template>
  <header
    class="h-16 bg-white flex items-center justify-between px-6 z-30 relative shadow-xl border-b-2 border-black/5"
  >
    <div class="flex items-center gap-4">
      <button
        title="Chọn"
        @click="$emit('toggle')"
        class="p-1.5 border-2 border-black rounded-lg hover:bg-slate-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
      >
        <Menu :size="18" :stroke-width="2.5" />
      </button>

      <div class="flex flex-col select-none">
        <span class="text-lg font-black italic tracking-tighter uppercase leading-none">
          TEELAB SHOP
        </span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <RouterLink
        to="/"
        class="flex items-center gap-3 pl-4 border-l-2 border-slate-100 cursor-pointer group select-none transition-all"
      >
        <div class="text-right hidden sm:block">
          <p
            class="text-xs font-black uppercase leading-none group-hover:text-green-600 transition-colors"
          >
            {{ hoTen }}
          </p>
        </div>
      </RouterLink>
    </div>
  </header>
</template>
