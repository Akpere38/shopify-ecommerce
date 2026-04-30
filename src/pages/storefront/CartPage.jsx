import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    totalPrice
  } = useCart();

  return (
    <div>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            <p>${item.price}</p>
            <p>Qty: {item.quantity}</p>

            <button onClick={() => addToCart(item)}>+</button>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}

      <hr />
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
};

export default CartPage;