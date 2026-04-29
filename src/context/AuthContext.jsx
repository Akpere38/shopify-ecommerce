import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import authApi from '@/api/auth'
import { STORAGE_KEYS } from '@/utils/constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,      setUser]      = useState(null)
  const [isLoading, setIsLoading] = useState(true) // true on mount while verifying token

  /* ── Boot: verify any stored token ─────────────────────────── */
  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    if (!token) { setIsLoading(false); return }

    authApi.verifyToken()
      .then(({ user }) => setUser(user))
      .catch(() => localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN))
      .finally(() => setIsLoading(false))
  }, [])

  /* ── Actions ────────────────────────────────────────────────── */
  const login = useCallback(async (email, password) => {
    const { token, user } = await authApi.login(email, password)
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    setUser(user)
    return user
  }, [])

  const signup = useCallback(async (name, email, password) => {
    const { token, user } = await authApi.signup(name, email, password)
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    setUser(user)
    return user
  }, [])

  const logout = useCallback(async () => {
    try { await authApi.logout() } catch (_) { /* ignore */ }
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    setUser(null)
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}