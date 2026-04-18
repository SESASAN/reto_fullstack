import { createBrowserRouter, Navigate } from 'react-router-dom'

import { MainLayout } from '@/components/templates/MainLayout'

import { CartPage } from '@/pages/CartPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { FeaturedPage } from '@/pages/FeaturedPage'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { UiKitPage } from '@/pages/UiKitPage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFoundPage />, // fallback for routing errors
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/featured', element: <FeaturedPage /> },
      { path: '/products/:slug', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/ui', element: <UiKitPage /> },

      // Alias friendly URLs (optional)
      { path: '/home', element: <Navigate to="/" replace /> },

      // Not found
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
