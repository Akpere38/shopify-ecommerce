import { useParams } from "react-router-dom";
import { stores, products } from "../../data/mockDatabase";

import { useCart } from "../../context/CartContext";



const ProductPage = () => {
  const { addToCart } = useCart();
  const { productId } = useParams();

  const product = products.find(p => p.id === productId);

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <p>Stock: {product.stock}</p>

      <button onClick={() => addToCart(product)}>
  Add to Cart
</button>
    </div>
  );
};

export default ProductPage;