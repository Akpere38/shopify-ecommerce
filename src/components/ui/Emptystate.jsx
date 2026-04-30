import styles from './EmptyState.module.css'

/**
 * EmptyState
 *
 * icon:        React node (lucide icon recommended)
 * title:       heading text
 * description: supporting text
 * action:      CTA button node
 */
export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className={styles.root}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}