import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/atoms'
import { useSessionStore } from '@/store/session.store'

export function OrderSuccessPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const user = useSessionStore((s) => s.user)
  const navigate = useNavigate()

  const handleViewOrders = () => {
    if (user) {
      navigate('/orders')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Success Icon */}
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
            <span className="material-symbols-outlined text-5xl text-primary">
              check_circle
            </span>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/10 blur-2xl" />
        </div>

        {/* Title */}
        <h1 className="mt-8 font-headline text-4xl font-extrabold tracking-tight">
          ¡Pedido confirmado!
        </h1>

        {/* Order ID */}
        {orderId && (
          <p className="mt-2 font-mono text-sm text-on-surface-variant">
            Orden #{orderId.slice(0, 8).toUpperCase()}
          </p>
        )}

        {/* Confirmation message */}
        <p className="mt-4 max-w-md text-on-surface-variant">
          Gracias por tu compra. Recibirás un email de confirmación con los detalles de tu pedido
          y el seguimiento del envío.
        </p>

        {/* Estimated delivery */}
        <div className="mt-8 rounded-xl border border-outline-variant/15 bg-surface-container-low p-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-on-surface-variant">
              local_shipping
            </span>
            <div className="text-left">
              <p className="font-medium">Fecha estimada de entrega</p>
              <p className="text-sm text-on-surface-variant">
                5-7 días hábiles
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button variant="primary" onClick={handleViewOrders}>
            Ver mis pedidos
          </Button>
          <Link to="/">
            <Button variant="secondary">Seguir comprando</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}