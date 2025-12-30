# Isoté E-Commerce Backend

Luxury fashion e-commerce REST API built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication & Authorization
- 👤 User Management (Registration, Login, Profile)
- 🛍️ Product Management (CRUD operations)
- 🛒 Shopping Cart (Session-based & User-based)
- 💳 Stripe Payment Integration
- 📦 Order Management & Tracking
- 📧 Email Notifications (Order confirmations, shipping updates)
- 🖼️ Image Upload (Cloudinary integration)
- 👨‍💼 Admin Dashboard
- 🔍 Advanced Product Filtering & Search
- ⭐ Product Reviews & Ratings

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcryptjs
- **Payments:** Stripe
- **Email:** Nodemailer
- **Image Upload:** Cloudinary + Multer
- **Security:** Helmet, CORS, Rate Limiting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Stripe Account
- Cloudinary Account
- Gmail Account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your credentials:
   ```env
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:3000
   
   MONGODB_URI=mongodb://localhost:27017/isote-ecommerce
   
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_FROM=Isoté <noreply@isote.com>
   
   ADMIN_EMAIL=admin@isote.com
   ADMIN_PASSWORD=Admin123!
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update profile
- `PUT /api/auth/update-password` - Update password
- `POST /api/auth/address` - Add address
- `PUT /api/auth/address/:id` - Update address
- `DELETE /api/auth/address/:id` - Delete address

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `GET /api/products/slug/:slug` - Get product by slug
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/item/:id` - Update cart item
- `DELETE /api/cart/item/:id` - Remove cart item
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/cancel` - Cancel order

### Checkout
- `POST /api/checkout/create-payment-intent` - Create Stripe payment intent
- `POST /api/checkout/confirm-payment` - Confirm payment

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status
- `GET /api/admin/customers` - Get all customers

## Database Models

### User
- Basic info (name, email, password)
- Addresses (shipping & billing)
- Wishlist
- Role (customer/admin)

### Product
- Name, description, price
- Category, gender, sizes, colors
- Images, material, care instructions
- Stock management
- Featured/bestseller flags

### Cart
- User or session-based
- Cart items with product, size, color
- Automatic totals calculation

### Order
- Order number generation
- User and items
- Shipping & billing addresses
- Payment info (Stripe integration)
- Order status tracking
- Email notifications

### Review
- Product reviews with ratings
- Verified purchase badge
- Admin moderation

## Admin Credentials

After seeding, use these credentials to access admin features:

```
Email: admin@isote.com
Password: Admin123!
```

## Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account > Security
   - Under "Signing in to Google", select App passwords
   - Generate a new app password for "Mail"
3. Use this app password in your `.env` file

## Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Set up webhook endpoint for `/api/webhooks/stripe`
4. Update `.env` with your keys

## Cloudinary Setup

1. Create account at https://cloudinary.com
2. Get your cloud name, API key, and secret from Dashboard
3. Update `.env` with your credentials

## Project Structure

```
Backend/
├── config/          # Database & Stripe configuration
├── models/          # Mongoose schemas
├── controllers/     # Route controllers
├── routes/          # API routes
├── middleware/      # Auth, error handling, etc.
├── utils/           # Helper functions
├── seeds/           # Database seed files
├── server.js        # App entry point
└── package.json     # Dependencies
```

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- HTTP security headers with Helmet
- CORS protection
- Rate limiting
- Input validation
- MongoDB injection prevention

## Development

```bash
# Install nodemon globally (if not installed)
npm install -g nodemon

# Run in development mode
npm run dev
```

## Deployment

1. Set `NODE_ENV=production` in environment
2. Update `CLIENT_URL` to production frontend URL
3. Use production MongoDB database
4. Use production Stripe keys
5. Configure email service for production
6. Deploy to your preferred platform (Heroku, AWS, DigitalOcean, etc.)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
