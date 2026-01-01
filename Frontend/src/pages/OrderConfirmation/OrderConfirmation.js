import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ordersAPI } from '../../services/api';
import { formatPrice, formatDate } from '../../utils/formatPrice';
import Loader from '../../components/Loader/Loader';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await ordersAPI.getById(id);
      setOrder(data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!order) {
    return (
      <div className="order-error">
        <div className="container">
          <h1>Order Not Found</h1>
          <p>We couldn't find this order.</p>
          <Link to="/" className="btn">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="container">
        <div className="confirmation-header">
          <div className="success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="22 4 12 14.01 9 11.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Thank You for Your Order!</h1>
          <p className="confirmation-subtitle">
            Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        <div className="order-details-card">
          <div className="order-info-header">
            <div>
              <p className="label">Order Number</p>
              <p className="value">{order.orderNumber}</p>
            </div>
            <div>
              <p className="label">Order Date</p>
              <p className="value">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="label">Status</p>
              <p className="value status">{order.status}</p>
            </div>
          </div>

          <div className="order-sections">
            {/* Shipping Address */}
            <div className="order-section">
              <h3>Shipping Address</h3>
              <div className="address">
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.address1}</p>
                {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="order-section full-width">
              <h3>Order Items</h3>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item._id} className="order-item">
                    <div className="item-image">
                      <img
                        src={item.image || 'https://via.placeholder.com/100'}
                        alt={item.name}
                      />
                    </div>
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-variant">
                        {item.size && `Size: ${item.size}`}
                        {item.color && ` • Color: ${item.color}`}
                      </p>
                      <p className="item-quantity">Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-section">
              <h3>Order Summary</h3>
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/account" className="btn">
            View All Orders
          </Link>
          <Link to="/shop" className="btn btn-outline">
            Continue Shopping
          </Link>
        </div>

        <div className="confirmation-notice">
          <p>
            You will receive an order confirmation email with details of your order and tracking information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;