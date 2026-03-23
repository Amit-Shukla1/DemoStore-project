import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, removeFromCart, getProductQuantity } =
    useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const quantity = getProductQuantity(product._id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const success = await addToCart(product._id, 1);
    setIsAdding(false);

    if (success) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const handleIncrement = async () => {
    setIsAdding(true);
    await updateQuantity(product._id, quantity + 1);
    setIsAdding(false);
  };

  const handleDecrement = async () => {
    setIsAdding(true);
    if (quantity > 1) {
      await updateQuantity(product._id, quantity - 1);
    } else {
      await removeFromCart(product._id);
    }
    setIsAdding(false);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.stock < 10 && product.stock > 0 && (
          <span className="stock-badge low">Only {product.stock} left</span>
        )}
        {product.stock === 0 && (
          <span className="stock-badge out">Out of Stock</span>
        )}
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-category">{product.category}</p>

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>

          {quantity === 0 ? (
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
            >
              {isAdding
                ? "Adding..."
                : product.stock === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
            </button>
          ) : (
            <div className="quantity-selector">
              <button
                className="qty-btn decrement"
                onClick={handleDecrement}
                disabled={isAdding}
                title="Decrease quantity"
              >
                −
              </button>
              <button className="qty-btn quantity-display" disabled>
                +{quantity}
              </button>
              <button
                className="qty-btn increment"
                onClick={handleIncrement}
                disabled={isAdding || quantity >= product.stock}
                title="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>

        {showMessage && <div className="success-message">Added to cart!</div>}
      </div>
    </div>
  );
};

export default ProductCard;
