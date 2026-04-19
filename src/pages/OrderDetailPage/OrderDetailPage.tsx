import { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { formatPrice } from '@/styles/formatPrice'
import {
  getOrderById,
  type Order,
  type OrderStatus,
} from '@/services/orders.service'
import { useSessionStore } from '@/store/session.store'

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  processing: 'Procesando',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  shipped: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const trackingSteps = [
  { status: 'pending', icon: 'check', label: 'Confirmado' },
  { status: 'processing', icon: 'precision_manufacturing', label: 'Procesando' },
  { status: 'shipped', icon: 'local_shipping', label: 'Enviado' },
  { status: 'delivered', icon: 'inventory_2', label: 'Entregado' },
] as const

function getStepIndex(status: OrderStatus): number {
  const idx = trackingSteps.findIndex((s) => s.status === status)
  return idx >= 0 ? idx : 0
}

export function OrderDetailPage() {
  const { orderId } = useParams()
  const user = useSessionStore((s) => s.user)

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!orderId || !user) return

    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId)
        if (!data) {
          setError('Orden no encontrada')
          return
        }
        if (data.userId !== user.uid) {
          setError('No tienes acceso a esta orden')
          return
        }
        setOrder(data)
      } catch (err) {
        setError('Error al cargar la orden')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, user])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight">
          Detalle de Orden
        </h1>
        <p className="mt-2 text-on-surface-variant">
          Debes iniciar sesión para ver tus órdenes.
        </p>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight">
          Detalle de Orden
        </h1>
        <p className="mt-2 text-error">{error || 'Orden no encontrada'}</p>
        <Link
          to="/orders"
          className="mt-4 inline-block text-primary hover:underline"
        >
          Volver a órdenes
        </Link>
      </main>
    )
  }

  const currentStep = getStepIndex(order.status)

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border ${
                statusColors[order.status]
              }`}
            >
              {statusLabels[order.status]}
            </span>
            <span className="text-on-surface-variant font-mono text-sm tracking-tighter">
              ID de Orden: #{order.id.toUpperCase()}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface">
            Detalle de Orden
          </h1>
          <p className="text-on-surface-variant font-medium">
            Realizado el {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            to="/orders"
            className="px-6 py-3 rounded-xl border border-outline-variant/30 text-sm font-bold tracking-wide hover:bg-surface-container transition-all"
          >
            Volver a Órdenes
          </Link>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Tracking & Items */}
        <div className="lg:col-span-8 space-y-8">
          {/* Track Shipment */}
          <section className="bg-surface-container-low rounded-3xl p-8 shadow-xl border border-white/5">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-extrabold tracking-tight">
                Rastrear Envío
              </h2>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Llegada Estimada
                </p>
                <p className="font-bold text-primary">
                  {formatDate(new Date(order.createdAt.getTime() + 4 * 24 * 60 * 60 * 1000))}
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-4">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant/20 -translate-y-1/2 hidden md:block" />
              <div
                className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 hidden md:block"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />

              {/* Steps */}
              {trackingSteps.map((step, idx) => {
                const isCompleted = idx <= currentStep
                const isCurrent = idx === currentStep
                return (
                  <div
                    key={step.status}
                    className={`relative z-10 flex flex-row md:flex-col items-center gap-4 group ${
                      !isCompleted ? 'opacity-40' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                        isCompleted
                          ? 'bg-primary text-on-primary shadow-primary/40'
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {step.icon}
                      </span>
                    </div>
                    <div className="text-left md:text-center">
                      <p className="text-sm font-bold text-on-surface">
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-[10px] text-on-surface-variant uppercase">
                          {formatTime(order.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Items */}
          <section className="space-y-4">
            <h2 className="text-xl font-extrabold tracking-tight mb-6 flex items-center gap-3">
              Productos{' '}
              <span className="text-on-surface-variant text-sm font-normal">
                ({order.items.length})
              </span>
            </h2>

            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-container rounded-3xl p-6 flex flex-col md:flex-row items-center gap-8 border border-white/5 hover:border-primary/20 transition-all"
              >
                <div className="w-40 h-40 bg-surface-container-lowest rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    alt={item.title}
                    className="w-full h-full object-contain p-4"
                    src={item.image}
                  />
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold tracking-tight text-on-surface">
                      {item.title}
                    </h3>
                    <p className="text-xl font-black text-primary">
                      {formatPrice(item.price * item.quantity, 'USD')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-xs uppercase tracking-widest text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">
                      Cantidad: {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column: Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* Order Summary */}
          <section className="bg-surface-container-high rounded-3xl p-8 shadow-2xl border border-white/5">
            <h2 className="text-lg font-extrabold tracking-tight mb-6">
              Resumen de Orden
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal, 'USD')}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Envío</span>
                <span>{formatPrice(order.shipping, 'USD')}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-medium">
                <span>Impuesto</span>
                <span>{formatPrice(order.tax, 'USD')}</span>
              </div>
              <div className="h-[1px] bg-outline-variant/20 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-primary">
                  {formatPrice(order.total, 'USD')}
                </span>
              </div>
            </div>
          </section>

          {/* Shipping Info */}
          {order.shippingInfo && (
            <section className="bg-surface-container-low rounded-3xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <span className="material-symbols-outlined">local_shipping</span>
                <h3 className="font-bold tracking-tight">Dirección de Entrega</h3>
              </div>
              <div className="text-on-surface-variant text-sm leading-relaxed">
                <p className="font-bold text-on-surface">
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                </p>
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.state}{' '}
                  {order.shippingInfo.zip}
                </p>
              </div>
            </section>
          )}

          {/* Support */}
          <section className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
            <h3 className="font-bold tracking-tight text-primary mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                support_agent
              </span>
              ¿Necesitas Ayuda?
            </h3>
            <p className="text-on-surface-variant text-xs mb-4">
              Nuestro equipo de soporte está disponible 24/7.
            </p>
            <Link
              to="/contact"
              className="text-xs font-bold text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Contactar Soporte
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}