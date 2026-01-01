import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import Loader from '../../components/Loader/Loader';
import './Cart.css';

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <h1>Your Cart</h1>
          <p>Your cart is currently empty</p>
          <Link to="/shop" className="btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items-list">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item-card">
                <div className="item-image">
                  <img
                    src={item.product?.images[0]?.url || 'https://via.placeholder.com/200'}
                    alt={item.product?.name}
                  />
                </div>

                <div className="item-info">
                  <div>
                    <h3 className="item-name">{item.product?.name}</h3>
                    <p className="item-variant">
                      {item.size && `Size: ${item.size}`}
                      {item.color && ` • Color: ${item.color}`}
                    </p>
                    <p className="item-price">{formatPrice(item.price)}</p>
                  </div>

                  <div className="item-actions">
                    <div className="quantity-selector">
                      <button
                        onClick={() => updateCartItem(item._id, Math.max(1, item.quantity - 1))}
                        className="quantity-btn"
                      >
                        −
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItem(item._id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>{cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}</span>
            </div>

            <div className="summary-row">
              <span>Tax</span>
              <span>{formatPrice(cart.tax)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{formatPrice(cart.total)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>

            <Link to="/shop" className="continue-shopping">
              Continue Shopping
            </Link>

            <div className="shipping-notice">
              <p>Free shipping on orders over $200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;