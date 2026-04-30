import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import Button from './Button'
import styles from './Modal.module.css'

/**
 * Modal
 *
 * isOpen:    boolean
 * onClose:   () => void
 * title:     string
 * size:      'sm' | 'md' | 'lg'
 * children:  modal body
 * footer:    optional footer node
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  size     = 'md',
  children,
  footer,
  hideClose = false,
}) {
  const dialogRef = useRef(null)

  /* Trap focus + ESC to close */
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div
        ref={dialogRef}
        className={`${styles.dialog} ${styles[`size-${size}`]}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || !hideClose) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {!hideClose && (
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}

/**
 * ConfirmModal — pre-built destructive action confirmation
 */
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title       = 'Are you sure?',
  description,
  confirmLabel = 'Delete',
  isLoading   = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      {description && <p className={styles.confirmDesc}>{description}</p>}
      <div className={styles.confirmActions}>
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}