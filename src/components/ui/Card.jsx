import styles from './Card.module.css'

/**
 * Card
 *
 * padding:  'none' | 'sm' | 'md' | 'lg'
 * hoverable: adds lift effect on hover
 * accent:    adds a gold top border accent
 */
export default function Card({
  children,
  padding   = 'md',
  hoverable = false,
  accent    = false,
  className = '',
  ...props
}) {
  const cls = [
    styles.card,
    styles[`pad-${padding}`],
    hoverable ? styles.hoverable : '',
    accent    ? styles.accent    : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={cls} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={`${styles.header} ${className}`}>{children}</div>
}

export function CardBody({ children, className = '' }) {
  return <div className={`${styles.body} ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }) {
  return <div className={`${styles.footer} ${className}`}>{children}</div>
}