import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold tracking-tight">
        Página no encontrada
      </h1>
      <p className="mt-2 text-on-surface-variant">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-xl bg-obsidian-primary px-6 py-3 font-bold text-on-primary shadow-lg shadow-primary/20"
      >
        Volver a la tienda
      </Link>
    </div>
  )
}
