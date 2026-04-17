import { Badge, Button, Container, IconButton, Input } from '@/components/atoms'
import { SearchBar } from '@/components/molecules/SearchBar'

import { UI_KIT_TITLE } from './UiKitPage.constants'

export function UiKitPage() {
  return (
    <Container className="py-16">
      <header className="mb-10">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight md:text-4xl">
          {UI_KIT_TITLE}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-on-surface-variant md:text-base">
          Catálogo interno de componentes.
        </p>
      </header>

      <div className="grid gap-6">
        <section className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-2xl">
          <h2 className="font-headline text-xl font-bold">Botones</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="primary">Primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="ghost">Transparente</Button>
            <Button variant="danger">Peligro</Button>
            <Button disabled>Deshabilitado</Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="sm">Tamaño S</Button>
            <Button size="md">Tamaño M</Button>
            <Button size="lg">Tamaño L</Button>
            <Button fullWidth className="max-w-md">
              Ancho completo (contenedor)
            </Button>
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-2xl">
          <h2 className="font-headline text-xl font-bold">Inputs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide text-on-surface-variant">
                Normal
              </p>
              <Input placeholder="Buscar productos" />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide text-on-surface-variant">
                Con error
              </p>
              <Input placeholder="Correo" error="El correo es obligatorio" />
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold tracking-wide text-on-surface-variant">
              SearchBar
            </p>
            <SearchBar />
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-2xl">
          <h2 className="font-headline text-xl font-bold">Badges</h2>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge>Nuevo</Badge>
            <Badge variant="primary">3</Badge>
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-8 shadow-2xl">
          <h2 className="font-headline text-xl font-bold">Botones de icono</h2>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <IconButton
              ariaLabel="Carrito"
              icon={
                <span className="material-symbols-outlined text-[20px]">
                  shopping_cart
                </span>
              }
            />
            <IconButton
              ariaLabel="Cuenta"
              icon={
                <span className="material-symbols-outlined text-[20px]">
                  account_circle
                </span>
              }
            />
          </div>
        </section>
      </div>
    </Container>
  )
}
