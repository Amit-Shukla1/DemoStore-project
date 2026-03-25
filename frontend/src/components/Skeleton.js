import "./Skeleton.css";

export const ProductCardSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-image" />
    <div className="skeleton-body">
      <div className="skeleton skeleton-tag" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text short" />
      <div className="skeleton-footer">
        <div className="skeleton skeleton-price" />
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  </div>
);

export const CartSkeleton = () => (
  <div className="cart-skeleton">
    {[1, 2].map((i) => (
      <div key={i} className="skeleton-cart-item">
        <div className="skeleton skeleton-cart-img" />
        <div className="skeleton-cart-details">
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text short" />
          <div className="skeleton skeleton-text shorter" />
        </div>
        <div className="skeleton skeleton-cart-actions" />
      </div>
    ))}
  </div>
);
