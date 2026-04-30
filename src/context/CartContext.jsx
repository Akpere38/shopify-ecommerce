import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { STORAGE_KEYS } from '@/utils/constants'

const CartContext = createContext(null)

/* ── helpers ─────────────────────────────────────────────────── */
function storageKey(storeSlug) {
  return `${STORAGE_KEYS.CART_PREFIX}${storeSlug}`
}

function loadCartFromStorage(storeSlug) {
  try {
    const raw = localStorage.getItem(storageKey(storeSlug))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCartToStorage(storeSlug, items) {
  localStorage.setItem(storageKey(storeSlug), JSON.stringify(items))
}

function calcTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function CartProvider({ children }) {
  // carts shape: { [storeSlug]: CartItem[] }
  const [carts, setCarts] = useState({})

  /* ── Initialise a store's cart from localStorage on first access ── */
  const initCart = useCallback((storeSlug) => {
    setCarts((prev) => {
      if (prev[storeSlug]) return prev           // already loaded
      return { ...prev, [storeSlug]: loadCartFromStorage(storeSlug) }
    })
  }, [])

  /* ── Persist whenever a cart changes ────────────────────────── */
  useEffect(() => {
    Object.entries(carts).forEach(([slug, items]) => {
      saveCartToStorage(slug, items)
    })
  }, [carts])

  /* ── Mutators ────────────────────────────────────────────────── */
  const addToCart = useCallback((storeSlug, product, quantity = 1) => {
    setCarts((prev) => {
      const current = prev[storeSlug] ?? []
      const exists  = current.find((i) => i.productId === product.id)

      const updated = exists
        ? current.map((i) =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        : [
            ...current,
            {
              productId: product.id,
              name:      product.name,
              price:     product.price,
              image:     product.images?.[0] ?? null,
              quantity,
            },
          ]

      return { ...prev, [storeSlug]: updated }
    })
  }, [])

  const removeFromCart = useCallback((storeSlug, productId) => {
    setCarts((prev) => ({
      ...prev,
      [storeSlug]: (prev[storeSlug] ?? []).filter((i) => i.productId !== productId),
    }))
  }, [])

  const updateQuantity = useCallback((storeSlug, productId, quantity) => {
    if (quantity < 1) return
    setCarts((prev) => ({
      ...prev,
      [storeSlug]: (prev[storeSlug] ?? []).map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    }))
  }, [])

  const clearCart = useCallback((storeSlug) => {
    setCarts((prev) => ({ ...prev, [storeSlug]: [] }))
    localStorage.removeItem(storageKey(storeSlug))
  }, [])

  /* ── Derived selectors ───────────────────────────────────────── */
  const getCart = useCallback(
    (storeSlug) => {
      const items = carts[storeSlug] ?? []
      return {
        items,
        total:     calcTotal(items),
        itemCount: items.reduce((n, i) => n + i.quantity, 0),
      }
    },
    [carts],
  )

  const value = {
    initCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * useCart(storeSlug)
 * Scoped hook — automatically inits the cart for this store
 * and returns only that store's data + mutators.
 */
export function useCart(storeSlug) {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')

  const { initCart, addToCart, removeFromCart, updateQuantity, clearCart, getCart } = ctx

  // Initialise on first render for this slug
  useEffect(() => {
    if (storeSlug) initCart(storeSlug)
  }, [storeSlug, initCart])

  return {
    ...getCart(storeSlug),
    addToCart:      (product, qty)     => addToCart(storeSlug, product, qty),
    removeFromCart: (productId)        => removeFromCart(storeSlug, productId),
    updateQuantity: (productId, qty)   => updateQuantity(storeSlug, productId, qty),
    clearCart:      ()                 => clearCart(storeSlug),
  }
}