import client from './client'

const storefrontApi = {
  /** GET /public/stores/:slug */
  getPublicStore: (storeSlug) =>
    client.get(`/public/stores/${storeSlug}`).then((r) => r.data),

  /** GET /public/stores/:slug/products */
  getPublicProducts: (storeSlug, params = {}) =>
    client.get(`/public/stores/${storeSlug}/products`, { params }).then((r) => r.data),

  /** GET /public/stores/:slug/products/:productId */
  getPublicProduct: (storeSlug, productId) =>
    client.get(`/public/stores/${storeSlug}/products/${productId}`).then((r) => r.data),
}

export default storefrontApi