#!/bin/bash

# Isoté E-commerce - Complete Project Builder
# This script builds the entire project structure with all necessary files

echo "========================================="
echo "  Isoté E-commerce Complete Builder"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="Isote-Ecommerce-Complete"

echo -e "${BLUE}Creating project directory: $PROJECT_DIR${NC}"
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# ==========================================
# BACKEND SETUP
# ==========================================

echo -e "${GREEN}Setting up Backend...${NC}"

# Create Backend structure
mkdir -p Backend/{config,models,routes,controllers,middleware,utils,seeds}

# Backend package.json (already created in previous step)
echo -e "${YELLOW}✓ Backend structure created${NC}"

# ==========================================
# FRONTEND SETUP  
# ==========================================

echo -e "${GREEN}Setting up Frontend...${NC}"

# Create Frontend structure
mkdir -p Frontend/public
mkdir -p Frontend/src/{components,pages,contexts,hooks,services,utils}
mkdir -p Frontend/src/components/{Navigation,Footer,Cart,ProductCard,Filters,Loader,Modal,Newsletter}
mkdir -p Frontend/src/pages/{Homepage,Shop,ProductPage,Collections,Checkout,OrderConfirmation,Account,Auth,Lookbook,About,Contact,Legal,Admin}
mkdir -p Frontend/src/pages/Homepage/components
mkdir -p Frontend/src/pages/ProductPage/components
mkdir -p Frontend/src/pages/Checkout/components
mkdir -p Frontend/src/pages/Account/components
mkdir -p Frontend/src/pages/Admin/{Products,Orders,Customers,Analytics}

echo -e "${YELLOW}✓ Frontend structure created${NC}"

# Create docs directory
mkdir -p docs

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Project structure created successfully!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "Directory: $PROJECT_DIR"
echo ""
echo "Next steps:"
echo "1. cd $PROJECT_DIR"
echo "2. Copy the Backend files from the previous setup"
echo "3. Install dependencies:"
echo "   - cd Backend && npm install"
echo "   - cd Frontend && npm install"
echo "4. Configure environment variables (.env files)"
echo "5. Run: npm run seed (in Backend)"
echo "6. Start development servers"
echo ""
