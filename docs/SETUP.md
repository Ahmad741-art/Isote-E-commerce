# Isoté E-commerce Platform - Complete Setup Guide

This guide will help you set up the entire Isoté luxury e-commerce platform on your system.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

#### For Linux/Mac:
```bash
# Make the setup script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

#### For Windows (PowerShell):
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Run the setup script
.\setup.ps1
```

### Option 2: Manual Setup

If the automated scripts don't work, follow these steps:

## 📦 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd Backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your actual values
```

Required environment variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `STRIPE_SECRET_KEY`: Your Stripe secret key (get from stripe.com)
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- (See `.env.example` for all variables)

### 4. Start MongoDB
```bash
# Mac (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# MongoDB should start automatically, or use MongoDB Compass
```

### 5. Seed the Database
```bash
npm run seed
```

This will create:
- Sample products (cashmere sweaters, trousers, bags, etc.)
- Admin user (email: admin@isote.com, password: Admin123!)

### 6. Start the Backend Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd ../Frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your values
```

Required environment variables:
- `REACT_APP_API_URL`: Backend API URL (http://localhost:5000)
- `REACT_APP_STRIPE_PUBLIC_KEY`: Your Stripe publishable key

### 4. Start the Frontend Server
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 🔑 Default Credentials

### Admin Account
- **Email**: admin@isote.com
- **Password**: Admin123!

### Test Customer (Create your own)
- Register at `/register`

## 📱 Testing Payment Flow

### Stripe Test Cards
Use these test card numbers in checkout:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

## 🏗️ Project Structure

```
Isote-Ecommerce/
├── Backend/                 # Node.js/Express API
│   ├── config/             # Database & service configs
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth & error handling
│   ├── utils/              # Helper functions
│   ├── seeds/              # Sample data
│   └── server.js           # Main server file
│
├── Frontend/               # React application
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       ├── contexts/      # React contexts
│       ├── hooks/         # Custom hooks
│       ├── services/      # API services
│       └── utils/         # Helper functions
│
└── docs/                  # Documentation
```

## 🔧 Available Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/slug/:slug` - Get product by slug
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/admin/all` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Checkout
- `POST /api/checkout/create-payment-intent` - Create Stripe payment

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users

## 🎨 Design Features

- **Minimalist Aesthetic**: Inspired by luxury brands (The Row, COS, Aesop)
- **Elegant Typography**: Clean, sophisticated font choices
- **Spacious Layout**: Generous white space for focus
- **High-Quality Imagery**: Large, editorial-style product photos
- **Smooth Animations**: Subtle transitions and interactions
- **Mobile Responsive**: Optimized for all devices

## 🛠️ Technologies Used

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Stripe Payment Integration
- Cloudinary (Image uploads)
- Nodemailer (Email notifications)

### Frontend
- React.js (Hooks & Context API)
- React Router (Navigation)
- Axios (API calls)
- Stripe.js (Payment processing)
- CSS3 (Custom styling)

## 📝 Environment Variables Reference

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/isote-ecommerce
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@isote.com
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@isote.com
ADMIN_PASSWORD=Admin123!
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Or use MongoDB Compass GUI
```

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### CORS Errors
Ensure `FRONTEND_URL` in Backend `.env` matches your Frontend URL

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Stripe API Docs](https://stripe.com/docs/api)

## 🤝 Support

For issues or questions:
1. Check this documentation
2. Review error logs in terminal
3. Check MongoDB connection
4. Verify environment variables

## 📄 License

MIT License - Feel free to use this project for learning and commercial purposes.

---

**Built with ❤️ by Ahmad**
