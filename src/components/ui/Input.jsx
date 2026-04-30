import { forwardRef } from 'react'
import styles from './Input.module.css'

/**
 * Input / Textarea
 *
 * type:       any HTML input type, or 'textarea'
 * label:      field label string
 * helper:     helper text below the field
 * error:      error message — replaces helper, turns field red
 * leftIcon:   icon node prepended inside the input
 * rightIcon:  icon node appended inside the input
 * required:   shows asterisk on label
 */
const Input = forwardRef(function Input(
  {
    label,
    helper,
    error,
    type       = 'text',
    leftIcon,
    rightIcon,
    required,
    className  = '',
    id,
    rows       = 4,
    ...props
  },
  ref,
) {
  const fieldId = id || `field-${label?.toLowerCase().replace(/\s+/g, '-')}`
  const hasError = !!error

  const wrapClass = [
    styles.field,
    hasError  ? styles.hasError  : '',
    leftIcon  ? styles.hasLeft   : '',
    rightIcon ? styles.hasRight  : '',
  ].filter(Boolean).join(' ')

  const inputClass = [styles.input, className].filter(Boolean).join(' ')

  return (
    <div className={styles.root}>
      {label && (
        <label htmlFor={fieldId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}

      <div className={wrapClass}>
        {leftIcon  && <span className={`${styles.icon} ${styles.iconLeft}`}>{leftIcon}</span>}

        {type === 'textarea' ? (
          <textarea
            ref={ref}
            id={fieldId}
            className={inputClass}
            rows={rows}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${fieldId}-error` : helper ? `${fieldId}-helper` : undefined}
            required={required}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            id={fieldId}
            type={type}
            className={inputClass}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${fieldId}-error` : helper ? `${fieldId}-helper` : undefined}
            required={required}
            {...props}
          />
        )}

        {rightIcon && <span className={`${styles.icon} ${styles.iconRight}`}>{rightIcon}</span>}
      </div>

      {(error || helper) && (
        <p
          id={hasError ? `${fieldId}-error` : `${fieldId}-helper`}
          className={hasError ? styles.error : styles.helper}
        >
          {error || helper}
        </p>
      )}
    </div>
  )
})

export default Input