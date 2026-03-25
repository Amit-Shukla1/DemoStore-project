import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(item.quantity);
  const product = item.productId;

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > product.stock) {
      showToast(`Only ${product.stock} items available in stock`, "error");
      return;
    }
    setQuantity(newQuantity);
    await updateQuantity(product._id, newQuantity);
  };

  const handleRemove = async () => {
    await removeFromCart(product._id);
    showToast(`${product.name} removed from cart`, "info");
  };

  const subtotal = (product.price * quantity).toFixed(2);

  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} className="cart-item-image" />

      <div className="cart-item-details">
        <h3 className="cart-item-name">{product.name}</h3>
        <p className="cart-item-category">{product.category}</p>
        <p className="cart-item-price">${product.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            className="quantity-input"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              handleQuantityChange(val);
            }}
            min="1"
            max={product.stock}
          />
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>

        <div className="cart-item-subtotal">
          <span className="subtotal-label">Subtotal:</span>
          <span className="subtotal-amount">${subtotal}</span>
        </div>

        <button className="remove-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
