export const ROUTES = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',

  // Dashboard / Merchant
  DASHBOARD: '/dashboard',

  STORE_NEW: '/stores/create',

  STORE: (id) => `/stores/${id}`,

  STORE_PRODUCTS: (id) => `/stores/${id}/products`,

  PRODUCT_NEW: (id) => `/stores/${id}/products/new`,

  PRODUCT_EDIT: (storeId, productId) =>
    `/stores/${storeId}/products/${productId}/edit`,

  // Storefront
  STOREFRONT: (slug) => `/store/${slug}`,

  STOREFRONT_PRODUCT: (slug, productId) =>
    `/store/${slug}/product/${productId}`,

  STOREFRONT_CART: (slug) => `/store/${slug}/cart`,

  STOREFRONT_CHECKOUT: (slug) => `/store/${slug}/checkout`,

  CHECKOUT_SUCCESS: (slug) => `/store/${slug}/checkout/success`,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'dart_digital_store__token',
  CART_PREFIX: 'dart_digital_store__cart__',
};