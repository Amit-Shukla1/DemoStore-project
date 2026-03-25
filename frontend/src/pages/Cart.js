import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import CartItem from '../components/CartItem';
import { CartSkeleton } from '../components/Skeleton';
import './Cart.css';

const Cart = () => {
  const { cart, loading, clearCart } = useCart();
  const { showToast } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '' });
  const [formErrors, setFormErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email';
    if (!form.address.trim()) errors.address = 'Address is required';
    if (!form.city.trim()) errors.city = 'City is required';
    if (!form.zip.trim()) errors.zip = 'ZIP code is required';
    return errors;
  };

  const handlePlaceOrder = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setPlacing(false);
    setOrderPlaced(true);
    clearCart();
    showToast('Order placed successfully! 🎉', 'success');
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-header"><h1>Shopping Cart</h1></div>
        <CartSkeleton />
      </div>
    );
  }

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  if (orderPlaced) {
    return (
      <div className="cart-page">
        <div className="order-success">
          <div className="success-icon">🎉</div>
          <h2>Order Placed!</h2>
          <p>Thank you for your purchase. We'll send a confirmation to <strong>{form.email}</strong>.</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header"><h1>Shopping Cart</h1></div>

      {isEmpty ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
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
              <span>Items ({cart.items.reduce((t, i) => t + i.quantity, 0)}):</span>
              <span>${cart.totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free-shipping">Free</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total:</span>
              <span>${cart.totalAmount.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
              Proceed to Checkout
            </button>
            <Link to="/" className="continue-link">Continue Shopping</Link>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowCheckout(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2>Checkout</h2>
              <button className="modal-close" onClick={() => setShowCheckout(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={formErrors.name ? 'input-error' : ''} />
                  {formErrors.name && <span className="field-error">{formErrors.name}</span>}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={formErrors.email ? 'input-error' : ''} />
                  {formErrors.email && <span className="field-error">{formErrors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main Street" className={formErrors.address ? 'input-error' : ''} />
                {formErrors.address && <span className="field-error">{formErrors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="New York" className={formErrors.city ? 'input-error' : ''} />
                  {formErrors.city && <span className="field-error">{formErrors.city}</span>}
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input name="zip" value={form.zip} onChange={handleChange} placeholder="10001" className={formErrors.zip ? 'input-error' : ''} />
                  {formErrors.zip && <span className="field-error">{formErrors.zip}</span>}
                </div>
              </div>

              <div className="modal-order-summary">
                <div className="summary-row"><span>Total:</span><strong>${cart.totalAmount.toFixed(2)}</strong></div>
                <div className="summary-row"><span>Shipping:</span><span className="free-shipping">Free</span></div>
              </div>

              <button className="place-order-btn" onClick={handlePlaceOrder} disabled={placing}>
                {placing ? 'Placing Order...' : `Place Order · $${cart.totalAmount.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
