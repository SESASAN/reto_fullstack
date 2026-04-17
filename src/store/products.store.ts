import { create } from 'zustand'

import { getProductById, getProducts } from '@/services/products.api'
import type { Product } from '@/types'

export type ProductsState = {
  products: Product[]
  selectedProduct: Product | null
  isLoading: boolean
  error: string | null

  fetchProducts: () => Promise<void>
  fetchProductById: (id: number) => Promise<Product | null>
  clearSelectedProduct: () => void
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return 'No fue posible cargar los productos.'
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      const products = await getProducts()
      set({ products, isLoading: false, error: null })
    } catch (error) {
      set({ isLoading: false, error: getErrorMessage(error) })
    }
  },

  fetchProductById: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const product = await getProductById(id)
      set({ selectedProduct: product, isLoading: false, error: null })
      return product
    } catch (error) {
      set({ selectedProduct: null, isLoading: false, error: getErrorMessage(error) })
      return null
    }
  },

  clearSelectedProduct: () => set({ selectedProduct: null }),
}))
