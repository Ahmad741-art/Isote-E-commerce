import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import './CartSidebar.css';

const CartSidebar = () => {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateCartItem } = useCart();

  if (!cartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={() => setCartOpen(false)}>
            ×
          </button>
        </div>

        <div className="cart-items">
          {!cart || cart.items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <Link to="/shop" onClick={() => setCartOpen(false)} className="btn btn-outline">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {cart.items.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    <img
                      src={item.product?.images[0]?.url || 'https://via.placeholder.com/100'}
                      alt={item.product?.name}
                    />
                  </div>
                  <div className="item-details">
                    <h4>{item.product?.name}</h4>
                    <p className="item-variant">
                      Size: {item.size}
                      {item.color && ` • ${item.color}`}
                    </p>
                    <p className="item-price">{formatPrice(item.price)}</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateCartItem(item._id, Math.max(1, item.quantity - 1))}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartItem(item._id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item._id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              className="btn"
              onClick={() => setCartOpen(false)}
            >
              Checkout
            </Link>
            <Link
              to="/cart"
              className="btn btn-outline"
              onClick={() => setCartOpen(false)}
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
