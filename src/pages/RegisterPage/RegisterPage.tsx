import { REGISTER_TITLE } from './RegisterPage.constants'

export function RegisterPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold tracking-tight">{REGISTER_TITLE}</h1>
      <p className="mt-2 text-on-surface-variant">
        Crea tu cuenta para gestionar tus compras y órdenes.
      </p>
    </div>
  )
}
