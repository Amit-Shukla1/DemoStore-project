import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './Cart.css';

const Cart = () => {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <div className="cart-page">
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
      </div>

      {isEmpty ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <CartItem key={item.productId._id} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Items ({cart.items.length}):</span>
              <span>${cart.totalAmount.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total:</span>
              <span>${cart.totalAmount.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

            <Link to="/" className="continue-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
