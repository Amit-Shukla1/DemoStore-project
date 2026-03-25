import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const result = await response.json();
      setProducts(result.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1>Our Products</h1>
        <p>Discover our amazing collection of products</p>
      </div>

      <div className="products-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>×</button>
          )}
        </div>

        <div className="category-tabs">
          {loading
            ? ['All', 'Electronics', 'Accessories', 'Home', 'Sports'].map((c) => (
                <div key={c} className="category-tab skeleton-tab" />
              ))
            : categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
        </div>
      </div>

      {error ? (
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button className="retry-btn" onClick={fetchProducts}>Try Again</button>
        </div>
      ) : loading ? (
        <div className="products-grid">
          {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">🔍</p>
          <h2>No products found</h2>
          <p>Try a different search or category</p>
          <button className="retry-btn" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="results-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
          <div className="products-grid">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
