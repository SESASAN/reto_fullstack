import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { formatPrice } from '@/styles/formatPrice'
import {
  getOrdersByUser,
  type Order,
  type OrderStatus,
} from '@/services/orders.service'
import { useSessionStore } from '@/store/session.store'

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  processing: 'Procesando',
  shipped: 'En Camino',
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

const MONTHS = [
  { value: 0, label: 'Todos los meses' },
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' },
]

const YEARS = [
  { value: 0, label: 'Todos los años' },
  { value: 2026, label: '2026' },
  { value: 2025, label: '2025' },
  { value: 2024, label: '2024' },
  { value: 2023, label: '2023' },
]

export function OrdersPage() {
  const user = useSessionStore((s) => s.user)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)

  // Filter states
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [selectedYear, setSelectedYear] = useState(0)

  const fetchOrders = async (reset = false) => {
    if (!user) return

    setIsLoading(true)
    try {
      const startAfter = reset ? undefined : orders[orders.length - 1]?.createdAt

      const result = await getOrdersByUser({
        userId: user.uid,
        limit: 5,
        startAfter,
        month: selectedMonth || undefined,
        year: selectedYear || undefined,
      })

      if (reset) {
        setOrders(result.orders)
        setPage(0)
      } else {
        setOrders((prev) => [...prev, ...result.orders])
        setPage((prev) => prev + 1)
      }
      setHasMore(result.hasMore)
      setTotal(result.total)
    } catch (err) {
      console.error('Error fetching orders:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!user) return
    fetchOrders(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedMonth, selectedYear])

  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchOrders(false)
    }
  }

  const handleFilterChange = (month: number, year: number) => {
    setSelectedMonth(month)
    setSelectedYear(year)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight">
          Historial de Órdenes
        </h1>
        <p className="mt-2 text-on-surface-variant">
          Debes iniciar sesión para ver tus órdenes.
        </p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface mb-2">
          Historial de Órdenes
        </h1>
        <p className="text-on-surface-variant font-body">
          Seguimiento de tus pedidos.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <select
          value={selectedMonth}
          onChange={(e) =>
            handleFilterChange(Number(e.target.value), selectedYear)
          }
          className="min-w-[160px] bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 text-sm text-on-surface focus:ring-1 focus:ring-primary"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) =>
            handleFilterChange(selectedMonth, Number(e.target.value))
          }
          className="min-w-[160px] bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 text-sm text-on-surface focus:ring-1 focus:ring-primary"
        >
          {YEARS.map((y) => (
            <option key={y.value} value={y.value}>
              {y.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      {total > 0 && (
        <p className="mb-4 text-sm text-on-surface-variant">
          Mostrando {orders.length} de {total} órdenes
        </p>
      )}

      {/* Orders List */}
      {orders.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-surface-container-low rounded-[2rem] border-2 border-dashed border-outline-variant/20">
          <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mb-6 text-outline">
            <span className="material-symbols-outlined text-4xl">inventory_2</span>
          </div>
          <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">
            Sin Pedidos
          </h3>
          <p className="text-on-surface-variant max-w-md mx-auto mb-8">
            Tu historial está vacío. Explora nuestro último hardware
            para comenzar tu coleccion.
          </p>
          <Link
            to="/"
            className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            Comenzar a Comprar
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="group bg-surface-container rounded-2xl p-8 hover:translate-y-[-4px] transition-all duration-300 border border-outline-variant/10 hover:border-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-8">
                {/* Left Side */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-headline font-bold text-xl text-primary">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="text-outline text-sm">*</span>
                    <span className="text-on-surface-variant font-medium">
                      {formatDate(order.createdAt)}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </div>

                  {/* Products */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-20 bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10"
                      >
                        <img
                          className="w-full h-full object-contain p-2"
                          src={item.image}
                          alt={item.title}
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-20 h-20 bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex items-center justify-center text-sm text-on-surface-variant">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  <div className="text-on-surface-variant text-sm font-medium">
                    <span className="text-on-surface">Items:</span>{' '}
                    {order.items.map((i) => i.title).join(', ')}
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-start lg:items-end justify-between min-w-[200px] h-full gap-6">
                  <div className="text-right">
                    <p className="text-xs text-outline uppercase tracking-widest mb-1">
                      Precio Total
                    </p>
                    <p className="text-3xl font-headline font-extrabold text-on-surface">
                      {formatPrice(order.total, 'USD')}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button className="bg-surface-container-high text-on-surface hover:bg-surface-bright transition-colors px-6 py-2.5 rounded-xl font-bold text-sm">
                      Ver Detalles
                    </button>
                    {order.status === 'delivered' ? (
                      <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary hover:brightness-110 transition-all px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        Recomprar
                      </button>
                    ) : (
                      <button className="border border-primary/20 text-primary hover:bg-primary/5 transition-all px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">
                          local_shipping
                        </span>
                        Rastrear
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More / Pagination */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="bg-surface-container-high hover:bg-surface-bright transition-colors px-8 py-3 rounded-xl font-bold text-sm disabled:opacity-50"
          >
            {isLoading ? 'Cargando...' : 'Cargar Mas'}
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && orders.length === 0 && (
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </main>
  )
}