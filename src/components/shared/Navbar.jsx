import { Link, useLocation, useParams } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const location = useLocation();
  const { storeId } = useParams();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isStorefront = location.pathname.includes("/store/");
  const isMerchant = location.pathname.includes("/dashboard") || location.pathname.includes("/stores");

  return (
    <header
      style={{
        padding: "12px 20px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <h3>Dart Store</h3>

        {isMerchant && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/stores/create">Create Store</Link>
          </>
        )}

        {isStorefront && storeId && (
          <>
            <Link to={`/store/${storeId}`}>Home</Link>
            <Link to={`/store/${storeId}/checkout`}>Checkout</Link>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {isStorefront && (
          <Link to={`/store/${storeId}/cart`}>
            🛒 Cart ({cartCount})
          </Link>
        )}

        <Link to="/login">Login</Link>
      </div>
    </header>
  );
};

export default Navbar;