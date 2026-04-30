import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useParams, Link } from 'react-router-dom'
import {
  LayoutDashboard, Store, Package, Plus,
  LogOut, ChevronRight, Menu, X, ExternalLink,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useStoreContext } from '@/context/StoreContext'
import { ROUTES } from '@/utils/constants'
import { getInitials } from '@/utils/formatters'
import { config } from '@/utils/config'
import Spinner from '@/components/ui/Spinner'
import styles from './DashboardLayout.module.css'

import logoImg from '@/assets/Dart Digital_Icon.png'

export default function DashboardLayout() {
  const { user, logout }                           = useAuth()
  const { stores, activeStore, fetchStores, isLoading } = useStoreContext()
  const navigate                                   = useNavigate()
  const { storeId }                                = useParams()
  const [sidebarOpen, setSidebarOpen]              = useState(false)

  /* Fetch stores on mount */
  useEffect(() => { fetchStores() }, [fetchStores])

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.LOGIN)
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className={styles.root}>
      {/* ── Mobile overlay ────────────────────────────────────── */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar} aria-hidden="true" />
      )}

      {/* ── Sidebar ───────────────────────────────────────────── */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        {/* Logo */}
        <div className={styles.sidebarHeader}>
         <Link to={ROUTES.DASHBOARD} className={styles.logo} onClick={closeSidebar}>    
            {/* NEW IMAGE TAG */}
            <img 
              src={logoImg} 
              alt={`${config.appName} Logo`} 
              className={styles.logoImage} // We will add styling for this
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            />

            <span className={styles.logoText}>{config.appName}</span>
          </Link>
          <button className={styles.closeSidebar} onClick={closeSidebar} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        {/* Main nav */}
        <nav className={styles.nav}>
          <span className={styles.navLabel}>Overview</span>
          <NavLink
            to={ROUTES.DASHBOARD}
            end
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            onClick={closeSidebar}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </NavLink>

          {/* Stores section */}
          <span className={styles.navLabel} style={{ marginTop: 'var(--space-6)' }}>
            Your Stores
            {isLoading && <Spinner size={12} color="var(--color-sidebar-muted)" />}
          </span>

          {stores.map((store) => (
            <NavLink
              key={store.id}
              to={ROUTES.STORE(store.id)}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              onClick={closeSidebar}
            >
              <Store size={16} />
              <span className={styles.navItemText}>{store.name}</span>
              <ChevronRight size={12} className={styles.navChevron} />
            </NavLink>
          ))}

          {/* Products sub-nav when inside a store */}
          {storeId && (
            <NavLink
              to={ROUTES.STORE_PRODUCTS(storeId)}
              className={({ isActive }) => `${styles.navItem} ${styles.navItemIndented} ${isActive ? styles.navItemActive : ''}`}
              onClick={closeSidebar}
            >
              <Package size={16} />
              Products
            </NavLink>
          )}

          <Link
            to={ROUTES.STORE_NEW}
            className={`${styles.navItem} ${styles.navItemNew}`}
            onClick={closeSidebar}
          >
            <Plus size={16} />
            New Store
          </Link>

          {/* View live storefront */}
          {activeStore && (
            <a
              href={ROUTES.STOREFRONT(activeStore.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.navItem} ${styles.navItemExternal}`}
            >
              <ExternalLink size={16} />
              View Storefront
            </a>
          )}
        </nav>

        {/* User footer */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userAvatar}>{getInitials(user?.name)}</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name}</span>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>
          <button
            className={styles.logoutBtn}
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* ── Main area ─────────────────────────────────────────── */}
      <div className={styles.main}>
        {/* Top bar (mobile) */}
        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <Link to={ROUTES.DASHBOARD} className={styles.topbarLogo}>
            {config.appName}
          </Link>
          <div className={styles.topbarAvatar}>{getInitials(user?.name)}</div>
        </header>

        {/* Page content */}
        <main className={styles.content}>
          <div className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}