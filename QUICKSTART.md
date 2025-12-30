# Isoté E-commerce - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will get your Isoté e-commerce platform running quickly.

### Step 1: Run Setup Script

The setup script has already created your Backend structure with all necessary files.

**Check what was created:**
```bash
cd Isote-Ecommerce
ls -la Backend/
```

You should see:
- ✅ config/
- ✅ models/
- ✅ routes/
- ✅ controllers/
- ✅ middleware/
- ✅ utils/
- ✅ seeds/
- ✅ package.json
- ✅ .env.example
- ✅ .gitignore
- ✅ server.js

### Step 2: Install Backend Dependencies

```bash
cd Backend
npm install
```

This will install:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- stripe
- and all other dependencies

### Step 3: Configure Environment

```bash
cp .env.example .env
```

**Required Configuration:**
Edit `.env` and update these critical values:

```env
# Change this to a secure random string!
JWT_SECRET=your-super-secret-key-min-32-characters-long

# Your MongoDB connection (default works for local MongoDB)
MONGODB_URI=mongodb://localhost:27017/isote-ecommerce

# Get these from stripe.com/docs
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### Step 4: Start MongoDB

**Mac (Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
- MongoDB should auto-start, or use MongoDB Compass

**Verify MongoDB is running:**
```bash
mongosh
# You should see MongoDB shell
# Type 'exit' to quit
```

### Step 5: Seed the Database

```bash
npm run seed
```

This creates:
- ✅ 6 sample luxury products (cashmere sweater, wool trousers, silk blouse, etc.)
- ✅ Admin account (admin@isote.com / Admin123!)

### Step 6: Start the Backend

```bash
npm run dev
```

You should see:
```
╔═══════════════════════════════════════╗
║   Isoté E-commerce API Server         ║
║   Running on port 5000                ║
║   Environment: development            ║
╚═══════════════════════════════════════╝
MongoDB Connected: localhost
```

**Test the API:**
```bash
curl http://localhost:5000/health
# Should return: {"status":"OK","message":"Isoté API is running"}
```

### Step 7: Frontend Setup (Coming Next)

The Frontend structure needs to be created. Here's what to do:

```bash
# Go back to project root
cd ..

# Create Frontend directory if not exists
mkdir -p Frontend

# Frontend setup will be in the next script
```

## ✅ Backend is Ready!

Your backend is now running with:
- 🗄️ MongoDB database connected
- 🔐 JWT authentication ready
- 💳 Stripe configured
- 📦 Sample products loaded
- 👤 Admin account created

## 🧪 Test Your Backend

### 1. Get All Products
```bash
curl http://localhost:5000/api/products
```

### 2. Login as Admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@isote.com","password":"Admin123!"}'
```

You'll get a response with a `token`. Copy this token for the next request.

### 3. Access Protected Route
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📚 API Endpoints Available

### Public Endpoints
- `GET /health` - Health check
- `GET /api/products` - All products
- `GET /api/products/:id` - Single product
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### Protected Endpoints (requires token)
- `GET /api/auth/me` - Current user
- `GET /api/cart` - User cart
- `POST /api/cart` - Add to cart
- `GET /api/orders` - User orders
- `POST /api/orders` - Create order

### Admin Endpoints (requires admin role)
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/admin/stats` - Dashboard stats
- `GET /api/admin/users` - All users

## 🔧 Common Issues & Solutions

### Port 5000 Already in Use
```bash
# Find and kill the process
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Or use a different port in .env
PORT=5001
```

### MongoDB Connection Failed
```bash
# Make sure MongoDB is running
brew services list  # Mac
sudo systemctl status mongod  # Linux

# Check the connection string in .env
MONGODB_URI=mongodb://localhost:27017/isote-ecommerce
```

### Seed Script Errors
```bash
# Make sure MongoDB is running first
# Then run seed again
npm run seed
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Next Steps

1. ✅ Backend is running
2. ⏳ Create Frontend (next guide)
3. ⏳ Connect Frontend to Backend
4. ⏳ Test full shopping flow
5. ⏳ Deploy to production

## 💡 Pro Tips

**Keep terminal window open** with Backend running
- Open a new terminal tab for Frontend
- Use `Ctrl+C` to stop the server

**Check logs** for debugging
- Backend logs appear in the terminal
- Look for error messages in red

**Use Postman** for API testing
- Import API endpoints
- Test authentication flow
- Verify cart and order creation

## 📞 Need Help?

Common questions:
- **How do I create more products?** Use the admin panel or POST to `/api/products` with admin token
- **How do I change admin password?** Edit `.env` ADMIN_PASSWORD and re-run seed
- **Where are images stored?** Configure Cloudinary in `.env` for cloud storage

---

**You're all set! Backend is running. Frontend setup coming next.** 🚀
