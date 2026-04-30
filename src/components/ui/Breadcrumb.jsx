import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import styles from './Breadcrumb.module.css'

/**
 * Breadcrumb
 *
 * items: Array<{ label: string, to?: string }>
 * Last item is always the current page (no link, styled differently)
 */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav className={styles.root} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className={styles.item}>
              {!isLast && item.to ? (
                <Link to={item.to} className={styles.link}>{item.label}</Link>
              ) : (
                <span className={isLast ? styles.current : styles.link}>{item.label}</span>
              )}
              {!isLast && (
                <ChevronRight size={13} className={styles.separator} aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}