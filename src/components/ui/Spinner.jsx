import styles from './Spinner.module.css'

export default function Spinner({ size = 20, color = 'var(--color-brand-accent)' }) {
  return (
    <span
      className={styles.spinner}
      style={{ width: size, height: size, borderTopColor: color }}
      role="status"
      aria-label="Loading"
    />
  )
}