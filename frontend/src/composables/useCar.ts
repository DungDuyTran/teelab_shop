import { ref } from 'vue'
import api, { useSWR } from '../services/useSWR'
import type { CarRequest, CarResponse } from '@/types/car'

export function useCar() {
  // Lấy danh sách xe
  const { data: cars, isLoading, error, mutate } = useSWR<CarResponse[]>('/cars')

  const isSubmitting = ref(false)

  const submitCar = async (payload: CarRequest, id?: number) => {
    isSubmitting.value = true
    try {
      if (id) {
        await api.put(`/cars/${id}`, payload)
      } else {
        await api.post('/cars', payload)
      }
      await mutate() // Load lại dữ liệu ngầm
    } finally {
      isSubmitting.value = false
    }
  }

  const deleteCar = async (id: number) => {
    if (!confirm('Xác nhận xóa xe này?')) return
    await api.delete(`/cars/${id}`)
    await mutate()
  }

  return {
    cars,
    isLoading,
    error,
    isSubmitting,
    submitCar,
    deleteCar,
  }
}
