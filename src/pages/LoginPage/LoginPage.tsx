import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { Container } from '@/components/atoms'
import { useSessionStore } from '@/store/session.store'

export function LoginPage() {
  const navigate = useNavigate()

  const { loginWithEmail, loginWithGoogle, loginWithGithub, isLoading, error, clearError } =
    useSessionStore()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [touched, setTouched] = useState({ email: false, password: false })
  const [localError, setLocalError] = useState('')

  const updateField = (field: 'email' | 'password', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (localError) setLocalError('')
    if (error) clearError()
  }

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const isValidEmail = (email: string) => {
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return EmailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setLocalError('Todos los campos son requeridos')
      return
    }

    if (!isValidEmail(formData.email)) {
      setLocalError('Ingresa un correo valido')
      return
    }

    try {
      await loginWithEmail(formData.email, formData.password)
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

  const isFormValid = formData.email && formData.password

  return (
    <Container className="flex-grow flex items-center justify-center py-12 relative overflow-hidden">
      {/* Decorative Ambient Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-primary-container/5 rounded-full blur-[100px]" />

      <div className="w-full max-w-md z-10">
        {/* Brand Anchor */}
        <div className="text-center mb-10">
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-2">
            OBSIDIAN
          </h1>
          <p className="text-on-surface-variant font-medium tracking-tight opacity-70">
            Portal de Acceso
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container border border-outline-variant/15 p-8 md:p-10 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <header className="mb-8">
            <h2 className="font-headline text-2xl font-bold text-on-surface">
              Bienvenido de Vuelta
            </h2>
            <p className="text-on-surface-variant text-sm mt-1">
              Accede a tu perfil de usuario.
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1"
                htmlFor="email"
              >
                Correo Electronico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-[20px]">
                    mail
                  </span>
                </div>
                <input
                  className={[
                    'w-full bg-surface-container-lowest border text-on-surface text-sm rounded-lg py-3 pl-11 pr-4 focus:ring-1 focus:ring-primary transition-all duration-300 placeholder:text-outline/50',
                    touched.email && formData.email && !isValidEmail(formData.email)
                      ? 'border-error focus:border-error'
                      : 'border-outline-variant/30 focus:border-primary',
                  ].join(' ')}
                  id="email"
                  name="email"
                  placeholder="nombre@correo.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                />
              </div>
              {touched.email && formData.email && !isValidEmail(formData.email) && (
                <p className="text-xs text-error mt-1 ml-1">
                  Correo electrónico inválido
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1"
                  htmlFor="password"
                >
                  Contrasena
                </label>
                <a className="text-xs text-primary font-semibold hover:underline" href="#">
                  Olvidaste?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 text-on-surface text-sm rounded-lg py-3 pl-11 pr-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 placeholder:text-outline/50"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                />
              </div>
            </div>

            {/* Error Display */}
            {(localError || error) && (
              <p className="text-sm text-error bg-error-container/20 px-4 py-2 rounded-lg">
                {localError || error}
              </p>
            )}

            {/* Sign In Button */}
            <button
              disabled={!isFormValid || isLoading}
              className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-3.5 rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-surface-container px-4 text-on-surface-variant/50">
                Metodo Alternativo
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-surface-container-low border border-outline-variant/20 py-2.5 rounded-lg text-sm text-on-surface hover:bg-surface-container-high transition-colors group disabled:opacity-50"
              type="button"
            >
              <img
                alt="Google"
                className="w-5 h-5"
                src="/google-icon-logo-svgrepo-com.svg"
              />
              <span>Google</span>
            </button>
            <button
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-surface-container-low border border-outline-variant/20 py-2.5 rounded-lg text-sm text-on-surface hover:bg-surface-container-high transition-colors group disabled:opacity-50"
              type="button"
            >
              <img
                alt="GitHub"
                className="w-5 h-5 brightness-0 invert"
                src="/github-white.svg"
              />
              <span>Github</span>
            </button>
          </div>
        </div>

        {/* Bottom Link */}
        <div className="mt-8 text-center">
          <p className="text-on-surface-variant text-sm">
            No tienes cuenta?{' '}
            <Link
              className="text-primary font-bold ml-1 hover:underline tracking-tight transition-all"
              to="/register"
            >
              Crear Cuenta
            </Link>
          </p>
        </div>
      </div>
    </Container>
  )
}