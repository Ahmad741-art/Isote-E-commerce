# Isoté - Luxury E-Commerce Platform

A full-stack luxury fashion e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js), featuring Stripe payments, real-time cart management, and a stunning minimalist design inspired by high-end fashion brands.

![Isoté](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop)

## ✨ Features

### Customer Features
- 🛍️ **Browse Products** - Explore curated luxury collections with advanced filtering
- 🔍 **Search & Filter** - Find products by category, price, gender, and more
- 🛒 **Shopping Cart** - Session-based cart with real-time updates
- 💳 **Secure Checkout** - Stripe payment integration with multiple payment methods
- 👤 **User Accounts** - Registration, login, profile management
- 📦 **Order Tracking** - View order history and track shipments
- ⭐ **Product Reviews** - Rate and review purchases
- 📧 **Email Notifications** - Order confirmations and shipping updates

### Admin Features
- 📊 **Dashboard** - Real-time analytics and sales metrics
- 📦 **Order Management** - Process and update order status
- 🏷️ **Product Management** - Full CRUD operations for products
- 👥 **Customer Management** - View and manage customer accounts
- 📸 **Image Upload** - Cloudinary integration for product images

### Technical Features
- ⚡ **Fast & Responsive** - Optimized performance and mobile-first design
- 🔐 **Secure Authentication** - JWT tokens with HTTP-only cookies
- 🎨 **Luxury Design** - Minimalist aesthetic inspired by The Row, Aesop, COS
- 📱 **Progressive Web App** - Works seamlessly across all devices
- 🔄 **Real-time Updates** - Live cart and order status updates
- 🌐 **RESTful API** - Well-documented API endpoints

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **React Router** 6.20.1 - Navigation
- **Axios** - HTTP client
- **Stripe React** - Payment processing
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Stripe** - Payment gateway
- **Cloudinary** - Image hosting
- **Nodemailer** - Email service

### Design Philosophy
- **Typography**: Cormorant Garamond (display) + Inter (body)
- **Color Palette**: Black, White, Cream, Stone - minimal and elegant
- **Layout**: Generous whitespace, editorial-first design
- **Inspiration**: The Row, Aesop, COS, A.P.C.

## 📁 Project Structure

```
Isote-Ecommerce/
├── Backend/                 # Node.js/Express API
│   ├── config/             # Database & service configs
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth, error handling
│   ├── utils/              # Helper functions
│   ├── seeds/              # Sample data
│   └── server.js           # Entry point
│
├── Frontend/                # React application
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── contexts/       # React contexts
│       ├── hooks/          # Custom hooks
│       ├── services/       # API services
│       ├── utils/          # Utilities
│       └── App.js          # Main component
│
└── docs/                   # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ 
- MongoDB v5+
- Stripe Account
- Cloudinary Account (optional for image upload)
- Gmail Account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/isote-ecommerce.git
   cd Isote-Ecommerce
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run seed
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   cp .env.example .env
   # Edit .env with your API URL
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Default Admin Credentials
```
Email: admin@isote.com
Password: Admin123!
```

## 📖 Documentation

- [Backend Documentation](./Backend/README.md)
- [API Documentation](./docs/API.md)
- [Frontend Documentation](./Frontend/README.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🎨 Design Guidelines

### Color Palette
```css
--color-black: #000000      /* Primary text, buttons */
--color-white: #FFFFFF      /* Backgrounds, text on dark */
--color-cream: #FAF9F6      /* Main background */
--color-stone: #E8E6E1      /* Secondary background */
--color-charcoal: #333333   /* Secondary text */
--color-grey: #999999       /* Tertiary text */
```

### Typography
```css
--font-display: 'Cormorant Garamond', serif  /* Headings, logo */
--font-body: 'Inter', sans-serif             /* Body text, UI */
```

## 🔑 Key Features Implementation

### Stripe Integration
```javascript
// Create payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: total * 100,
  currency: 'usd',
});
```

### JWT Authentication
```javascript
// Protect routes
router.get('/orders', protect, getOrders);

// Generate token
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
```

### Image Upload (Cloudinary)
```javascript
const result = await cloudinary.uploader.upload(file);
product.images.push({ url: result.secure_url });
```

## 📱 Screenshots

### Homepage
Clean, minimalist hero section with featured products

### Product Page
Large imagery with detailed product information

### Checkout
Streamlined multi-step checkout with Stripe

### Admin Dashboard
Comprehensive analytics and management tools

## 🧪 Testing

```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd Frontend
npm test
```

## 🚢 Deployment

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy from main branch
3. Run database migrations

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👨‍💻 Author

**Ahmad**
- GitHub: [@Ahmad741-art](https://github.com/Ahmad741-art)

## 🙏 Acknowledgments

- Design inspiration: The Row, Aesop, COS, A.P.C.
- Icons: Feather Icons
- Images: Unsplash

## 📞 Support

For support, email support@isote.com or open an issue on GitHub.

---

Made with ❤️ by Ahmad
