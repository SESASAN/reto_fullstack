import { Navigate } from 'react-router-dom'

import { useSessionStore } from '@/store/session.store'

type AuthGuardProps = {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = '/login',
}: AuthGuardProps) {
  const user = useSessionStore((s) => s.user)
  const isLoading = useSessionStore((s) => s.isLoading)

  // While checking auth state, show nothing
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  // If route requires auth but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} replace />
  }

  // If route is for guest (login/register) but user IS logged in
  if (!requireAuth && user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}