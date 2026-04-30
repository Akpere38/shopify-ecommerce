import styles from './Badge.module.css'

/**
 * Badge
 *
 * variant: 'default' | 'success' | 'error' | 'warning' | 'info' | 'gold' | 'navy'
 * size:    'sm' | 'md'
 * dot:     show a status dot
 */
export default function Badge({
  children,
  variant = 'default',
  size    = 'md',
  dot     = false,
  className = '',
}) {
  return (
    <span className={[styles.badge, styles[variant], styles[size], className].filter(Boolean).join(' ')}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  )
}