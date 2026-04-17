import { http } from './http'

import type { Product } from '@/types'

export async function getProducts() {
  const { data } = await http.get<Product[]>('/products')
  return data
}

export async function getProductById(id: number) {
  const { data } = await http.get<Product>(`/products/${id}`)
  return data
}

export async function getCategories() {
  const { data } = await http.get<string[]>('/products/categories')
  return data
}
