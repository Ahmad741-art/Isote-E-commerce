# Isoté E-commerce Platform - Complete Setup Script (PowerShell)
# This script creates the entire project structure with all files

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Isoté Luxury E-commerce Platform" -ForegroundColor Cyan
Write-Host "  Complete Project Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Creating project structure..." -ForegroundColor Green

# Create Backend structure
Write-Host "📦 Creating Backend structure..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "Backend\config", "Backend\models", "Backend\routes", "Backend\controllers", "Backend\middleware", "Backend\utils", "Backend\seeds" | Out-Null

# Backend package.json
@'
{
  "name": "isote-backend",
  "version": "1.0.0",
  "description": "Isoté Luxury E-commerce Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node seeds/seedProducts.js"
  },
  "keywords": ["ecommerce", "luxury", "fashion"],
  "author": "Ahmad",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.1",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^1.41.0",
    "stripe": "^14.9.0",
    "nodemailer": "^6.9.7",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
'@ | Out-File -FilePath "Backend\package.json" -Encoding UTF8

Write-Host "✓ Backend package.json created" -ForegroundColor Green

# Backend .env.example
@'
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/isote-ecommerce

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=noreply@isote.com

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Admin
ADMIN_EMAIL=admin@isote.com
ADMIN_PASSWORD=Admin123!
'@ | Out-File -FilePath "Backend\.env.example" -Encoding UTF8

Write-Host "✓ Backend .env.example created" -ForegroundColor Green

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Backend structure created successfully!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Copy Backend\.env.example to Backend\.env" -ForegroundColor White
Write-Host "2. Configure your environment variables" -ForegroundColor White
Write-Host "3. Run: cd Backend && npm install" -ForegroundColor White
Write-Host "4. Run: npm run seed (to add sample products)" -ForegroundColor White
Write-Host "5. Run: npm run dev (to start server)" -ForegroundColor White
Write-Host ""
Write-Host "See SETUP.md for detailed instructions" -ForegroundColor Yellow
