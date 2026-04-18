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
          Trợ lý học tập
        </span>
        <span class="text-[8px] font-bold text-green-600 uppercase tracking-widest">
          Ecosystem
        </span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <RouterLink
        to="/users/profile"
        class="flex items-center gap-3 pl-4 border-l-2 border-slate-100 cursor-pointer group select-none transition-all"
      >
        <div class="text-right hidden sm:block">
          <p
            class="text-xs font-black uppercase leading-none group-hover:text-green-600 transition-colors"
          >
            {{ hoTen }}
          </p>
          <p class="text-[9px] font-bold text-green-600 uppercase mt-1">
            {{ roleText }}
          </p>
        </div>

        <div class="relative">
          <img
            :src="avatarUrl"
            alt="Avatar"
            class="w-10 h-10 object-cover bg-green-50 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[0.5px] group-hover:translate-y-[0.5px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          />
          <div
            class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"
          ></div>
        </div>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

// Nhận Prop từ Cha
defineProps<{
  isCollapsed: boolean
}>()

// Khai báo sự kiện sẽ gửi lên Cha
defineEmits(['toggle'])

// Data giả lập (Tạm thời bỏ SWR)
const hoTen = 'Trần Duy Dũng'
const roleText = 'Student @ DTU'
const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(hoTen)}&background=f8fafc&color=16a34a&bold=true&size=128&border=true`
</script>
