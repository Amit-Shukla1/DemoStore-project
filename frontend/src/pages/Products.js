import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const result = await response.json();
      setProducts(result.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="error">
          <h2>Error loading products</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchProducts}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover our amazing collection of products</p>
      </div>

      {products.length === 0 ? (
        <div className="no-products">No products available</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
