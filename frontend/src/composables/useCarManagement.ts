import { ref } from 'vue'
import { useCarStore } from '@/stores/carStore'
import { useCar } from '@/composables/useCar'
import type { CarResponse } from '@/types/car'

export function useCarManagement() {
  const carStore = useCarStore()
  const { cars, isLoading, deleteCar } = useCar()

  const isShowroomVisible = ref(false)

  // Mở thì gán xe và hiện Popup
  const view3D = (car: CarResponse) => {
    carStore.setSelectedCar(car)
    isShowroomVisible.value = true
  }

  // Đóng thì CHỈ ẨN POPUP, tuyệt đối KHÔNG xóa xe (để WebGL không bị sốc)
  const close3D = () => {
    isShowroomVisible.value = false
  }

  return {
    cars,
    isLoading,
    deleteCar,
    carStore,
    isShowroomVisible,
    view3D,
    close3D,
  }
}
