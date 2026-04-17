import { useParams } from 'react-router-dom'

export function ProductDetailPage() {
  const { id } = useParams()

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <h1 className="font-headline text-3xl font-extrabold tracking-tight">
        Detalle del producto
      </h1>
      <p className="mt-2 text-on-surface-variant">Producto #{id}</p>
    </div>
  )
}
