import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Button, Input } from '@/components/atoms'
import { useSessionStore } from '@/store/session.store'

import { REGISTER_TITLE } from './RegisterPage.constants'

export function RegisterPage() {
  const navigate = useNavigate()

  const {
    registerWithEmail,
    loginWithGoogle,
    loginWithGithub,
    isLoading,
    error,
    clearError,
  } = useSessionStore()

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [touched, setTouched] = useState({ displayName: false, email: false, password: false, confirmPassword: false })
  const [localError, setLocalError] = useState('')

  const updateField = (
    field: 'displayName' | 'email' | 'password' | 'confirmPassword',
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (localError) setLocalError('')
    if (error) clearError()
  }

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const isValidEmail = (email: string) => {
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return EmailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.displayName || !formData.email || !formData.password) {
      setLocalError('Todos los campos son requeridos')
      return
    }

    if (!isValidEmail(formData.email)) {
      setLocalError('Ingresa un correo valido')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Las contrasenas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      setLocalError('La contrasena debe tener al menos 6 caracteres')
      return
    }

    try {
      await registerWithEmail(
        formData.email,
        formData.password,
        formData.displayName,
      )
      navigate('/')
    } catch {
      // Error ya manejado por el store
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      navigate('/')
    } catch {
      // Error ya manejado por el store
    }
  }

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub()
      navigate('/')
    } catch {
      // Error ya manejado por el store
    }
  }

  const isFormValid =
    formData.displayName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword

  return (
    <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Ambient Aesthetic Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] rounded-full" />

      <div className="w-full max-w-xl px-6 py-12 relative z-10">
        {/* Brand Header */}
        <div className="mb-10 text-center">
          <h1 className="font-headline text-4xl font-black tracking-tighter text-on-surface uppercase mb-2">
            OBSIDIAN
          </h1>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-outline">
            Inicializar Acceso al Sistema
          </p>
        </div>

        {/* Central Card Container */}
        <div className="bg-surface-container p-8 md:p-12 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-outline-variant/15">
          <div className="mb-8">
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-1">
              Crear Cuenta
            </h2>
            <p className="text-on-surface-variant text-sm">
              Unete al circuito de alta tecnologia.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <label
                className="font-label text-xs uppercase tracking-widest text-outline-variant block ml-1"
                htmlFor="displayName"
              >
                Nombre Completo
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                  person
                </span>
                <input
                  className="w-full bg-surface-container-low border-none rounded-lg py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant/50 focus:ring-1 focus:ring-primary transition-all font-medium"
                  id="displayName"
                  placeholder="NOMBRE COMPLETO"
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => updateField('displayName', e.target.value)}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label
                className="font-label text-xs uppercase tracking-widest text-outline-variant block ml-1"
                htmlFor="email"
              >
                Correo Electronico
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                  alternate_email
                </span>
                <input
                  className={[
                    'w-full bg-surface-container-low border-none rounded-lg py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant/50 focus:ring-1 focus:ring-primary transition-all font-medium',
                    touched.email && formData.email && !isValidEmail(formData.email)
                      ? 'border border-error'
                      : '',
                  ].join(' ')}
                  id="email"
                  placeholder="nombre@correo.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                />
              </div>
              {touched.email && formData.email && !isValidEmail(formData.email) && (
                <p className="text-xs text-error mt-1 ml-1">
                  Correo electronico invalido
                </p>
              )}
            </div>

            {/* Two-Column Secure Keys (Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Secure Key */}
              <div className="space-y-2">
                <label
                  className="font-label text-xs uppercase tracking-widest text-outline-variant block ml-1"
                  htmlFor="password"
                >
                  Contrasena
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                    encrypted
                  </span>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant/50 focus:ring-1 focus:ring-primary transition-all font-medium"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                  />
                </div>
              </div>

              {/* Confirm Key */}
              <div className="space-y-2">
                <label
                  className="font-label text-xs uppercase tracking-widest text-outline-variant block ml-1"
                  htmlFor="confirmPassword"
                >
                  Confirmar Contrasena
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                    key_visualizer
                  </span>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg py-3 pl-12 pr-4 text-on-surface placeholder:text-outline-variant/50 focus:ring-1 focus:ring-primary transition-all font-medium"
                    id="confirmPassword"
                    placeholder="••••••••"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Error Display */}
            {(localError || error) && (
              <p className="text-sm text-error bg-error-container/20 px-4 py-2 rounded-lg">
                {localError || error}
              </p>
            )}

            {/* Primary Action */}
            <button
              disabled={!isFormValid || isLoading}
              className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-extrabold uppercase tracking-widest py-4 rounded-lg shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isLoading ? 'Creando...' : 'Crear Cuenta'}
              <span className="material-symbols-outlined text-xl">sensors</span>
            </button>
          </form>

          {/* Secondary Protocol Section */}
          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-container px-4 text-outline font-label tracking-widest">
                Metodo Alternativo
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="bg-surface-container-low hover:bg-surface-variant flex items-center justify-center gap-3 py-3 rounded-lg border border-outline-variant/15 transition-all group disabled:opacity-50"
              type="button"
            >
              <img
                alt="Google"
                className="w-5 h-5"
                src="/google-icon-logo-svgrepo-com.svg"
              />
              <span className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant group-hover:text-on-surface">
                Google
              </span>
            </button>
            <button
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="bg-surface-container-low hover:bg-surface-variant flex items-center justify-center gap-3 py-3 rounded-lg border border-outline-variant/15 transition-all group disabled:opacity-50"
              type="button"
            >
              <img
                alt="GitHub"
                className="w-5 h-5"
                src="/github-white.svg"
              />
              <span className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant group-hover:text-on-surface">
                Github
              </span>
            </button>
          </div>
        </div>

        {/* Auth Switch */}
        <div className="mt-8 text-center">
          <p className="text-on-surface-variant text-sm font-medium">
            Ya tienes una cuenta?{' '}
            <Link
              className="text-primary hover:text-primary-container transition-colors ml-1 underline decoration-primary/20 underline-offset-4"
              to="/login"
            >
              Iniciar Sesion
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}