import { forwardRef } from 'react'
import Spinner from './Spinner'
import styles from './Button.module.css'

/**
 * Button
 *
 * variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
 * size:    'sm' | 'md' | 'lg'
 */
const Button = forwardRef(function Button(
  {
    children,
    variant  = 'primary',
    size     = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = '',
    disabled,
    ...props
  },
  ref,
) {
  const classes = [
    styles.btn,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    fullWidth  ? styles.fullWidth  : '',
    isLoading  ? styles.loading    : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className={styles.spinnerWrap}>
          <Spinner
            size={size === 'sm' ? 12 : size === 'lg' ? 18 : 15}
            color="currentColor"
          />
        </span>
      )}
      {!isLoading && leftIcon && (
        <span className={styles.icon}>{leftIcon}</span>
      )}
      <span className={styles.label}>{children}</span>
      {!isLoading && rightIcon && (
        <span className={styles.icon}>{rightIcon}</span>
      )}
    </button>
  )
})

export default Button