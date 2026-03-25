import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import Header from "./components/Header";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Auth from "./pages/auth";
import "./styles/global.css";
import "./components/Toast.css";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </ToastProvider>
    </AuthProvider>
  );
}

export default App;
