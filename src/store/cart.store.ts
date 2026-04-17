import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { CartItem, Product } from '@/types'

export type CartState = {
  items: CartItem[]

  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  increment: (productId: number) => void
  decrement: (productId: number) => void
  setQuantity: (productId: number, quantity: number) => void
  clear: () => void

  totalItems: () => number
  subtotal: () => number
}

const clampInt = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, Math.trunc(value)))

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const q = clampInt(quantity, 1, 99)
          const existing = state.items.find((i) => i.product.id === product.id)
          if (!existing) {
            return {
              ...state,
              items: [...state.items, { product, quantity: q }],
            }
          }

          return {
            ...state,
            items: state.items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: clampInt(i.quantity + q, 1, 99) }
                : i,
            ),
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          ...state,
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      increment: (productId) =>
        set((state) => ({
          ...state,
          items: state.items.map((i) =>
            i.product.id === productId
              ? { ...i, quantity: clampInt(i.quantity + 1, 1, 99) }
              : i,
          ),
        })),

      decrement: (productId) =>
        set((state) => ({
          ...state,
          items: state.items
            .map((i) =>
              i.product.id === productId
                ? { ...i, quantity: clampInt(i.quantity - 1, 0, 99) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      setQuantity: (productId, quantity) =>
        set((state) => {
          const q = clampInt(quantity, 0, 99)
          return {
            ...state,
            items:
              q === 0
                ? state.items.filter((i) => i.product.id !== productId)
                : state.items.map((i) =>
                    i.product.id === productId ? { ...i, quantity: q } : i,
                  ),
          }
        }),

      clear: () => set({ items: [] }),

      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    }),
    {
      name: 'obsidian_cart',
      version: 1,
    },
  ),
)
