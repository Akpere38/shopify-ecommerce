import { useStoreContext } from "@/context/StoreContext";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import styles from "./DashboardHomePage.module.css";

export default function DashboardHomePage() {
  const { stores } = useStoreContext();

  const totalStores = stores.length;

  return (
    <div className={styles.page}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Manage your stores and track your business activity
          </p>
        </div>

        <Link to={ROUTES.STORE_NEW} className={styles.primaryBtn}>
          + Create Store
        </Link>
      </div>

      {/* STATS GRID */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Stores</h3>
          <p>{totalStores}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <p>—</p>
        </div>

        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <p>—</p>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className={styles.contentGrid}>
        
        {/* STORES */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Your Stores</h2>
            <Link to={ROUTES.STORE_NEW} className={styles.link}>
              View all
            </Link>
          </div>

          {stores.length === 0 ? (
            <div className={styles.empty}>
              <p>No stores yet</p>
              <Link to={ROUTES.STORE_NEW} className={styles.secondaryBtn}>
                Create your first store
              </Link>
            </div>
          ) : (
            <div className={styles.storeList}>
              {stores.slice(0, 4).map((store) => (
                <Link
                  key={store.id}
                  to={ROUTES.STORE(store.id)}
                  className={styles.storeItem}
                >
                  <div>
                    <h4>{store.name}</h4>
                    <p>{store.description}</p>
                  </div>
                  <span>→</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Quick Actions</h2>
          </div>

          <div className={styles.actions}>
            <Link to={ROUTES.STORE_NEW} className={styles.actionBtn}>
              Create Store
            </Link>

  

            <Link to="#" className={styles.actionBtn}>
              View Analytics
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}