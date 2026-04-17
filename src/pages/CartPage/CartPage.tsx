import { Link } from 'react-router-dom'

import { Button, IconButton } from '@/components/atoms'
import { formatPrice } from '@/styles/formatPrice'
import { useCartStore } from '@/store/cart.store'

import { CART_TITLE } from './CartPage.constants'

export function CartPage() {
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.subtotal)
  const totalItems = useCartStore((s) => s.totalItems)
  const increment = useCartStore((s) => s.increment)
  const decrement = useCartStore((s) => s.decrement)
  const removeItem = useCartStore((s) => s.removeItem)

  const isEmpty = items.length === 0
  const shipping = 45.0
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  if (isEmpty) {
    return (
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight">{CART_TITLE}</h1>
        <p className="mt-2 text-on-surface-variant">Tu carrito está vacío.</p>

        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-outline-variant/10 bg-surface-container-low p-16 text-center">
          <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40">
            shopping_cart_off
          </span>
          <h2 className="mt-6 font-headline text-2xl font-bold text-on-surface">
            Tu carrito está vacío
          </h2>
          <p className="mt-2 max-w-xs text-on-surface-variant">
            Agrega productos para comenzar tu configuración.
          </p>
          <Link to="/">
            <Button variant="primary" className="mt-8">
              Continuar comprando
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <h1 className="font-headline text-4xl font-extrabold tracking-tight">{CART_TITLE}</h1>
      <p className="mt-2 text-on-surface-variant font-label">
        {totalItems()} componentes seleccionados.
      </p>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header Labels - desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-4 border-b border-outline-variant/15 text-xs font-black tracking-widest text-on-surface-variant uppercase">
            <div className="col-span-6">Componente</div>
            <div className="col-span-2 text-center">Cantidad</div>
            <div className="col-span-2 text-right">Precio</div>
            <div className="col-span-2"></div>
          </div>

          {/* Items */}
          {items.map((item) => {
            const itemPrice = item.product.price * item.quantity
            return (
              <div
                key={item.product.id}
                className="group bg-surface-container hover:bg-surface-container-high transition-all duration-300 rounded-xl p-6 md:grid md:grid-cols-12 md:items-center gap-4 relative overflow-hidden"
              >
                <div className="col-span-6 flex items-center gap-6">
                  <div className="w-24 h-24 bg-surface-container-lowest rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase mb-1 block">
                      {item.product.category}
                    </span>
                    <h3 className="font-headline text-lg font-bold text-on-surface line-clamp-2">
                      {item.product.title}
                    </h3>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="col-span-2 flex justify-center mt-6 md:mt-0">
                  <div className="flex items-center bg-surface-container-lowest rounded-full px-3 py-1 border border-outline-variant/20">
                    <button
                      className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                      onClick={() => decrement(item.product.id)}
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="mx-4 font-label font-bold text-sm">{item.quantity}</span>
                    <button
                      className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                      onClick={() => increment(item.product.id)}
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-right mt-4 md:mt-0">
                  <p className="font-headline font-extrabold text-lg text-on-surface">
                    {formatPrice(itemPrice, 'USD')}
                  </p>
                </div>

                {/* Delete */}
                <div className="col-span-2 flex justify-end mt-4 md:mt-0">
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-error-container/20 text-outline hover:text-error transition-all"
                    onClick={() => removeItem(item.product.id)}
                    aria-label="Eliminar"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            )
          })}

          {/* Continue Shopping */}
          <div className="pt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary font-label text-sm font-semibold hover:gap-4 transition-all"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Continuar explorando
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-4 sticky top-32">
          <div className="bg-surface-container-high rounded-2xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-outline-variant/10">
            <h2 className="font-headline text-xl font-bold mb-8 text-on-surface">
              Resumen del pedido
            </h2>
            <div className="space-y-6 font-label">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-on-surface font-semibold">
                  {formatPrice(subtotal, 'USD')}
                </span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Envío</span>
                <span className="text-on-surface font-semibold">
                  {formatPrice(shipping, 'USD')}
                </span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Impuesto</span>
                <span className="text-on-surface font-semibold">
                  {formatPrice(tax, 'USD')}
                </span>
              </div>
              <div className="h-px bg-outline-variant/20 my-6"></div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs font-black tracking-widest text-primary uppercase block mb-1">
                    Precio total
                  </span>
                </div>
                <span className="font-headline text-3xl font-black text-on-surface tracking-tighter">
                  {formatPrice(total, 'USD')}
                </span>
              </div>
              <div className="pt-4">
                <Link to="/checkout" className="block">
                  <Button size="lg" className="w-full">
                    Ir al checkout
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 pt-6 text-outline">
                <span className="material-symbols-outlined text-lg">verified_user</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Transacción segura
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
