import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/utils/constants'
import Spinner from '@/components/ui/Spinner'

/* ── Full-page loading screen shown while token is being verified ── */
function AuthLoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg)',
    }}>
      <Spinner size={32} />
    </div>
  )
}

/**
 * PrivateRoute
 * Wraps dashboard routes. Redirects to /auth/login if not authenticated.
 * Preserves the intended path in location.state so we can redirect back after login.
 */
export function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <AuthLoadingScreen />

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return children
}

/**
 * PublicOnlyRoute
 * Wraps auth pages. Redirects to /dashboard if user is already logged in.
 */
export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <AuthLoadingScreen />

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return children
}