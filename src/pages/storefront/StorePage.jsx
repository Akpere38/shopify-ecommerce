import { useCart } from "../../context/CartContext";

const StorePage = () => {
    const { addToCart } = useCart();
  return 
  <div>
    StorePage
    <button onClick={() => addToCart(product)}>
  Add to Cart
</button>

  </div>;
};

export default StorePage;