import { createBrowserRouter, Navigate } from 'react-router-dom'

import { MainLayout } from '@/components/templates/MainLayout'

import { AuthGuard } from '@/components/molecules/AuthGuard'
import { CartPage } from '@/pages/CartPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { FeaturedPage } from '@/pages/FeaturedPage'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { OrderDetailPage } from '@/pages/OrderDetailPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { UiKitPage } from '@/pages/UiKitPage'

// Protected routes - require auth
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <AuthGuard requireAuth>{children}</AuthGuard>
}

// Guest routes - for logged out users only (login/register)
function GuestRoute({ children }: { children: React.ReactNode }) {
  return <AuthGuard requireAuth={false}>{children}</AuthGuard>
}

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFoundPage />, // fallback for routing errors
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/featured', element: <FeaturedPage /> },
      { path: '/products/:slug', element: <ProductDetailPage /> },
      {
        path: '/cart',
        // Cart accessible without login — checkout redirects to login if needed
        element: <CartPage />,
      },
      {
        path: '/checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },
      {
        path: '/orders',
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/orders/:orderId',
        element: (
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        ),
      },
      { path: '/ui', element: <UiKitPage /> },

      // Alias friendly URLs (optional)
      { path: '/home', element: <Navigate to="/" replace /> },

      // Not found
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
