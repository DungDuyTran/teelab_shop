<script setup lang="ts">
import { X } from 'lucide-vue-next'
import CarShowroom from '@/components/3d/CarShowroom.vue'
import type { CarResponse } from '@/types/car'

defineProps<{
  isVisible: boolean
  selectedCar: CarResponse | null
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <!-- destroy toàn bộ popup -->
    <div v-if="isVisible" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- overlay -->
      <div class="absolute inset-0 bg-black/90 backdrop-blur-md" @click="emit('close')"></div>

      <!-- modal -->
      <div
        class="relative w-full max-w-6xl h-[85vh] bg-[#09090b] rounded-2xl border border-[#27272a] shadow-2xl flex flex-col overflow-hidden"
      >
        <!-- close -->
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 z-[110] bg-[#18181b] text-gray-400 border border-[#27272a] p-2 rounded-full hover:bg-red-600 hover:text-white transition-all"
        >
          <X :size="24" />
        </button>

        <!-- 3D -->
        <div class="flex-1 bg-black relative overflow-hidden">
          <CarShowroom
            v-if="selectedCar"
            :key="selectedCar.modelUrl"
            :model-url="selectedCar.modelUrl"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>
