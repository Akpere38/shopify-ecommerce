import axios from 'axios'
import { config } from '@/utils/config'
import { STORAGE_KEYS, ROUTES } from '@/utils/constants'

const client = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

/* ── Request interceptor: attach Bearer token ─────────────────── */
client.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    if (token) req.headers.Authorization = `Bearer ${token}`
    return req
  },
  (error) => Promise.reject(error),
)

/* ── Response interceptor: handle 401 globally ───────────────── */
client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      // Hard redirect — avoids circular dependency with AuthContext
      window.location.href = ROUTES.LOGIN
    }
    return Promise.reject(error)
  },
)

export default client