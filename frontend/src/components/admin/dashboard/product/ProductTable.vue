<script setup lang="ts">
import { Box, Pencil, Trash2, Image as ImageIcon } from 'lucide-vue-next'
import type { CarResponse } from '@/types/car'

defineProps<{
  cars: CarResponse[]
  isLoading: boolean
}>()

const emit = defineEmits(['view-3d', 'edit-car', 'delete-car'])
</script>

<template>
  <div
    class="bg-[#18181b] rounded-xl border border-[#27272a] shadow-xl overflow-hidden overflow-x-auto"
  >
    <table class="w-full text-left border-collapse min-w-[800px]">
      <thead>
        <tr class="bg-[#1f1f22] text-[#a1a1aa] text-xs uppercase font-bold tracking-wider">
          <th class="p-5 border-b border-[#27272a] w-16">Ảnh</th>
          <th class="p-5 border-b border-[#27272a]">Tên Xe & Danh mục</th>
          <th class="p-5 border-b border-[#27272a]">Hãng (Brand)</th>
          <th class="p-5 border-b border-[#27272a] text-center">Tồn Kho</th>
          <th class="p-5 border-b border-[#27272a] text-right">Giá Gốc</th>
          <th class="p-5 border-b border-[#27272a] text-right text-red-500">Giá Sale</th>
          <th class="p-5 border-b border-[#27272a] text-center">Thao tác</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-[#27272a]">
        <tr v-if="isLoading">
          <td colspan="7" class="p-10 text-center text-gray-500 font-medium italic">
            Hệ thống đang nạp dữ liệu...
          </td>
        </tr>
        <tr v-for="car in cars" :key="car.id" class="hover:bg-[#1f1f22] transition-colors group">
          <td class="p-5">
            <div
              class="w-16 h-12 rounded bg-[#09090b] border border-[#27272a] overflow-hidden flex items-center justify-center"
            >
              <img v-if="car.imageUrl" :src="car.imageUrl" class="w-full h-full object-cover" />
              <ImageIcon v-else class="text-[#3f3f46]" :size="16" />
            </div>
          </td>

          <td class="p-5 text-white">
            <p class="font-bold uppercase text-sm tracking-wide">{{ car.name }}</p>
            <p class="text-[10px] text-[#71717a] font-semibold mt-1 uppercase">
              {{ car.categoryName }}
            </p>
          </td>

          <td class="p-5">
            <span
              class="px-2 py-1 bg-[#27272a] text-gray-300 rounded text-xs font-bold uppercase tracking-wider"
            >
              {{ car.brand || 'N/A' }}
            </span>
          </td>

          <td class="p-5 text-center">
            <span
              class="px-2 py-1 rounded text-xs font-bold"
              :class="
                car.stockQuantity > 0
                  ? 'bg-green-500/10 text-green-500'
                  : 'bg-red-500/10 text-red-500'
              "
            >
              {{ car.stockQuantity > 0 ? car.stockQuantity : 'HẾT' }}
            </span>
          </td>

          <td
            class="p-5 text-right font-mono text-gray-400"
            :class="{ 'line-through text-gray-600': (car.salePrice || 0) > 0 }"
          >
            ${{ car.price?.toLocaleString() }}
          </td>

          <td class="p-5 text-right font-mono font-bold text-red-500">
            {{ (car.salePrice || 0) > 0 ? '$' + car.salePrice?.toLocaleString() : '-' }}
          </td>

          <td class="p-5">
            <div class="flex justify-center gap-2">
              <button
                @click="emit('view-3d', car)"
                title="Xem 3D"
                class="p-1.5 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-all"
              >
                <Box :size="16" />
              </button>
              <button
                @click="emit('edit-car', car)"
                title="Sửa"
                class="p-1.5 bg-[#27272a] text-gray-300 rounded hover:bg-white hover:text-black transition-all"
              >
                <Pencil :size="16" />
              </button>
              <button
                @click="emit('delete-car', car.id)"
                title="Xóa"
                class="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-600 hover:text-white transition-all"
              >
                <Trash2 :size="16" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
