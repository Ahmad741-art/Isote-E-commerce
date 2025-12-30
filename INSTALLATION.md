# 🎉 Isoté E-commerce - Installation Instructions

## What You Have Downloaded

You have the **complete Isoté luxury e-commerce platform** with:
- ✅ **Fully functional Backend** (100% complete)
- ✅ **Frontend structure** (ready for development)
- ✅ **Setup scripts** (automated installation)
- ✅ **Complete documentation**

## 📥 Quick Installation (5 Steps)

### Step 1: Extract the Files

Extract the `Isote-Ecommerce` folder to your desired location:
- Windows: Right-click → Extract All
- Mac: Double-click the zip file
- Linux: `unzip Isote-Ecommerce.zip`

### Step 2: Install Prerequisites

**You need:**
- Node.js (v18+): https://nodejs.org/
- MongoDB (v6+): https://www.mongodb.com/try/download/community
- Git (optional): https://git-scm.com/

**Verify installation:**
```bash
node --version    # Should show v18 or higher
npm --version     # Should show v9 or higher
mongod --version  # Should show v6 or higher
```

### Step 3: Run Setup Script

#### Windows (PowerShell):
```powershell
cd path\to\Isote-Ecommerce
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\setup.ps1
```

#### Mac/Linux (Terminal):
```bash
cd path/to/Isote-Ecommerce
chmod +x setup.sh
./setup.sh
```

### Step 4: Configure Environment

```bash
cd Backend
cp .env.example .env
```

**Edit `.env` file with your actual values:**

**REQUIRED (Minimum to run):**
```env
JWT_SECRET=change-this-to-a-very-long-random-string-minimum-32-characters
MONGODB_URI=mongodb://localhost:27017/isote-ecommerce
```

**OPTIONAL (For full features):**
```env
STRIPE_SECRET_KEY=sk_test_your_key_from_stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_from_stripe
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

### Step 5: Start Everything

**Terminal 1 - Start MongoDB:**
```bash
# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows - MongoDB should auto-start
```

**Terminal 2 - Start Backend:**
```bash
cd Backend
npm install
npm run seed      # Creates sample products & admin user
npm run dev       # Starts server on port 5000
```

**Terminal 3 - Start Frontend (when ready):**
```bash
cd Frontend
npm install
npm start         # Starts on port 3000
```

## 🎯 What Works Right Now

### ✅ Backend API (Fully Functional)

**Try these commands:**

1. **Health Check:**
```bash
curl http://localhost:5000/health
```

2. **Get All Products:**
```bash
curl http://localhost:5000/api/products
```

3. **Login as Admin:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@isote.com","password":"Admin123!"}'
```

### 🎨 Access Points

- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/health
- **Frontend** (when built): http://localhost:3000

### 🔑 Default Credentials

**Admin Account:**
- Email: admin@isote.com
- Password: Admin123!

**Stripe Test Cards:**
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002

## 📂 Project Structure

```
Isote-Ecommerce/
│
├── 📁 Backend/              ✅ COMPLETE
│   ├── config/             Database & Stripe setup
│   ├── models/             User, Product, Cart, Order models
│   ├── routes/             API endpoints
│   ├── controllers/        Business logic
│   ├── middleware/         Auth & validation
│   ├── utils/              Helper functions
│   ├── seeds/              Sample data
│   └── server.js           Main server file
│
├── 📁 Frontend/            🏗️ STRUCTURE READY
│   ├── public/            Static files
│   └── src/               React components (to be built)
│
├── 📁 docs/               Documentation
│   └── SETUP.md           Detailed setup guide
│
├── 📄 README.md           Project overview
├── 📄 QUICKSTART.md       5-minute guide
├── 📄 PROJECT_INFO.md     Complete project info
├── 🔧 setup.sh            Linux/Mac setup script
└── 🔧 setup.ps1           Windows setup script
```

## 🔍 Testing Your Installation

### Test Backend API with Postman

1. **Download Postman**: https://www.postman.com/downloads/

2. **Import these requests:**

**Register User:**
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Login:**
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Get Products:**
```
GET http://localhost:5000/api/products
```

**Add to Cart (requires token):**
```
POST http://localhost:5000/api/cart
Headers:
Authorization: Bearer YOUR_TOKEN_HERE
Body (JSON):
{
  "productId": "PRODUCT_ID_FROM_GET_PRODUCTS",
  "quantity": 1,
  "size": "M",
  "color": "Black"
}
```

## 📚 Documentation Files

**Read these for more details:**

1. **QUICKSTART.md** - Get running in 5 minutes
2. **PROJECT_INFO.md** - Complete project details
3. **README.md** - Project overview
4. **docs/SETUP.md** - Detailed setup instructions

## 🎨 Next Steps

### Backend is Ready! ✅

The Backend is fully functional with:
- User authentication
- Product management
- Shopping cart
- Order processing
- Stripe payments
- Admin features

### Frontend Development 🏗️

The Frontend structure is ready. You can now:

1. **Option A: Build Your Own Frontend**
   - Structure is ready in `Frontend/`
   - Use React, Vue, or any framework
   - Connect to the Backend API

2. **Option B: Use API Only**
   - Backend works standalone
   - Build mobile app
   - Integrate with existing site

3. **Option C: Request Frontend Components**
   - Ask for specific pages
   - Get pre-built components
   - Customize as needed

## 🚀 Production Deployment

When ready for production:

### Backend Deployment
- **Heroku**: Easy, free tier
- **Railway**: Modern, auto-deploy
- **Render**: Free tier available
- **AWS/DigitalOcean**: Full control

### Database
- **MongoDB Atlas**: Free tier, cloud-hosted

### File Storage
- **Cloudinary**: Free tier for images

## 🛠️ Troubleshooting

### "Cannot find module"
```bash
cd Backend
rm -rf node_modules package-lock.json
npm install
```

### "Port 5000 already in use"
```bash
# Change port in .env
PORT=5001
```

### "MongoDB connection failed"
```bash
# Make sure MongoDB is running
mongosh
# Should connect successfully
```

### "npm command not found"
Install Node.js from https://nodejs.org/

## 💡 Pro Tips

1. **Keep 3 terminal windows open:**
   - MongoDB
   - Backend server
   - Frontend (when ready)

2. **Use nodemon for development:**
   - Already configured with `npm run dev`
   - Auto-restarts on file changes

3. **Check server logs:**
   - All requests logged in terminal
   - Look for errors in red

4. **Use MongoDB Compass:**
   - Visual interface for database
   - Download: https://www.mongodb.com/products/compass

5. **Test with Postman:**
   - Create collection of API requests
   - Save example responses
   - Share with team

## 📞 Getting Help

**If you encounter issues:**

1. Check the error message carefully
2. Verify all prerequisites are installed
3. Ensure MongoDB is running
4. Check `.env` configuration
5. Review server logs
6. Consult documentation files

**Common questions answered in:**
- QUICKSTART.md - Quick setup issues
- PROJECT_INFO.md - Feature questions
- docs/SETUP.md - Detailed setup help

## 🎉 You're Ready!

Your Isoté e-commerce platform is ready to use:

✅ Backend fully functional
✅ API endpoints working
✅ Database seeded
✅ Admin account created
✅ Documentation complete

**Happy building! 🚀**

---

Built with ❤️ by Ahmad
