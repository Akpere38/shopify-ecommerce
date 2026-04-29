import client from './client'

const authApi = {
  /**
   * POST /auth/login
   * @returns {{ token: string, user: object }}
   */
  login: (email, password) =>
    client.post('/auth/login', { email, password }).then((r) => r.data),

  /**
   * POST /auth/signup
   * @returns {{ token: string, user: object }}
   */
  signup: (name, email, password) =>
    client.post('/auth/signup', { name, email, password }).then((r) => r.data),

  /**
   * GET /auth/verify — validates the stored token
   * @returns {{ user: object }}
   */
  verifyToken: () =>
    client.get('/auth/verify').then((r) => r.data),

  /**
   * POST /auth/logout
   */
  logout: () =>
    client.post('/auth/logout').then((r) => r.data),
}

export default authApi