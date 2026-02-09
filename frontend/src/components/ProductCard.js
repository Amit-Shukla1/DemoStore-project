import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const success = await addToCart(product._id, 1);
    setIsAdding(false);

    if (success) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
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
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
          >
            {isAdding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>

        {showMessage && (
          <div className="success-message">Added to cart!</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
