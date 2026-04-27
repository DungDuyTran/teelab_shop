<script setup lang="ts">
import { Plus, Pencil, Trash2, Box, Info, X } from 'lucide-vue-next'
import CarShowroom from '@/components/3d/CarShowroom.vue'
import { useCarManagement } from '@/composables/useCarManagement'

const { cars, isLoading, deleteCar, carStore, isShowroomVisible, view3D, close3D } =
  useCarManagement()
</script>

<template>
  <div class="relative min-h-screen bg-[#09090b]">
    <div class="flex justify-between items-end mb-8">
      <div>
        <h1 class="text-3xl font-bold uppercase tracking-tight text-white">
          Quản lý <span class="text-red-600">Sản phẩm</span>
        </h1>
        <p class="text-[#a1a1aa] text-sm mt-2 uppercase font-semibold tracking-wider italic">
          Inventory Management System
        </p>
      </div>
      <button
        class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold uppercase shadow-lg shadow-red-600/20 transition-all active:scale-95"
      >
        <Plus :size="18" /> Thêm xe mới
      </button>
    </div>

    <div class="bg-[#18181b] rounded-xl border border-[#27272a] shadow-xl overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-[#1f1f22] text-[#a1a1aa] text-xs uppercase font-bold tracking-wider">
            <th class="p-5 border-b border-[#27272a] w-2/5 font-bold">Thông tin xe</th>
            <th class="p-5 border-b border-[#27272a] w-1/5 font-bold text-center">Danh mục</th>
            <th class="p-5 border-b border-[#27272a] w-1/5 font-bold text-center">Giá niêm yết</th>
            <th class="p-5 border-b border-[#27272a] w-1/5 font-bold text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#27272a]">
          <tr v-if="isLoading">
            <td colspan="4" class="p-10 text-center text-gray-500 font-medium italic">
              Hệ thống đang nạp dữ liệu...
            </td>
          </tr>
          <tr v-for="car in cars" :key="car.id" class="hover:bg-[#1f1f22] transition-colors group">
            <td class="p-5 text-white">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-lg bg-[#09090b] border border-[#27272a] flex items-center justify-center text-red-600 font-bold shadow-inner group-hover:border-red-600/50 transition-colors"
                >
                  🏎️
                </div>
                <div>
                  <p class="font-bold uppercase text-base tracking-wide">{{ car.name }}</p>
                  <p class="text-xs text-[#71717a] uppercase font-semibold tracking-widest mt-1">
                    {{ car.id }} # Serial
                  </p>
                </div>
              </div>
            </td>
            <td class="p-5 text-sm font-semibold text-[#a1a1aa] text-center uppercase">
              {{ car.categoryName }}
            </td>
            <td class="p-5 text-red-500 font-bold text-base text-center">
              ${{ car.price?.toLocaleString() }}
            </td>
            <td class="p-5">
              <div class="flex justify-center gap-3">
                <button
                  @click="view3D(car)"
                  title="Xem 3D"
                  class="p-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                  <Box :size="18" />
                </button>
                <button
                  title="Sửa"
                  class="p-2 bg-[#27272a] text-gray-300 border border-[#3f3f46] rounded-md hover:bg-white hover:text-black transition-all shadow-sm"
                >
                  <Pencil :size="18" />
                </button>
                <button
                  @click="deleteCar(car.id)"
                  title="Xóa"
                  class="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                  <Trash2 :size="18" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Teleport to="body">
      <div
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
        :class="
          isShowroomVisible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        "
      >
        <div class="absolute inset-0 bg-black/90 backdrop-blur-md" @click="close3D"></div>

        <div
          class="relative w-full max-w-6xl h-[85vh] bg-[#09090b] rounded-2xl border border-[#27272a] shadow-2xl flex flex-col overflow-hidden transition-transform duration-500"
          :class="isShowroomVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'"
        >
          <button
            @click="close3D"
            class="absolute top-4 right-4 z-[110] bg-[#18181b] text-gray-400 hover:text-white border border-[#27272a] p-2 rounded-full hover:bg-red-600 hover:border-red-600 transition-all shadow-lg"
          >
            <X :size="24" />
          </button>

          <div
            class="p-6 bg-gradient-to-b from-[#18181b] to-transparent z-[105] pointer-events-none absolute top-0 w-full"
          >
            <div class="flex items-center gap-3">
              <h2 class="text-3xl font-bold uppercase text-white">
                {{ carStore.selectedCar?.name }}
              </h2>
              <span
                class="px-3 py-1 bg-red-600/20 border border-red-600/50 text-red-500 text-xs font-bold rounded-full uppercase"
                >{{ carStore.selectedCar?.categoryName }}</span
              >
            </div>
            <p class="text-[#a1a1aa] font-semibold mt-1 tracking-wider uppercase text-sm">
              Interactive 3D Mode
            </p>
          </div>

          <div class="flex-1 bg-black relative overflow-hidden">
            <CarShowroom
              v-if="carStore.selectedCar"
              :model-url="carStore.selectedCar.modelUrl"
              :is-active="isShowroomVisible"
            />
          </div>

          <div class="p-6 bg-[#18181b] border-t border-[#27272a] shrink-0 z-[105]">
            <div class="flex items-start gap-3 text-[#a1a1aa] text-sm leading-relaxed">
              <Info :size="20" class="text-red-500 shrink-0 mt-0.5" />
              <p>{{ carStore.selectedCar?.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
