import { Outlet, Link } from 'react-router-dom'
import { config } from '@/utils/config'
import styles from './AuthLayout.module.css'

export default function AuthLayout() {
  return (
    <div className={styles.root}>
      {/* Background texture */}
      <div className={styles.bg} aria-hidden="true" />

      {/* Brand mark */}
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>S</span>
          <span className={styles.logoText}>{config.appName}</span>
        </Link>
      </header>

      {/* Page content */}
      <main className={styles.main}>
        <div className={styles.card}>
          <Outlet />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} {config.appName}. All rights reserved.</p>
      </footer>
    </div>
  )
}