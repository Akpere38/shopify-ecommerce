
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store, Globe, FileText, ArrowLeft, Check, X } from 'lucide-react'
import { useStoreContext } from '@/context/StoreContext'
import { Button, Input, PageHeader, Breadcrumb } from '@/components/ui'
import { ROUTES } from '@/utils/constants'
import { slugify } from '@/utils/formatters'
import storesApi from '@/api/stores'
import styles from './CreateStorePage.module.css'

export default function CreateStorePage() {
  const { createStore } = useStoreContext()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', slug: '', description: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [slugStatus, setSlugStatus] = useState(null) // 'checking' | 'available' | 'taken'
  const [slugTimer, setSlugTimer] = useState(null)

  const handleNameChange = (e) => {
    const name = e.target.value
    const autoSlug = slugify(name)
    setForm((prev) => ({ ...prev, name, slug: autoSlug }))
    setErrors((prev) => ({ ...prev, name: '', slug: '' }))
    checkSlug(autoSlug)
  }

  const handleSlugChange = (e) => {
    const slug = slugify(e.target.value)
    setForm((prev) => ({ ...prev, slug }))
    setErrors((prev) => ({ ...prev, slug: '' }))
    checkSlug(slug)
  }

  const checkSlug = (slug) => {
    if (slugTimer) clearTimeout(slugTimer)
    if (!slug) { setSlugStatus(null); return }
    setSlugStatus('checking')
    const t = setTimeout(async () => {
      try {
        const { available } = await storesApi.checkSlugAvailability(slug)
        setSlugStatus(available ? 'available' : 'taken')
      } catch {
        setSlugStatus(null)
      }
    }, 500)
    setSlugTimer(t)
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Store name is required.'
    if (!form.slug.trim()) errs.slug = 'Store URL is required.'
    if (slugStatus === 'taken') errs.slug = 'This URL is already taken.'
    if (slugStatus === 'checking') errs.slug = 'Still checking availability…'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsSubmitting(true)
    try {
      const store = await createStore(form)
      navigate(ROUTES.STORE(store.id))
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const slugIndicator = () => {
    if (slugStatus === 'checking') return <span className={styles.slugChecking}>Checking…</span>
    if (slugStatus === 'available') return <span className={styles.slugAvailable}><Check size={12} /> Available</span>
    if (slugStatus === 'taken') return <span className={styles.slugTaken}><X size={12} /> Taken</span>
    return null
  }

  return (
    <div className="page-enter">
      <PageHeader
        title="Create a new store"
        subtitle="Set up your storefront in under a minute."
        breadcrumb={
          <Breadcrumb items={[
            { label: 'Dashboard', to: ROUTES.DASHBOARD },
            { label: 'New Store' },
          ]} />
        }
        actions={
          <Button variant="ghost" leftIcon={<ArrowLeft size={15} />} onClick={() => navigate(ROUTES.DASHBOARD)}>
            Back
          </Button>
        }
      />

      <div className={styles.layout}>
        {/* ── Form ───────────────────────────────────────────────── */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Store size={18} className={styles.cardIcon} />
              <h2 className={styles.cardTitle}>Store details</h2>
            </div>

            <div className={styles.fields}>
              <Input
                label="Store name"
                placeholder="e.g. Urban Threads"
                value={form.name}
                onChange={handleNameChange}
                error={errors.name}
                required
                leftIcon={<Store size={15} />}
              />

              <div className={styles.slugField}>
                <Input
                  label="Store URL"
                  placeholder="urban-threads"
                  value={form.slug}
                  onChange={handleSlugChange}
                  error={errors.slug}
                  required
                  leftIcon={<Globe size={15} />}
                  helper={!errors.slug ? `shopflow.com/store/${form.slug || 'your-store'}` : undefined}
                />
                {form.slug && (
                  <div className={styles.slugIndicator}>{slugIndicator()}</div>
                )}
              </div>

              <Input
                label="Description"
                type="textarea"
                placeholder="Tell customers what your store is about…"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                error={errors.description}
                leftIcon={<FileText size={15} />}
                rows={4}
              />
            </div>
          </div>

          {errors.submit && (
            <p className={styles.submitError}>{errors.submit}</p>
          )}

          <div className={styles.formActions}>
            <Button variant="secondary" type="button" onClick={() => navigate(ROUTES.DASHBOARD)}>
              Cancel
            </Button>
            <Button
              variant="gold"
              type="submit"
              isLoading={isSubmitting}
              disabled={slugStatus === 'taken' || slugStatus === 'checking'}
            >
              Create Store
            </Button>
          </div>
        </form>

        {/* ── Preview panel ───────────────────────────────────────── */}
        <div className={styles.preview}>
          <div className={styles.previewCard}>
            <p className={styles.previewLabel}>Preview</p>
            <div className={styles.previewStore}>
              <div className={styles.previewIcon}>
                {form.name ? form.name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div>
                <p className={styles.previewName}>{form.name || 'Your Store Name'}</p>
                <p className={styles.previewSlug}>/store/{form.slug || 'your-store'}</p>
              </div>
            </div>
            {form.description && (
              <p className={styles.previewDesc}>{form.description}</p>
            )}
            <div className={styles.previewUrl}>
              <Globe size={12} />
              <span>shopflow.com/store/{form.slug || 'your-store'}</span>
            </div>
          </div>

          <div className={styles.tips}>
            <p className={styles.tipsTitle}>Tips</p>
            <ul className={styles.tipsList}>
              <li>Keep your store name short and memorable</li>
              <li>The URL slug can't be changed after creation</li>
              <li>A good description helps customers find your store</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}