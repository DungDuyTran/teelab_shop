<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import api from '../services/api'
import { useSWR } from '../services/useSWR' // Nhớ check lại xem file useSWR.ts có đúng nằm ở đây không nhé

// 1. Định nghĩa chuẩn xác cấu trúc
interface Product {
  id: number
  name: string
  price: number
  categoryId: number
}

// 2. Gọi SWR
const {
  data: products,
  isLoading,
  isValidating,
  error,
  mutate: refreshProducts,
} = useSWR<Product[]>('/products')

// Bổ sung: Lắng nghe và In ra log để biết API có gọi thành công không
watchEffect(() => {
  if (products.value) console.log('Dữ liệu lấy được từ Spring Boot:', products.value)
  if (error.value) console.error('Lỗi SWR:', error.value)
})

// 3. Form Model
const productForm = ref({
  name: '',
  price: 0,
  categoryId: 1,
})

// 4. Hàm Submit Form
const submitProduct = async () => {
  try {
    await api.post('/products', productForm.value)
    alert('Thêm sản phẩm thành công!')

    // Reset form
    productForm.value.name = ''
    productForm.value.price = 0

    // Kích hoạt gọi lại API
    refreshProducts()
  } catch (err: any) {
    console.error('Lỗi khi thêm:', err)
    if (err.response && err.response.data) {
      alert('Thất bại: ' + JSON.stringify(err.response.data))
    } else {
      alert('Không kết nối được với Server!')
    }
  }
}

// 5. Hàm format tiền
const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN')
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Quản lý Sản phẩm</h1>

    <div class="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
      <h2 class="text-lg font-semibold mb-4 text-gray-700">Thêm sản phẩm mới</h2>
      <form @submit.prevent="submitProduct" class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
          <input
            v-model="productForm.name"
            type="text"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="VD: Áo thun Teelab"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
          <input
            v-model="productForm.price"
            type="number"
            min="0"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mã Danh mục</label>
          <input
            v-model="productForm.categoryId"
            type="number"
            required
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div class="col-span-full mt-2">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            Lưu Sản Phẩm
          </button>
        </div>
      </form>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
            <th class="p-4 border-b">ID</th>
            <th class="p-4 border-b">Tên sản phẩm</th>
            <th class="p-4 border-b">Giá</th>
            <th class="p-4 border-b">Mã Danh mục</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="4" class="p-4 text-center text-blue-500 animate-pulse font-medium">
              Đang tải dữ liệu...
            </td>
          </tr>

          <tr v-else-if="error">
            <td colspan="4" class="p-4 text-center text-red-500 font-medium">
              Lỗi: {{ error.message }}
            </td>
          </tr>

          <template v-else>
            <tr
              v-for="item in products || []"
              :key="item.id"
              class="hover:bg-gray-50 border-b last:border-0"
            >
              <td class="p-4 text-gray-500">{{ item.id }}</td>
              <td class="p-4 font-medium text-gray-800">
                {{ item.name }}
                <span v-if="isValidating" class="text-[10px] text-green-500 ml-2 animate-pulse"
                  >Đang cập nhật...</span
                >
              </td>
              <td class="p-4 text-blue-600 font-semibold">{{ formatPrice(item.price) }} đ</td>
              <td class="p-4 text-gray-500">Danh mục #{{ item.categoryId }}</td>
            </tr>

            <tr v-if="products && products.length === 0">
              <td colspan="4" class="p-4 text-center text-gray-500">Chưa có dữ liệu sản phẩm.</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
