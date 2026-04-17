import { CART_TITLE } from './CartPage.constants'

export function CartPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold tracking-tight">{CART_TITLE}</h1>
      <p className="mt-2 text-on-surface-variant">
        Revisa tus productos, ajusta cantidades y continúa al checkout.
      </p>
    </div>
  )
}
