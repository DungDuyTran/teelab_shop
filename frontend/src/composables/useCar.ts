import api from '@/services/useSWR'
import type { CarResponse } from '@/types/car'
// GHI dữ liệu và UP FILE
export function useCar() {
  // POST: Thêm mới
  const createCar = async (carData: any) => {
    try {
      await api.post('/cars', carData)
      return true
    } catch (error) {
      console.error('Lỗi khi thêm xe:', error)
      throw error
    }
  }

  // PUT: Cập nhật
  const updateCar = async (id: number, carData: any) => {
    try {
      await api.put(`/cars/${id}`, carData)
      return true
    } catch (error) {
      console.error('Lỗi khi cập nhật xe:', error)
      throw error
    }
  }

  // DELETE: Xóa
  const deleteCar = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa chiếc xe này không?')) return false
    try {
      await api.delete(`/cars/${id}`)
      return true
    } catch (error) {
      console.error('Lỗi khi xóa xe:', error)
      throw error
    }
  }

  // --- UPLOAD MÔ HÌNH 3D LÊN CLOUDINARY ---
  // Vẫn dùng fetch vì đường dẫn đi thẳng ra server ngoài (Cloudinary)
  const uploadModel = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'rxx189uo')
    const cloudName = 'dva3oktae'

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Upload mô hình lên Cloud thất bại')
    const data = await response.json()
    return data.secure_url
  }

  // --- UPLOAD ẢNH 2D LÊN CLOUDINARY ---
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'rxx189uo')
    const cloudName = 'dva3oktae'

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Upload ảnh 2D lên Cloud thất bại')
    const data = await response.json()
    return data.secure_url
  }

  return {
    createCar,
    updateCar,
    deleteCar,
    uploadModel,
    uploadImage,
  }
}
