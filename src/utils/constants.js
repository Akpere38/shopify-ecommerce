export const STORAGE_KEYS = {
  AUTH_TOKEN: 'shopflow__token',
  CART_PREFIX: 'shopflow__cart__',
}

export const ROUTES = {
  // Auth
  LOGIN:   '/auth/login',
  SIGNUP:  '/auth/signup',

  // Dashboard
  DASHBOARD:       '/dashboard',
  STORE_NEW:       '/dashboard/stores/new',
  STORE:           (id)  => `/dashboard/stores/${id}`,
  STORE_PRODUCTS:  (id)  => `/dashboard/stores/${id}/products`,
  PRODUCT_NEW:     (id)  => `/dashboard/stores/${id}/products/new`,
  PRODUCT_EDIT:    (storeId, productId) => `/dashboard/stores/${storeId}/products/${productId}/edit`,

  // Storefront
  STOREFRONT:         (slug) => `/store/${slug}`,
  STOREFRONT_PRODUCT: (slug, productId) => `/store/${slug}/products/${productId}`,
  STOREFRONT_CART:    (slug) => `/store/${slug}/cart`,
  STOREFRONT_CHECKOUT:(slug) => `/store/${slug}/checkout`,
  CHECKOUT_SUCCESS:   (slug) => `/store/${slug}/checkout/success`,
}