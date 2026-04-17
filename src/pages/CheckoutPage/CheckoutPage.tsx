import { CHECKOUT_TITLE } from './CheckoutPage.constants'

export function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold tracking-tight">{CHECKOUT_TITLE}</h1>
      <p className="mt-2 text-on-surface-variant">
        Completa tus datos para finalizar la compra.
      </p>
    </div>
  )
}
