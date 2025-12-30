# How to Generate Files with Setup Scripts

This guide shows you **exactly how to use the setup scripts** to automatically generate all project files.

## 🎯 What the Setup Scripts Do

The `setup.sh` (Linux/Mac) and `setup.ps1` (Windows) scripts automatically:

1. ✅ Create all Backend directories
2. ✅ Generate all `.js` files with complete code
3. ✅ Create `package.json` with dependencies
4. ✅ Create `.env.example` template
5. ✅ Create `.gitignore` file
6. ✅ Set up the complete Backend structure

**Total files created: 30+ files**

---

## 📋 Method 1: Linux/Mac (Bash Script)

### Step 1: Open Terminal

- **Mac**: Press `Cmd + Space`, type "Terminal", press Enter
- **Linux**: Press `Ctrl + Alt + T`

### Step 2: Navigate to Project

```bash
# Example - adjust to your actual path
cd ~/Downloads/Isote-Ecommerce

# Or
cd /Users/YourName/Desktop/Isote-Ecommerce
```

**Verify you're in the right folder:**
```bash
ls
# You should see: setup.sh, README.md, Backend/, Frontend/, etc.
```

### Step 3: Make Script Executable

```bash
chmod +x setup.sh
```

### Step 4: Run the Script

```bash
./setup.sh
```

**You'll see output like:**
```
=========================================
  Isoté Luxury E-commerce Platform
  Complete Project Setup
=========================================

Creating project structure...
📦 Creating Backend structure...
⚙️  Creating Backend config files...
✓ Backend config/database.js created
✓ Backend config/stripe.js created
📊 Creating Backend models...
✓ Backend models/User.js created
✓ Backend models/Product.js created
...
✓ Backend structure created successfully!
```

### Step 5: Verify Files Were Created

```bash
# Run verification script
chmod +x verify-files.sh
./verify-files.sh
```

**Expected output:**
```
✓ Backend/config/database.js
✓ Backend/config/stripe.js
✓ Backend/models/User.js
...
✓ All Backend files created successfully!
```

### Step 6: Continue Setup

```bash
cd Backend
npm install
cp .env.example .env
nano .env  # or use any text editor to configure
```

---

## 🪟 Method 2: Windows (PowerShell Script)

### Step 1: Open PowerShell as Administrator

1. Press `Windows Key`
2. Type "PowerShell"
3. **Right-click** on "Windows PowerShell"
4. Click "Run as administrator"

### Step 2: Navigate to Project

```powershell
# Example - adjust to your actual path
cd C:\Users\YourName\Downloads\Isote-Ecommerce

# Or
cd C:\Users\YourName\Desktop\Isote-Ecommerce
```

**Verify you're in the right folder:**
```powershell
dir
# You should see: setup.ps1, README.md, Backend/, Frontend/, etc.
```

### Step 3: Allow Script Execution

**Run this ONE TIME only:**
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**If prompted, type:** `Y` and press Enter

### Step 4: Run the Script

```powershell
.\setup.ps1
```

**You'll see output like:**
```
=========================================
  Isoté Luxury E-commerce Platform
  Complete Project Setup
=========================================

Creating project structure...
📦 Creating Backend structure...
✓ Backend package.json created
✓ Backend .env.example created
...
✓ Backend structure created successfully!
```

### Step 5: Continue Setup

```powershell
cd Backend
npm install
Copy-Item .env.example .env
notepad .env  # Configure your environment
```

---

## 🔍 Troubleshooting

### "Permission denied" (Linux/Mac)

**Problem:** Can't run `./setup.sh`

**Solution:**
```bash
chmod +x setup.sh
./setup.sh
```

### "Execution policy" error (Windows)

**Problem:** PowerShell won't run scripts

**Solution:**
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\setup.ps1
```

### "Command not found: ./setup.sh"

**Problem:** Wrong directory

**Solution:**
```bash
# Make sure you're in the Isote-Ecommerce folder
pwd  # Check current directory
ls   # Should show setup.sh
```

### Files already exist

**Problem:** "File already exists" errors

**Solution 1 - Start fresh:**
```bash
# Backup if needed
mv Backend Backend_backup

# Run setup again
./setup.sh
```

**Solution 2 - Skip existing:**
The script will notify you but continue creating missing files.

---

## 📁 What Files Get Created

After running `setup.sh` or `setup.ps1`, you'll have:

```
Backend/
├── config/
│   ├── database.js          ✅ Created
│   └── stripe.js            ✅ Created
├── models/
│   ├── User.js             ✅ Created (with authentication)
│   ├── Product.js          ✅ Created (with variants)
│   ├── Cart.js             ✅ Created (with calculations)
│   ├── Order.js            ✅ Created (with payments)
│   └── Review.js           ✅ Created (with ratings)
├── routes/
│   ├── auth.js             ✅ Created
│   ├── products.js         ✅ Created
│   ├── cart.js             ✅ Created
│   ├── orders.js           ✅ Created
│   ├── checkout.js         ✅ Created
│   ├── admin.js            ✅ Created
│   └── webhooks.js         ✅ Created
├── controllers/
│   ├── authController.js   ✅ Created (login, register)
│   ├── productController.js ✅ Created (CRUD)
│   ├── cartController.js   ✅ Created (cart ops)
│   ├── orderController.js  ✅ Created (orders)
│   ├── checkoutController.js ✅ Created (payments)
│   └── adminController.js  ✅ Created (admin)
├── middleware/
│   ├── auth.js             ✅ Created (JWT auth)
│   ├── admin.js            ✅ Created (admin check)
│   └── errorHandler.js     ✅ Created (errors)
├── utils/
│   ├── email.js            ✅ Created (emails)
│   ├── imageUpload.js      ✅ Created (cloudinary)
│   └── helpers.js          ✅ Created (utilities)
├── seeds/
│   └── seedProducts.js     ✅ Created (sample data)
├── server.js               ✅ Created (main server)
├── package.json            ✅ Created (dependencies)
├── .env.example            ✅ Created (config template)
└── .gitignore              ✅ Created (git ignore)
```

**Total: 30+ files with complete, working code!**

---

## ✅ Verification Checklist

After running the setup script:

- [ ] All directories created in Backend/
- [ ] All .js files exist
- [ ] package.json exists
- [ ] .env.example exists
- [ ] No error messages in terminal
- [ ] `npm install` works in Backend/

**Quick verification:**
```bash
cd Backend
ls -la config/    # Should see database.js, stripe.js
ls -la models/    # Should see User.js, Product.js, etc.
ls -la routes/    # Should see auth.js, products.js, etc.
```

---

## 🚀 After Setup Script Completes

### Next Steps:

1. **Install Dependencies**
   ```bash
   cd Backend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running
   mongosh  # Should connect successfully
   ```

4. **Seed Database**
   ```bash
   npm run seed
   ```

5. **Start Server**
   ```bash
   npm run dev
   ```

6. **Test API**
   ```bash
   curl http://localhost:5000/health
   # Should return: {"status":"OK","message":"Isoté API is running"}
   ```

---

## 💡 Pro Tips

### Tip 1: Check File Contents
```bash
# Look at any created file
cat Backend/models/User.js
# You'll see the complete code, not empty files!
```

### Tip 2: Use Verification Script
```bash
chmod +x verify-files.sh
./verify-files.sh
# Shows which files were created successfully
```

### Tip 3: Run Setup Multiple Times
The script is **idempotent** - safe to run multiple times. It will:
- Skip files that already exist
- Create only missing files
- Show what it's doing

### Tip 4: Watch for Errors
If you see errors during setup:
1. Read the error message
2. Fix the issue (permissions, missing tools, etc.)
3. Run setup again

---

## 🎯 Summary

**To generate all files:**

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\setup.ps1
```

**Then verify:**
```bash
chmod +x verify-files.sh
./verify-files.sh
```

**The scripts create ALL Backend files automatically!**

No manual file creation needed. Just run the script and you're ready to go! 🚀
