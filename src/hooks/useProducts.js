import { useState, useEffect, useCallback } from 'react'
import productsApi from '@/api/products'
import toast from 'react-hot-toast'

export function useProducts(storeId) {
  const [products,  setProducts]  = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error,     setError]     = useState(null)

  const fetchProducts = useCallback(async () => {
    if (!storeId) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await productsApi.getProducts(storeId)
      setProducts(data)
    } catch (err) {
      setError('Could not load products.')
      toast.error('Could not load products.')
    } finally {
      setIsLoading(false)
    }
  }, [storeId])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const createProduct = useCallback(async (data) => {
    const created = await productsApi.createProduct(storeId, data)
    setProducts((prev) => [created, ...prev])
    toast.success('Product created!')
    return created
  }, [storeId])

  const updateProduct = useCallback(async (productId, data) => {
    const updated = await productsApi.updateProduct(storeId, productId, data)
    setProducts((prev) => prev.map((p) => p.id === productId ? updated : p))
    toast.success('Product updated!')
    return updated
  }, [storeId])

  const deleteProduct = useCallback(async (productId) => {
    await productsApi.deleteProduct(storeId, productId)
    setProducts((prev) => prev.filter((p) => p.id !== productId))
    toast.success('Product deleted.')
  }, [storeId])

  return { products, isLoading, error, fetchProducts, createProduct, updateProduct, deleteProduct }
}