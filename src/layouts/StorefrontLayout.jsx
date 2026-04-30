import { useEffect } from 'react'
import { Outlet, Link, useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { ROUTES } from '@/utils/constants'
import storefrontApi from '@/api/storefront'
import { useState } from 'react'
import Spinner from '@/components/ui/Spinner'
import styles from './StorefrontLayout.module.css'

export default function StorefrontLayout() {
  const { storeSlug }                   = useParams()
  const { itemCount }                   = useCart(storeSlug)
  const [store,     setStore]           = useState(null)
  const [isLoading, setIsLoading]       = useState(true)
  const [notFound,  setNotFound]        = useState(false)

  /* Fetch the public store metadata for the header */
  useEffect(() => {
    if (!storeSlug) return
    setIsLoading(true)
    storefrontApi.getPublicStore(storeSlug)
      .then(setStore)
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false))
  }, [storeSlug])

  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <Spinner size={32} />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className={styles.notFound}>
        <h1>Store not found</h1>
        <p>This store doesn't exist or may have been removed.</p>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Go home
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      {/* ── Store header ──────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to={ROUTES.STOREFRONT(storeSlug)} className={styles.storeName}>
            {store?.logo && (
              <img src={store.logo} alt={store.name} className={styles.storeLogo} />
            )}
            <span>{store?.name}</span>
          </Link>

          <nav className={styles.headerNav}>
            <Link
              to={ROUTES.STOREFRONT_CART(storeSlug)}
              className={styles.cartBtn}
              aria-label={`Cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className={styles.cartBadge}>
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Page content ──────────────────────────────────────── */}
      <main className={styles.main}>
        <div className="page-enter">
          <Outlet context={{ store, storeSlug }} />
        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerStore}>{store?.name}</p>
          <p className={styles.footerPowered}>
            Powered by <strong>Dart Digital Store Front</strong>
          </p>
        </div>
      </footer>
    </div>
  )
}