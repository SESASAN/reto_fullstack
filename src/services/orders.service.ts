import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from './firebase'
import type { CartItem } from '@/types'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type OrderItem = {
  productId: number
  title: string
  price: number
  quantity: number
  image: string
}

export type Order = {
  id: string
  userId: string
  email: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: OrderStatus
  createdAt: Date
}

export type CreateOrderData = {
  userId: string
  email: string
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

const ordersCollection = collection(db, 'orders')

export async function createOrder(data: CreateOrderData): Promise<string> {
  const orderItems: OrderItem[] = data.items.map((item) => ({
    productId: item.product.id,
    title: item.product.title,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.image,
  }))

  const docRef = await addDoc(ordersCollection, {
    userId: data.userId,
    email: data.email,
    items: orderItems,
    subtotal: data.subtotal,
    shipping: data.shipping,
    tax: data.tax,
    total: data.total,
    status: 'pending',
    createdAt: serverTimestamp(),
  })

  return docRef.id
}

export type GetOrdersParams = {
  userId: string
  limit?: number
  startAfter?: Date
  month?: number // 1-12
  year?: number
}

export type GetOrdersResult = {
  orders: Order[]
  hasMore: boolean
  total: number
}

export async function getOrdersByUser(params: GetOrdersParams): Promise<GetOrdersResult> {
  const { userId, limit = 5, startAfter, month, year } = params

  // Get all orders for user (we'll filter client-side for month/year + pagination)
  const q = query(
    ordersCollection,
    where('userId', '==', userId),
  )

  const snapshot = await getDocs(q)

  let orders = snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      userId: data.userId,
      email: data.email,
      items: data.items,
      subtotal: data.subtotal,
      shipping: data.shipping,
      tax: data.tax,
      total: data.total,
      status: data.status,
      createdAt: data.createdAt?.toDate() || new Date(),
    } as Order
  })

  // Sort client-side by createdAt descending
  orders = orders.sort((a, b) => 
    (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
  )

  // Filter by month and year if provided
  if (month || year) {
    orders = orders.filter((order) => {
      const orderDate = order.createdAt
      if (month && year) {
        return orderDate.getMonth() + 1 === month && orderDate.getFullYear() === year
      }
      if (month) {
        return orderDate.getMonth() + 1 === month
      }
      if (year) {
        return orderDate.getFullYear() === year
      }
      return true
    })
  }

  const total = orders.length

  // Apply startAfter pagination
  if (startAfter) {
    const startIndex = orders.findIndex(
      (o) => o.createdAt.getTime() <= startAfter.getTime()
    )
    if (startIndex > 0) {
      orders = orders.slice(startIndex)
    }
  }

  // Apply limit
  const paginatedOrders = orders.slice(0, limit + 1)
  const hasMore = paginatedOrders.length > limit

  return {
    orders: paginatedOrders.slice(0, limit),
    hasMore,
    total,
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const docRef = doc(db, 'orders', orderId)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    return null
  }

  const data = snapshot.data()
  return {
    id: snapshot.id,
    userId: data.userId,
    email: data.email,
    items: data.items,
    subtotal: data.subtotal,
    shipping: data.shipping,
    tax: data.tax,
    total: data.total,
    status: data.status,
    createdAt: data.createdAt?.toDate() || new Date(),
  } as Order
}