export interface CategoryResponse {
  id: number
  name: string
  description?: string
}

export interface CarResponse {
  id: number
  name: string
  brand?: string // Thêm thương hiệu
  price: number
  salePrice?: number // Thêm giá sale (có thể optional)
  stockQuantity: number // Thêm số lượng tồn kho
  description: string
  imageUrl?: string // Thêm link ảnh 2D
  modelUrl: string // VD: /models/ferrari.glb
  color: string
  categoryId: number
  categoryName: string
}

export interface CarRequest {
  name: string
  brand?: string // Thêm thương hiệu
  price: number
  salePrice?: number // Thêm giá sale
  stockQuantity: number // Thêm số lượng tồn kho
  description: string
  imageUrl?: string // Thêm link ảnh 2D
  modelUrl: string
  color: string
  categoryId: number
}
