import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './Select.module.css'

/**
 * Select
 *
 * options:  Array<{ value: string, label: string }>
 * label:    field label
 * error:    error message
 * helper:   helper text
 * required: show asterisk
 */
const Select = forwardRef(function Select(
  { options = [], label, error, helper, required, id, className = '', ...props },
  ref,
) {
  const fieldId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className={styles.root}>
      {label && (
        <label htmlFor={fieldId} className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <div className={`${styles.wrap} ${error ? styles.hasError : ''}`}>
        <select
          ref={ref}
          id={fieldId}
          className={`${styles.select} ${className}`}
          aria-invalid={!!error}
          required={required}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={16} className={styles.chevron} aria-hidden="true" />
      </div>
      {(error || helper) && (
        <p className={error ? styles.error : styles.helper}>{error || helper}</p>
      )}
    </div>
  )
})

export default Select