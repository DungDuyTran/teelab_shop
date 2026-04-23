import { useSWR } from '@/services/useSWR'

interface Product {
  id: number
  name: string
  price: number
  categoryName: string
  categoryId?: number
}

export function useProducts() {
  const {
    data: products,
    isLoading,
    isValidating,
    error,
    mutate: refreshProducts,
  } = useSWR<Product[]>('/products')
}
