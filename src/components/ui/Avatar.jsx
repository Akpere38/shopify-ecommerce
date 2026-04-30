import { getInitials } from '@/utils/formatters'
import styles from './Avatar.module.css'

/**
 * Avatar
 *
 * src:     image URL (optional — falls back to initials)
 * name:    used for initials + alt text
 * size:    'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * variant: 'navy' | 'gold' | 'subtle'
 */
export default function Avatar({
  src,
  name     = '',
  size     = 'md',
  variant  = 'navy',
  className = '',
}) {
  const initials = getInitials(name)

  return (
    <span className={[styles.avatar, styles[size], styles[variant], className].filter(Boolean).join(' ')}>
      {src ? (
        <img src={src} alt={name || 'Avatar'} className={styles.img} />
      ) : (
        <span className={styles.initials} aria-hidden="true">{initials}</span>
      )}
    </span>
  )
}