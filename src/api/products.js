import client from './client'

const productsApi = {
  /** GET /stores/:storeId/products */
  getProducts: (storeId) =>
    client.get(`/stores/${storeId}/products`).then((r) => r.data),

  /** GET /stores/:storeId/products/:productId */
  getProductById: (storeId, productId) =>
    client.get(`/stores/${storeId}/products/${productId}`).then((r) => r.data),

  /**
   * POST /stores/:storeId/products
   * Sends multipart/form-data when images are included.
   */
  createProduct: (storeId, data) =>
    client.post(`/stores/${storeId}/products`, data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }).then((r) => r.data),

  /**
   * PUT /stores/:storeId/products/:productId
   */
  updateProduct: (storeId, productId, data) =>
    client.put(`/stores/${storeId}/products/${productId}`, data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }).then((r) => r.data),

  /** DELETE /stores/:storeId/products/:productId */
  deleteProduct: (storeId, productId) =>
    client.delete(`/stores/${storeId}/products/${productId}`).then((r) => r.data),
}

export default productsApi