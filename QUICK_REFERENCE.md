# Isoté Setup - Quick Reference Card

## 🚀 ONE-COMMAND SETUP

### Mac/Linux:
```bash
chmod +x setup.sh && ./setup.sh
```

### Windows PowerShell (as Admin):
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; .\setup.ps1
```

---

## 📂 What Gets Created

✅ **30+ Backend files** including:
- 5 Models (User, Product, Cart, Order, Review)
- 6 Controllers (Auth, Product, Cart, Order, Checkout, Admin)
- 7 Routes (Auth, Products, Cart, Orders, Checkout, Admin, Webhooks)
- 3 Middleware (Auth, Admin, ErrorHandler)
- 3 Utils (Email, ImageUpload, Helpers)
- 2 Config files (Database, Stripe)
- 1 Seed file (Sample products)
- server.js, package.json, .env.example, .gitignore

---

## ⚡ Quick Start (5 Commands)

```bash
# 1. Run setup script
./setup.sh

# 2. Install dependencies
cd Backend && npm install

# 3. Configure environment
cp .env.example .env && nano .env

# 4. Seed database (creates products & admin)
npm run seed

# 5. Start server
npm run dev
```

**Server runs on:** http://localhost:5000

---

## 🔑 Default Credentials

**Admin Account:**
```
Email: admin@isote.com
Password: Admin123!
```

**Stripe Test Card:**
```
Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

---

## 🧪 Test Your Backend

```bash
# Health check
curl http://localhost:5000/health

# Get all products
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@isote.com","password":"Admin123!"}'
```

---

## 🔧 Environment Variables (Minimum)

Edit `Backend/.env`:

```env
# REQUIRED
JWT_SECRET=your-super-secret-key-minimum-32-characters
MONGODB_URI=mongodb://localhost:27017/isote-ecommerce

# OPTIONAL (for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 📋 Verification

```bash
# Check all files created
chmod +x verify-files.sh && ./verify-files.sh

# Expected output
✓ Backend/config/database.js
✓ Backend/config/stripe.js
✓ Backend/models/User.js
... (30+ files)
✓ All Backend files created successfully!
```

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| Permission denied | `chmod +x setup.sh` |
| Port 5000 in use | Change `PORT=5001` in .env |
| MongoDB error | Start MongoDB: `mongosh` |
| Module not found | `cd Backend && npm install` |
| Execution policy (Windows) | Run PowerShell as Admin |

---

## 📚 Documentation Files

- **HOW_TO_USE_SETUP_SCRIPTS.md** ← Start here!
- **INSTALLATION.md** - Full installation guide
- **QUICKSTART.md** - 5-minute setup
- **PROJECT_INFO.md** - Complete project details
- **README.md** - Project overview

---

## 🎯 File Structure After Setup

```
Isote-Ecommerce/
├── Backend/              ✅ COMPLETE (30+ files)
│   ├── config/          ✅ 2 files
│   ├── models/          ✅ 5 models
│   ├── routes/          ✅ 7 routes
│   ├── controllers/     ✅ 6 controllers
│   ├── middleware/      ✅ 3 middleware
│   ├── utils/           ✅ 3 utilities
│   ├── seeds/           ✅ 1 seeder
│   ├── server.js        ✅ Main server
│   ├── package.json     ✅ Dependencies
│   └── .env.example     ✅ Config template
└── Frontend/            🏗️ Structure ready
```

---

## 💡 Pro Tips

1. **Keep terminals open**: One for MongoDB, one for Backend
2. **Use nodemon**: Already configured with `npm run dev`
3. **Check logs**: Errors appear in terminal
4. **Use Postman**: Test API endpoints visually
5. **MongoDB Compass**: Visual database interface

---

## ✅ Success Indicators

You'll know setup worked when:

✓ No error messages during setup
✓ `npm install` completes successfully
✓ `npm run seed` creates 6 products
✓ Server starts with "MongoDB Connected" message
✓ `curl http://localhost:5000/health` returns OK
✓ Login works with admin credentials

---

## 🚀 Next Steps After Backend Works

1. ✅ Backend API running
2. ⏳ Build Frontend components
3. ⏳ Connect Frontend to Backend
4. ⏳ Deploy to production

---

**Need help?** Read HOW_TO_USE_SETUP_SCRIPTS.md for detailed instructions!

**Built with ❤️ by Ahmad**
