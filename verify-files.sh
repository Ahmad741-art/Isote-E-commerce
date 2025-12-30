#!/bin/bash

# Isoté E-commerce - File Generation Verification Script
# Run this AFTER setup.sh to verify all files were created

echo "========================================"
echo "  Isoté - File Verification Script"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Counter
MISSING=0
FOUND=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((FOUND++))
    else
        echo -e "${RED}✗${NC} $1 ${RED}(MISSING)${NC}"
        ((MISSING++))
    fi
}

echo -e "${YELLOW}Checking Backend files...${NC}"
echo ""

echo "Configuration Files:"
check_file "Backend/config/database.js"
check_file "Backend/config/stripe.js"
echo ""

echo "Models:"
check_file "Backend/models/User.js"
check_file "Backend/models/Product.js"
check_file "Backend/models/Cart.js"
check_file "Backend/models/Order.js"
check_file "Backend/models/Review.js"
echo ""

echo "Controllers:"
check_file "Backend/controllers/authController.js"
check_file "Backend/controllers/productController.js"
check_file "Backend/controllers/cartController.js"
check_file "Backend/controllers/orderController.js"
check_file "Backend/controllers/checkoutController.js"
check_file "Backend/controllers/adminController.js"
echo ""

echo "Routes:"
check_file "Backend/routes/auth.js"
check_file "Backend/routes/products.js"
check_file "Backend/routes/cart.js"
check_file "Backend/routes/orders.js"
check_file "Backend/routes/checkout.js"
check_file "Backend/routes/admin.js"
check_file "Backend/routes/webhooks.js"
echo ""

echo "Middleware:"
check_file "Backend/middleware/auth.js"
check_file "Backend/middleware/admin.js"
check_file "Backend/middleware/errorHandler.js"
echo ""

echo "Utils:"
check_file "Backend/utils/email.js"
check_file "Backend/utils/imageUpload.js"
check_file "Backend/utils/helpers.js"
echo ""

echo "Seeds:"
check_file "Backend/seeds/seedProducts.js"
echo ""

echo "Main Files:"
check_file "Backend/server.js"
check_file "Backend/package.json"
check_file "Backend/.env.example"
check_file "Backend/.gitignore"
echo ""

echo "========================================"
echo -e "Summary:"
echo -e "${GREEN}Found: $FOUND files${NC}"
echo -e "${RED}Missing: $MISSING files${NC}"
echo "========================================"
echo ""

if [ $MISSING -eq 0 ]; then
    echo -e "${GREEN}✓ All Backend files created successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. cd Backend"
    echo "2. npm install"
    echo "3. cp .env.example .env"
    echo "4. Edit .env with your configuration"
    echo "5. npm run seed"
    echo "6. npm run dev"
else
    echo -e "${RED}⚠ Some files are missing!${NC}"
    echo "Please run: ./setup.sh"
fi

echo ""
