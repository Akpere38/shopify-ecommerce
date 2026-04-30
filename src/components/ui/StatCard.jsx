import styles from './StatCard.module.css'

/**
 * StatCard
 * Displays a single KPI metric on the dashboard.
 *
 * label:   metric name
 * value:   primary display value
 * icon:    lucide icon node
 * trend:   { value: string, positive: boolean } — optional trend indicator
 * accent:  'navy' | 'gold' | 'success' | 'default'
 */
export default function StatCard({ label, value, icon, trend, accent = 'default' }) {
  return (
    <div className={`${styles.card} ${styles[accent]}`}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <div className={styles.value}>{value}</div>
      {trend && (
        <div className={`${styles.trend} ${trend.positive ? styles.trendUp : styles.trendDown}`}>
          <span>{trend.positive ? '↑' : '↓'}</span>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  )
}