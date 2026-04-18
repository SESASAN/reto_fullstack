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

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const q = query(
    ordersCollection,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => {
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