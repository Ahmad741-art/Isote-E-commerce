const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send email
exports.sendEmail = async (options) => {
  const message = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

// Order confirmation email
exports.sendOrderConfirmation = async (order, user) => {
  const itemsList = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        ${item.name} - ${item.size}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        $${item.price.toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #000; }
        .content { padding: 30px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .total { font-weight: bold; font-size: 18px; }
        .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; letter-spacing: 3px;">ISOTÉ</h1>
        </div>
        <div class="content">
          <h2>Order Confirmation</h2>
          <p>Dear ${user.firstName},</p>
          <p>Thank you for your order. We're pleased to confirm your purchase.</p>
          
          <p><strong>Order Number:</strong> ${order.orderNumber}</p>
          
          <h3>Order Details</h3>
          <table>
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 10px; text-align: left;">Item</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>
          
          <table style="border: none;">
            <tr>
              <td style="text-align: right; padding: 5px;"><strong>Subtotal:</strong></td>
              <td style="text-align: right; padding: 5px;">$${order.pricing.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="text-align: right; padding: 5px;"><strong>Shipping:</strong></td>
              <td style="text-align: right; padding: 5px;">$${order.pricing.shipping.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="text-align: right; padding: 5px;"><strong>Tax:</strong></td>
              <td style="text-align: right; padding: 5px;">$${order.pricing.tax.toFixed(2)}</td>
            </tr>
            <tr class="total">
              <td style="text-align: right; padding: 10px; border-top: 2px solid #000;">Total:</td>
              <td style="text-align: right; padding: 10px; border-top: 2px solid #000;">$${order.pricing.total.toFixed(
                2
              )}</td>
            </tr>
          </table>
          
          <h3>Shipping Address</h3>
          <p>
            ${order.shippingAddress.fullName}<br>
            ${order.shippingAddress.addressLine1}<br>
            ${order.shippingAddress.addressLine2 ? order.shippingAddress.addressLine2 + '<br>' : ''}
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}<br>
            ${order.shippingAddress.country}
          </p>
          
          <p>You will receive a shipping confirmation email with tracking information once your order has been dispatched.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Isoté. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await this.sendEmail({
    email: user.email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html,
  });
};

// Shipping confirmation email
exports.sendShippingConfirmation = async (order, user) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #000; }
        .content { padding: 30px 0; }
        .tracking-box { background: #f5f5f5; padding: 20px; margin: 20px 0; text-align: center; }
        .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; letter-spacing: 3px;">ISOTÉ</h1>
        </div>
        <div class="content">
          <h2>Your Order Has Shipped</h2>
          <p>Dear ${user.firstName},</p>
          <p>Good news! Your order <strong>${order.orderNumber}</strong> has been shipped.</p>
          
          ${
            order.shipping.trackingNumber
              ? `
          <div class="tracking-box">
            <h3 style="margin-top: 0;">Tracking Information</h3>
            <p><strong>Carrier:</strong> ${order.shipping.carrier}</p>
            <p><strong>Tracking Number:</strong> ${order.shipping.trackingNumber}</p>
            <p><strong>Estimated Delivery:</strong> ${new Date(order.shipping.estimatedDelivery).toLocaleDateString()}</p>
          </div>
          `
              : ''
          }
          
          <p>Thank you for choosing Isoté.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Isoté. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await this.sendEmail({
    email: user.email,
    subject: `Your Order Has Shipped - ${order.orderNumber}`,
    html,
  });
};
