function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="mx-auto max-w-[1440px] px-6 pt-16 md:px-8">
        <h1 className="mt-6 font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
          OBSIDIAN
        </h1>
        <p className="mt-3 max-w-xl text-sm text-on-surface-variant md:text-base">
          El curador digital. Hardware de alto rendimiento, curado.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-xl bg-obsidian-primary px-6 py-3 font-bold text-on-primary shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]">
            Explorar colección
          </button>
          <button className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-6 py-3 font-bold text-on-surface transition-colors hover:bg-surface-container-high">
            Especificaciones técnicas
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 pb-16 pt-12 md:px-8">
        <section className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-2xl md:p-10">
          <h2 className="font-headline text-xl font-bold tracking-tight text-on-surface">
            Inventario curado
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Próximamente: catálogo, carrito y checkout.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
