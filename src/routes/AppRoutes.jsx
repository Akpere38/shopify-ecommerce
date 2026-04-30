import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MerchantLayout from "../layouts/MerchantLayout";
import StorefrontLayout from "../layouts/StorefrontLayout";

// Auth Pages
import Login from "../pages/auth/Login";

// Merchant Pages
import Dashboard from "../pages/merchant/Dashboard";
import CreateStore from "../pages/merchant/CreateStore";
import StoreDetail from "../pages/merchant/StoreDetail";
import AddProduct from "../pages/merchant/CreateProductPage";
import StoreProducts from "../pages/merchant/ProductListPage"

// Storefront Pages
import StorePage from "../pages/storefront/StorePage";
import ProductPage from "../pages/storefront/ProductPage";
import CartPage from "../pages/storefront/CartPage";
import CheckoutPage from "../pages/storefront/CheckoutPage";

const AppRoutes = () => {
  // TEMP AUTH (replace later with real context)
  const isAuthenticated = true;

  return (
    <Routes>

      {/* ================= AUTH ================= */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
        }
      />

      {/* ================= MERCHANT (PROTECTED) ================= */}
      <Route
        path="/"
        element={
          isAuthenticated ? <MerchantLayout /> : <Navigate to="/login" />
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="stores/create" element={<CreateStore />} />
        <Route path="stores/:storeId" element={<StoreDetail />} />
        <Route path="stores/:storeId/products/new" element={<AddProduct />} />
        <Route path="stores/:storeId/products" element={<StoreProducts />} />
      </Route>

{/* ================= STOREFRONT (PUBLIC) ================= */}
<Route path="/store/:storeId" element={<StorefrontLayout />}>
  <Route index element={<StorePage />} />
  <Route path="product/:productId" element={<ProductPage />} />
  <Route path="cart" element={<CartPage />} />
  <Route path="checkout" element={<CheckoutPage />} />
</Route>

      {/* ================= DEFAULT REDIRECT ================= */}
      <Route
        path="*"
        element={<Navigate to="/login" />}
      />

    </Routes>
  );
};

export default AppRoutes;