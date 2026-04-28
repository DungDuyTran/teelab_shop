import { ref, onMounted } from 'vue'
import type { CarResponse } from '@/types/car'

const API_URL = 'http://localhost:8080/api/cars'

export function useCar() {
  const cars = ref<CarResponse[]>([])
  const isLoading = ref(false)

  const fetchCars = async () => {
    isLoading.value = true
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Lỗi khi tải dữ liệu')
      cars.value = await response.json()
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const createCar = async (carData: any) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      })
      if (!response.ok) throw new Error('Lỗi khi thêm xe')
      await fetchCars()
      return true
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const updateCar = async (id: number, carData: any) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      })
      if (!response.ok) throw new Error('Lỗi khi cập nhật xe')
      await fetchCars()
      return true
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const deleteCar = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa chiếc xe này không?')) return
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Lỗi khi xóa xe')
      await fetchCars()
    } catch (error) {
      console.error(error)
      alert('Có lỗi xảy ra khi xóa!')
    }
  }

  // --- UPLOAD MÔ HÌNH 3D LÊN CLOUDINARY ---
  const uploadModel = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'rxx189uo')
    const cloudName = 'dva3oktae'

    // Dùng /raw/upload cho file 3D để không bị hỏng cấu trúc
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Upload mô hình lên Cloud thất bại')
    const data = await response.json()
    return data.secure_url
  }

  // --- UPLOAD ẢNH 2D (THUMBNAIL) LÊN CLOUDINARY ---
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'rxx189uo')
    const cloudName = 'dva3oktae'

    // Dùng /image/upload để Cloudinary nén và tối ưu ảnh giúp web chạy mượt
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Upload ảnh 2D lên Cloud thất bại')
    const data = await response.json()
    return data.secure_url
  }

  onMounted(() => {
    fetchCars()
  })

  return {
    cars,
    isLoading,
    fetchCars,
    createCar,
    updateCar,
    deleteCar,
    uploadModel,
    uploadImage, // Bổ sung hàm mới
  }
}
