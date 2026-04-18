// src/composables/useSWR.ts
import { ref, watchEffect, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import axios, { type AxiosRequestConfig, type AxiosError } from 'axios'

// 1. Khởi tạo Axios Instance trỏ về Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Thay đổi theo cổng Backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
})

// Thêm Interceptor để nhét Token nếu cần (Dành cho sau này)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 2. Global Cache lưu trữ dữ liệu (Memory Cache)
// Tránh việc gọi API nhiều lần cho cùng 1 endpoint
const globalCache = new Map<string, any>()

// 3. Hàm Generics chính
export function useSWR<T>(url: MaybeRefOrGetter<string | null>, options?: AxiosRequestConfig) {
  const data = ref<T | null>(null)
  const error = ref<AxiosError | null>(null)
  const isLoading = ref<boolean>(false) // Bật lên khi load lần đầu tiên
  const isValidating = ref<boolean>(false) // Bật lên khi đang fetch ngầm (Revalidate)

  const fetchData = async () => {
    // toValue giúp lấy giá trị string từ biến ref hoặc computed (Tính năng của Vue 3.3+)
    const currentUrl = toValue(url)
    if (!currentUrl) return

    // --- BƯỚC 1: TRẢ VỀ CACHE NGAY LẬP TỨC NẾU CÓ (STALE) ---
    if (globalCache.has(currentUrl)) {
      data.value = globalCache.get(currentUrl)
    } else {
      isLoading.value = true // Chỉ bật loading chặn UI nếu chưa có cache
    }

    isValidating.value = true

    // --- BƯỚC 2: GỌI API ĐỂ CẬP NHẬT DỮ LIỆU MỚI (REVALIDATE) ---
    try {
      const response = await api.get<T>(currentUrl, options)

      // Cập nhật State và lưu vào Cache
      data.value = response.data
      globalCache.set(currentUrl, response.data)
      error.value = null
    } catch (err) {
      error.value = err as AxiosError
    } finally {
      isLoading.value = false
      isValidating.value = false
    }
  }

  // 4. Lắng nghe: Nếu biến URL thay đổi, tự động gọi lại API
  watchEffect(() => {
    fetchData()
  })

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate: fetchData, // Hàm để bóp cò gọi lại API thủ công (F5)
  }
}

export default api // Export thêm axios gốc để dùng cho thao tác POST, PUT, DELETE
