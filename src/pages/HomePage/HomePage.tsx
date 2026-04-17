export function HomePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl">
        OBSIDIAN
      </h1>
      <p className="mt-4 max-w-2xl text-on-surface-variant">
        Selección curada de hardware y periféricos. Rendimiento, estética y precisión.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-2xl">
          <h2 className="font-headline text-xl font-bold">Novedades</h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Descubre lanzamientos recientes y ediciones limitadas.
          </p>
        </div>
        <div className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-2xl">
          <h2 className="font-headline text-xl font-bold">Experiencia premium</h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Navegación rápida, diseño oscuro y foco en lo esencial.
          </p>
        </div>
      </div>
    </div>
  )
}
