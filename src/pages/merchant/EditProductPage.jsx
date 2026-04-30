
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Plus, Search, Package, Pencil, Trash2, AlertTriangle } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { Button, PageHeader, Badge, EmptyState, ConfirmModal, Spinner, Breadcrumb, Input } from '@/components/ui'
import { ROUTES } from '@/utils/constants'
import { formatCurrency } from '@/utils/formatters'
import styles from './ProductListPage.module.css'

export default function ProductListPage() {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const { products, isLoading, deleteProduct } = useProducts(storeId)

  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteProduct(deleteTarget.id)
      setDeleteTarget(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="page-enter">
      <PageHeader
        breadcrumb={<Breadcrumb items={[
          { label: 'Dashboard', to: ROUTES.DASHBOARD },
          { label: 'Store', to: ROUTES.STORE(storeId) },
          { label: 'Products' },
        ]} />}
        title="Products"
        subtitle={`${products.length} product${products.length !== 1 ? 's' : ''} in this store`}
        actions={
          <Button variant="gold" leftIcon={<Plus size={15} />} onClick={() => navigate(ROUTES.PRODUCT_NEW(storeId))}>
            Add Product
          </Button>
        }
      />

      {isLoading ? (
        <div className={styles.loading}><Spinner size={28} /></div>
      ) : products.length === 0 ? (
        <EmptyState
          icon={<Package size={28} />}
          title="No products yet"
          description="Add your first product to start selling."
          action={
            <Button variant="gold" leftIcon={<Plus size={15} />} onClick={() => navigate(ROUTES.PRODUCT_NEW(storeId))}>
              Add first product
            </Button>
          }
        />
      ) : (
        <>
          {/* Search */}
          <div className={styles.toolbar}>
            <div className={styles.searchWrap}>
              <Input
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search size={15} />}
              />
            </div>
            <div className={styles.toolbarRight}>
              <span className={styles.count}>{filtered.length} of {products.length}</span>
            </div>
          </div>

          {/* Table */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className={styles.noResults}>No products match your search.</td></tr>
                ) : filtered.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onEdit={() => navigate(ROUTES.PRODUCT_EDIT(storeId, product.id))}
                    onDelete={() => setDeleteTarget(product)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete product?"
        description={`"${deleteTarget?.name}" will be permanently deleted.`}
        confirmLabel="Delete product"
      />
    </div>
  )
}

function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr className={styles.row}>
      <td>
        <div className={styles.productCell}>
          <div className={styles.productThumb}>
            {product.images?.[0]
              ? <img src={product.images[0]} alt={product.name} />
              : <Package size={16} className={styles.noImg} />
            }
          </div>
          <div>
            <span className={styles.productName}>{product.name}</span>
            <span className={styles.productId}>#{product.id}</span>
          </div>
        </div>
      </td>
      <td><span className={styles.category}>{product.category || '—'}</span></td>
      <td><span className={styles.price}>{formatCurrency(product.price)}</span></td>
      <td>
        <span className={`${styles.stock} ${product.stock === 0 ? styles.stockEmpty : product.stock < 10 ? styles.stockLow : ''}`}>
          {product.stock === 0 && <AlertTriangle size={12} />}
          {product.stock}
        </span>
      </td>
      <td>
        <Badge
          variant={product.status === 'active' ? 'success' : 'warning'}
          dot size="sm"
        >
          {product.status === 'active' ? 'Active' : 'Out of stock'}
        </Badge>
      </td>
      <td>
        <div className={styles.rowActions}>
          <button className={styles.actionBtn} onClick={onEdit} title="Edit"><Pencil size={14} /></button>
          <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={onDelete} title="Delete"><Trash2 size={14} /></button>
        </div>
      </td>
    </tr>
  )
}