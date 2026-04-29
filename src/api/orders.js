import client from './client'

const ordersApi = {
  /**
   * POST /public/stores/:slug/orders
   * Payload: { customerDetails, shippingAddress, items }
   * Returns: { orderId, paymentUrl } or gateway embed data
   */
  placeOrder: (storeSlug, orderData) =>
    client.post(`/public/stores/${storeSlug}/orders`, orderData).then((r) => r.data),
}

export default ordersApi