<script setup lang="ts">
import { ref } from 'vue'
import { useCar } from '../composables/useCar'
import CarShowroom from '../components/CarShowroom.vue'
import { Loader2, Trash2, Box } from 'lucide-vue-next' // Giả định bạn dùng lucide icons

const { cars, isLoading, deleteCar } = useCar()
const selectedCar = ref<any>(null)

const selectCar = (car: any) => {
  selectedCar.value = car
}
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800">Showroom Xe Hơi 3D</h1>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        + Thêm xe mới
      </button>
    </div>

    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 lg:col-span-4 space-y-4 overflow-y-auto max-h-[70vh]">
        <div v-if="isLoading" class="flex justify-center p-10">
          <Loader2 class="animate-spin text-blue-500" />
        </div>

        <div
          v-for="car in cars"
          :key="car.id"
          @click="selectCar(car)"
          :class="[
            'p-4 border-2 rounded-xl cursor-pointer transition-all',
            selectedCar?.id === car.id
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-transparent bg-white shadow-sm hover:border-slate-200',
          ]"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-bold text-lg text-slate-700">{{ car.name }}</h3>
              <p class="text-blue-600 font-semibold">${{ car.price.toLocaleString() }}</p>
              <span class="text-xs bg-slate-200 px-2 py-1 rounded mt-2 inline-block">
                {{ car.categoryName }}
              </span>
            </div>
            <button @click.stop="deleteCar(car.id)" class="text-slate-400 hover:text-red-500">
              <Trash2 :size="18" />
            </button>
          </div>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-8">
        <div v-if="selectedCar">
          <CarShowroom :model-url="selectedCar.modelUrl" :car-color="selectedCar.color" />
          <div class="mt-6 bg-white p-6 rounded-2xl shadow-sm border">
            <h2 class="text-2xl font-bold mb-2">{{ selectedCar.name }}</h2>
            <p class="text-slate-600 leading-relaxed">{{ selectedCar.description }}</p>
          </div>
        </div>

        <div
          v-else
          class="h-[500px] flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed rounded-2xl text-slate-400"
        >
          <Box :size="48" class="mb-4 opacity-20" />
          <p>Chọn một chiếc xe từ danh sách để xem mô hình 3D</p>
        </div>
      </div>
    </div>
  </div>
</template>
