import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/atoms'
import { useSessionStore } from '@/store/session.store'

export function ProfilePage() {
  const user = useSessionStore((s) => s.user)
  const logout = useSessionStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (!user) {
    return null
  }

  const providerLabel = user.providerId.includes('google')
    ? 'Google'
    : user.providerId.includes('github')
      ? 'GitHub'
      : 'Email'

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight">
            Mi Cuenta
          </h1>
          <p className="mt-2 text-on-surface-variant">
            Gestiona tu información personal y preferencias
          </p>
        </div>

        {/* Profile Card */}
        <section className="rounded-xl bg-surface-container p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">person</span>
            <h2 className="font-headline text-xl font-bold tracking-tight">
              Información del perfil
            </h2>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-6">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Avatar'}
                className="h-20 w-20 rounded-full object-cover ring-2 ring-primary/20"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                <span className="material-symbols-outlined text-4xl text-primary">
                  person
                </span>
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">
                {user.displayName || 'Usuario'}
              </h3>
              <p className="text-sm text-on-surface-variant">{user.email}</p>
            </div>
          </div>

          {/* Info detail */}
          <div className="grid gap-4 rounded-lg border border-outline-variant/15 bg-surface-container-low p-4">
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant">Proveedor</span>
              <span className="font-medium">{providerLabel}</span>
            </div>
          </div>

          {/* Edit Button */}
          <Button variant="secondary" className="w-full">
            Editar perfil
          </Button>
        </section>

        {/* Quick Links */}
        <section className="rounded-xl bg-surface-container p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">inventory_2</span>
            <h2 className="font-headline text-xl font-bold tracking-tight">
              Historial y pedidos
            </h2>
          </div>

          <div className="space-y-3">
            <Link
              to="/orders"
              className="flex items-center justify-between rounded-lg border border-outline-variant/15 bg-surface-container-low p-4 transition-colors hover:border-primary/30 hover:bg-surface-container"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  receipt_long
                </span>
                <span className="font-medium">Mis pedidos</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">
                chevron_right
              </span>
            </Link>

            <Link
              to="/favorites"
              className="flex items-center justify-between rounded-lg border border-outline-variant/15 bg-surface-container-low p-4 transition-colors hover:border-primary/30 hover:bg-surface-container"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  favorite
                </span>
                <span className="font-medium">Mis favoritos</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">
                chevron_right
              </span>
            </Link>
          </div>
        </section>

        {/* Account Actions */}
        <section className="rounded-xl bg-surface-container p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">settings</span>
            <h2 className="font-headline text-xl font-bold tracking-tight">
              Configuración
            </h2>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-outline-variant/15 bg-surface-container-low p-4 transition-colors hover:border-primary/30 hover:bg-surface-container"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  lock
                </span>
                <span className="font-medium">Cambiar contraseña</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">
                chevron_right
              </span>
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-outline-variant/15 bg-surface-container-low p-4 transition-colors hover:border-primary/30 hover:bg-surface-container"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  notifications
                </span>
                <span className="font-medium">Notificaciones</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">
                chevron_right
              </span>
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-outline-variant/15 pt-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-between rounded-lg border border-error/30 bg-error/5 p-4 transition-colors hover:bg-error/10"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error">logout</span>
                <span className="font-medium text-error">Cerrar sesión</span>
              </div>
              <span className="material-symbols-outlined text-error">chevron_right</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}