import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Button, Input } from '@/components/atoms'
import { formatPrice } from '@/styles/formatPrice'
import { useCartStore } from '@/store/cart.store'
import { useSessionStore } from '@/store/session.store'
import { createOrder } from '@/services/orders.service'

import { CHECKOUT_TITLE } from './CheckoutPage.constants'

export function CheckoutPage() {
  const navigate = useNavigate()
  const items = useCartStore((s) => s.items)
  const clear = useCartStore((s) => s.clear)

  const user = useSessionStore((s) => s.user)

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
  const shipping = 25.0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal'>('credit')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      return
    }

    setIsProcessing(true)

    try {
      await createOrder({
        userId: user.uid,
        email: user.email || '',
        items,
        subtotal,
        shipping,
        tax,
        total,
      })

      setOrderComplete(true)
      clear()
    } catch (err) {
      console.error('Error creating order:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.address &&
    formData.city &&
    formData.state &&
    formData.zip

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight">
          {CHECKOUT_TITLE}
        </h1>
        <p className="mt-2 text-on-surface-variant">Tu carrito está vacío.</p>

        <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-outline-variant/10 bg-surface-container-low p-16 text-center">
          <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40">
            shopping_cart_off
          </span>
          <h2 className="mt-6 font-headline text-2xl font-bold text-on-surface">
            No hay productos para comprar
          </h2>
          <p className="mt-2 max-w-xs text-on-surface-variant">
            Agrega productos al carrito para continuar.
          </p>
          <Link to="/">
            <Button variant="primary" className="mt-8">
              Volver al catálogo
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
            <span className="material-symbols-outlined text-5xl text-primary">
              check_circle
            </span>
          </div>
          <h1 className="mt-8 font-headline text-4xl font-extrabold tracking-tight">
            ¡Pedido confirmado!
          </h1>
          <p className="mt-4 max-w-md text-on-surface-variant">
            Gracias por tu compra. Recibirás un email de confirmación con los
            detalles de tu pedido.
          </p>
          <Link to="/">
            <Button variant="primary" className="mt-8">
              Seguir comprando
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Forms */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-2">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight">
              Secure Checkout
            </h1>
            <p className="text-on-surface-variant">
              Completa tu orden para finalizar la compra.
            </p>
          </div>

          {/* Shipping Form */}
          <section className="rounded-xl bg-surface-container p-8 shadow-2xl space-y-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                local_shipping
              </span>
              <h2 className="font-headline text-xl font-bold tracking-tight">
                Información de envío
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
              />
              <Input
                label="Apellido"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
              />
              <div className="md:col-span-2">
                <Input
                  label="Dirección"
                  placeholder="123 Calle Principal"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                />
              </div>
              <Input
                label="Ciudad"
                placeholder="Ciudad"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Estado"
                  placeholder="ST"
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                />
                <Input
                  label="Código postal"
                  placeholder="10101"
                  value={formData.zip}
                  onChange={(e) => updateField('zip', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Payment Form */}
          <section className="rounded-xl bg-surface-container p-8 shadow-2xl space-y-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">payments</span>
              <h2 className="font-headline text-xl font-bold tracking-tight">
                Método de pago
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                className={[
                  'flex cursor-pointer items-center justify-between rounded-lg border p-5 transition-all',
                  paymentMethod === 'credit'
                    ? 'border-primary ring-1 ring-primary bg-primary/5'
                    : 'border-outline-variant/15 bg-surface-container-low',
                ].join(' ')}
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    credit_card
                  </span>
                  <span className="font-medium">Tarjeta de crédito</span>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'credit'}
                  onChange={() => setPaymentMethod('credit')}
                  className="hidden"
                />
                <div
                  className={[
                    'h-4 w-4 rounded-full border border-outline-variant flex items-center justify-center',
                    paymentMethod === 'credit' && 'border-primary',
                  ].join(' ')}
                >
                  {paymentMethod === 'credit' && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              </label>

              <label
                className={[
                  'flex cursor-pointer items-center justify-between rounded-lg border p-5 transition-all',
                  paymentMethod === 'paypal'
                    ? 'border-primary ring-1 ring-primary bg-primary/5'
                    : 'border-outline-variant/15 bg-surface-container-low',
                ].join(' ')}
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    account_balance_wallet
                  </span>
                  <span className="font-medium">PayPal</span>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="hidden"
                />
                <div
                  className={[
                    'h-4 w-4 rounded-full border border-outline-variant flex items-center justify-center',
                    paymentMethod === 'paypal' && 'border-primary',
                  ].join(' ')}
                >
                  {paymentMethod === 'paypal' && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              </label>
            </div>

            {paymentMethod === 'credit' && (
              <div className="space-y-6 border-t border-outline-variant/10 pt-6">
                <Input
                  label="Número de tarjeta"
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  onChange={(e) => updateField('cardNumber', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-6">
                  <Input
                    label="Fecha de expiración"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={(e) => updateField('expiry', e.target.value)}
                  />
                  <Input
                    label="CVV"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => updateField('cvv', e.target.value)}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <p className="text-on-surface-variant text-sm">
                Serás redirigido a PayPal para completar el pago.
              </p>
            )}
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-8">
            <section className="rounded-xl bg-surface-container-low p-8 shadow-2xl border border-outline-variant/5">
              <h2 className="font-headline text-xl font-bold tracking-tight mb-8">
                Resumen del pedido
              </h2>

              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4"
                  >
                    <div className="h-20 w-20 rounded-lg bg-surface-container overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-on-surface line-clamp-1">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <div className="font-headline font-extrabold text-primary">
                      {formatPrice(item.product.price * item.quantity, 'USD')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 space-y-4 border-t border-outline-variant/10 pt-6">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, 'USD')}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Envío (Express)</span>
                  <span>{formatPrice(shipping, 'USD')}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Impuesto</span>
                  <span>{formatPrice(tax, 'USD')}</span>
                </div>
                <div className="flex justify-end pt-4">
                  <div className="text-right">
                    <span className="block text-xs font-black tracking-widest text-primary uppercase mb-1">
                      Total
                    </span>
                    <span className="font-headline text-3xl font-extrabold text-primary tracking-tighter">
                      {formatPrice(total, 'USD')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={!isFormValid || isProcessing}
                onClick={handleSubmit}
                className={[
                  'mt-10 w-full py-5 rounded-xl font-bold text-lg transition-all',
                  isFormValid && !isProcessing
                    ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(199,191,255,0.3)]'
                    : 'bg-surface-container text-on-surface-variant cursor-not-allowed',
                ].join(' ')}
              >
                {isProcessing ? 'Procesando...' : 'Confirmar pedido'}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span className="uppercase tracking-widest">Transacción encriptada</span>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-surface-container p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  verified_user
                </span>
                <span className="text-xs font-bold uppercase">2 años de garantía</span>
              </div>
              <div className="rounded-lg bg-surface-container p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  support_agent
                </span>
                <span className="text-xs font-bold uppercase">Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
