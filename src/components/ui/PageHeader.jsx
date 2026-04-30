import styles from './PageHeader.module.css'

/**
 * PageHeader
 *
 * title:       page heading
 * subtitle:    supporting text
 * actions:     right-side action nodes (buttons etc.)
 * breadcrumb:  breadcrumb node
 */
export default function PageHeader({ title, subtitle, actions, breadcrumb }) {
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        {breadcrumb && <div className={styles.breadcrumb}>{breadcrumb}</div>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}