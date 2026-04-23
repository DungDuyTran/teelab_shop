export interface CategoryResponse {
  id: number
  name: string
  description?: string
}

export interface CarResponse {
  id: number
  name: string
  price: number
  description: string
  modelUrl: string // VD: /models/ferrari.glb
  color: string
  categoryId: number
  categoryName: string
}

export interface CarRequest {
  name: string
  price: number
  description: string
  modelUrl: string
  color: string
  categoryId: number
}
