import { createContext, useContext, useState, useCallback } from 'react'
import storesApi from '@/api/stores'
import toast from 'react-hot-toast'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [stores,      setStores]      = useState([])
  const [activeStore, setActiveStore] = useState(null)
  const [isLoading,   setIsLoading]   = useState(false)

  /* ── Fetch all stores owned by the current user ────────────── */
  const fetchStores = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await storesApi.getMyStores()
      setStores(data)
      return data
    } catch (err) {
      toast.error('Could not load your stores.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  /* ── Load a single store as the active one ─────────────────── */
  const loadActiveStore = useCallback(async (storeId) => {
    // Try from cache first
    const cached = stores.find((s) => s.id === storeId)
    if (cached) { setActiveStore(cached); return cached }

    setIsLoading(true)
    try {
      const data = await storesApi.getStoreById(storeId)
      setActiveStore(data)
      return data
    } catch (err) {
      toast.error('Store not found.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [stores])

  /* ── CRUD ───────────────────────────────────────────────────── */
  const createStore = useCallback(async (formData) => {
    const newStore = await storesApi.createStore(formData)
    setStores((prev) => [...prev, newStore])
    toast.success('Store created!')
    return newStore
  }, [])

  const updateStore = useCallback(async (storeId, formData) => {
    const updated = await storesApi.updateStore(storeId, formData)
    setStores((prev) => prev.map((s) => (s.id === storeId ? updated : s)))
    if (activeStore?.id === storeId) setActiveStore(updated)
    toast.success('Store updated!')
    return updated
  }, [activeStore])

  const deleteStore = useCallback(async (storeId) => {
    await storesApi.deleteStore(storeId)
    setStores((prev) => prev.filter((s) => s.id !== storeId))
    if (activeStore?.id === storeId) setActiveStore(null)
    toast.success('Store deleted.')
  }, [activeStore])

  const value = {
    stores,
    activeStore,
    isLoading,
    fetchStores,
    loadActiveStore,
    createStore,
    updateStore,
    deleteStore,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStoreContext() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStoreContext must be used inside <StoreProvider>')
  return ctx
}