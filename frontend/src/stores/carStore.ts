import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CarResponse } from '@/types/car'

export const useCarStore = defineStore('car', () => {
  const selectedCar = ref<CarResponse | null>(null)

  function setSelectedCar(car: CarResponse) {
    selectedCar.value = car
  }

  return { selectedCar, setSelectedCar }
})
