import client from './client'

const storesApi = {
  /** GET /stores — merchant's own stores */
  getMyStores: () =>
    client.get('/stores').then((r) => r.data),

  /** GET /stores/:id */
  getStoreById: (storeId) =>
    client.get(`/stores/${storeId}`).then((r) => r.data),

  /** POST /stores */
  createStore: (data) =>
    client.post('/stores', data).then((r) => r.data),

  /** PUT /stores/:id */
  updateStore: (storeId, data) =>
    client.put(`/stores/${storeId}`, data).then((r) => r.data),

  /** DELETE /stores/:id */
  deleteStore: (storeId) =>
    client.delete(`/stores/${storeId}`).then((r) => r.data),

  /** GET /stores/check-slug?slug=xxx */
  checkSlugAvailability: (slug) =>
    client.get('/stores/check-slug', { params: { slug } }).then((r) => r.data),
}

export default storesApi