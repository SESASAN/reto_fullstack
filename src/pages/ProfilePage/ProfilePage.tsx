import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Button, Input } from '@/components/atoms'
import { useSessionStore } from '@/store/session.store'

export function ProfilePage() {
  const user = useSessionStore((s) => s.user)
  const logout = useSessionStore((s) => s.logout)
  const changePassword = useSessionStore((s) => s.changePassword)
  const navigate = useNavigate()

  // Settings state
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Password form
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Notifications settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [promotions, setPromotions] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handlePasswordChange = async () => {
    setPasswordError('')

    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden')
      return
    }
    if (newPassword.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setIsChangingPassword(true)

    try {
      await changePassword(currentPassword, newPassword)
      setPasswordSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => {
        setShowPasswordForm(false)
        setPasswordSuccess(false)
      }, 2000)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cambiar contraseña'
      if (message.includes('incorrecta') || message.includes('invalid') || message.includes('wrong')) {
        setPasswordError('La contraseña actual es incorrecta')
      } else {
        setPasswordError(message)
      }
    } finally {
      setIsChangingPassword(false)
    }
  }

  if (!user) {
    return null
  }

  const providerLabel = user.providerId.includes('google')
    ? 'Google'
    : user.providerId.includes('github')
      ? 'GitHub'
      : 'Email'

  const isEmailProvider = providerLabel === 'Email'

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
            {/* Password Change - only for email provider */}
            {isEmailProvider ? (
              <button
                type="button"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="flex w-full items-center justify-between rounded-lg border border-outline-variant/15 bg-surface-container-low p-4 transition-colors hover:border-primary/30 hover:bg-surface-container"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    lock
                  </span>
                  <span className="font-medium">Cambiar contraseña</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">
                  {showPasswordForm ? 'expand_less' : 'chevron_right'}
                </span>
              </button>
            ) : (
              <div className="flex items-center justify-between rounded-lg border border-outline-variant/15 bg-surface-container-low p-4 opacity-50">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    lock
                  </span>
                  <span className="font-medium text-on-surface-variant">
                    Cambiar contraseña
                  </span>
                </div>
                <span className="text-xs text-on-surface-variant">
                  Usando {providerLabel}
                </span>
              </div>
            )}

            {/* Password Form */}
            {showPasswordForm && isEmailProvider && (
              <div className="rounded-lg border border-outline-variant/15 bg-surface-container-low p-4 space-y-4">
                <Input
                  label="Contraseña actual"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <Input
                  label="Nueva contraseña"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
                <Input
                  label="Confirmar nueva contraseña"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                />

                {passwordError && (
                  <p className="text-sm text-error">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-sm text-green-500">
                    Contraseña actualizada correctamente
                  </p>
                )}

                <Button
                  variant="primary"
                  onClick={handlePasswordChange}
                  disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
                  className="w-full"
                >
                  {isChangingPassword ? 'Actualizando...' : 'Guardar contraseña'}
                </Button>
              </div>
            )}

            {/* Notifications */}
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex w-full items-center justify-between rounded-lg border border-outline-variant/15 bg-surface-container-low p-4 transition-colors hover:border-primary/30 hover:bg-surface-container"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  notifications
                </span>
                <span className="font-medium">Notificaciones</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">
                {showNotifications ? 'expand_less' : 'chevron_right'}
              </span>
            </button>

            {/* Notifications Form */}
            {showNotifications && (
              <div className="rounded-lg border border-outline-variant/15 bg-surface-container-low p-4 space-y-4">
                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-outline-variant/15 bg-surface-container p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      email
                    </span>
                    <div className="text-left">
                      <span className="font-medium">Notificaciones por email</span>
                      <p className="text-sm text-on-surface-variant">
                        Recibe actualizaciones en tu correo
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="toggle"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-outline-variant/15 bg-surface-container p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      local_shipping
                    </span>
                    <div className="text-left">
                      <span className="font-medium">Actualizaciones de pedidos</span>
                      <p className="text-sm text-on-surface-variant">
                        Estado de tus envíos y entregas
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={orderUpdates}
                    onChange={(e) => setOrderUpdates(e.target.checked)}
                    className="toggle"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-outline-variant/15 bg-surface-container p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">
                      sell
                    </span>
                    <div className="text-left">
                      <span className="font-medium">Promociones y ofertas</span>
                      <p className="text-sm text-on-surface-variant">
                        Descuentos y productos exclusivos
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={promotions}
                    onChange={(e) => setPromotions(e.target.checked)}
                    className="toggle"
                  />
                </label>

                <p className="text-sm text-on-surface-variant">
                  Preferencias guardadas automáticamente
                </p>
              </div>
            )}
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