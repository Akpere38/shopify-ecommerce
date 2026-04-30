
import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Package, ExternalLink, Plus, ArrowRight, Settings, TrendingUp, ShoppingBag } from 'lucide-react'
import { useStoreContext } from '@/context/StoreContext'
import { useProducts } from '@/hooks/useProducts'
import { Button, PageHeader, StatCard, Badge, Breadcrumb, Spinner } from '@/components/ui'
import { ROUTES } from '@/utils/constants'
import { formatCurrency } from '@/utils/formatters'
import styles from './StoreOverviewPage.module.css'

export default function StoreOverviewPage() {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const { activeStore, loadActiveStore, isLoading: storeLoading } = useStoreContext()
  const { products, isLoading: productsLoading } = useProducts(storeId)

  useEffect(() => { loadActiveStore(storeId) }, [storeId, loadActiveStore])

  const activeProducts = products.filter((p) => p.status === 'active')
  const outOfStock = products.filter((p) => p.status === 'out_of_stock')
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

  if (storeLoading) {
    return <div className={styles.loading}><Spinner size={32} /></div>
  }

  if (!activeStore) return null

  return (
    <div className="page-enter">
      <PageHeader
        breadcrumb={<Breadcrumb items={[{ label: 'Dashboard', to: ROUTES.DASHBOARD }, { label: activeStore.name }]} />}
        title={activeStore.name}
        subtitle={activeStore.description || 'No description added yet.'}
        actions={
          <div className={styles.headerActions}>
            <a href={ROUTES.STOREFRONT(activeStore.slug)} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" leftIcon={<ExternalLink size={15} />} size="sm">
                View Storefront
              </Button>
            </a>
            <Button variant="gold" leftIcon={<Plus size={15} />} onClick={() => navigate(ROUTES.PRODUCT_NEW(storeId))}>
              Add Product
            </Button>
          </div>
        }
      />

      {/* ── Stats ───────────────────────────────────────────────── */}
      <div className={styles.statsGrid}>
        <StatCard label="Total Products" value={products.length} accent="navy" icon={<Package size={16} />} />
        <StatCard label="Active" value={activeProducts.length} accent="success" icon={<TrendingUp size={16} />} />
        <StatCard label="Out of Stock" value={outOfStock.length} accent={outOfStock.length > 0 ? 'gold' : 'default'} icon={<ShoppingBag size={16} />} />
        <StatCard label="Inventory Value" value={formatCurrency(totalValue)} accent="gold" icon={<TrendingUp size={16} />} />
      </div>

      {/* ── Quick actions ────────────────────────────────────────── */}
      <div className={styles.quickActions}>
        <QuickActionCard
          icon={<Package size={20} />}
          title="Manage Products"
          description={`${products.length} product${products.length !== 1 ? 's' : ''} in this store`}
          action="Go to Products"
          onClick={() => navigate(ROUTES.STORE_PRODUCTS(storeId))}
          accent="navy"
        />
        <QuickActionCard
          icon={<Plus size={20} />}
          title="Add New Product"
          description="Upload images, set price and stock"
          action="Create Product"
          onClick={() => navigate(ROUTES.PRODUCT_NEW(storeId))}
          accent="gold"
        />
        <QuickActionCard
          icon={<ExternalLink size={20} />}
          title="Public Storefront"
          description={`dart_digital_store_front.com/store/${activeStore.slug}`}
          action="Open in new tab"
          href={ROUTES.STOREFRONT(activeStore.slug)}
          accent="success"
        />
      </div>

      {/* ── Recent products preview ──────────────────────────────── */}
      {products.length > 0 && (
        <div className={styles.recentSection}>
          <div className={styles.recentHeader}>
            <h2 className={styles.recentTitle}>Recent Products</h2>
            <Link to={ROUTES.STORE_PRODUCTS(storeId)} className={styles.viewAllLink}>
              View all <ArrowRight size={13} />
            </Link>
          </div>

          {productsLoading ? (
            <div className={styles.loadingRow}><Spinner size={20} /></div>
          ) : (
            <div className={styles.productList}>
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className={styles.productRow}>
                  <div className={styles.productImg}>
                    {product.images?.[0]
                      ? <img src={product.images[0]} alt={product.name} />
                      : <Package size={18} className={styles.noImg} />
                    }
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productCategory}>{product.category}</span>
                  </div>
                  <div className={styles.productStock}>
                    <span>{product.stock} in stock</span>
                  </div>
                  <div className={styles.productPrice}>
                    {formatCurrency(product.price)}
                  </div>
                  <Badge variant={product.status === 'active' ? 'success' : 'warning'} dot size="sm">
                    {product.status === 'active' ? 'Active' : 'Out of stock'}
                  </Badge>
                  <Button
                    size="sm" variant="ghost"
                    onClick={() => navigate(ROUTES.PRODUCT_EDIT(storeId, product.id))}
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function QuickActionCard({ icon, title, description, action, onClick, href, accent }) {
  const content = (
    <div className={`${styles.qaCard} ${styles[`qa-${accent}`]}`}>
      <div className={styles.qaIcon}>{icon}</div>
      <div className={styles.qaBody}>
        <p className={styles.qaTitle}>{title}</p>
        <p className={styles.qaDesc}>{description}</p>
      </div>
      <div className={styles.qaAction}>
        <span>{action}</span>
        <ArrowRight size={14} />
      </div>
    </div>
  )
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={styles.qaLink}>{content}</a>
  return <button className={styles.qaLink} onClick={onClick}>{content}</button>
}