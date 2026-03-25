import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./Header.css";

const Header = () => {
  const { getCartCount, clearCart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const cartCount = getCartCount();

  const handleLogout = () => {
    clearCart();
    logout();
    showToast("Logged out successfully", "info");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          DemoStore
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link products-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <span className="cart-icon">🛒</span>
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-icon">👤</span>
                <div className="user-details">
                  <p className="user-name">{user?.name}</p>
                  <p className="user-email">{user?.email}</p>
                </div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="nav-link auth-link">
              👤 Account
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
