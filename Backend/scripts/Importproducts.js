// Backend/scripts/importProducts.js
// This script imports your REAL products into the database
// Edit the 'realProducts' array below with your actual products

const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

// ============================================
// EDIT THIS SECTION WITH YOUR REAL PRODUCTS
// ============================================

const realProducts = [
  {
    name: "Classic White T-Shirt",
    description: "Premium cotton blend t-shirt with a classic fit. Soft, breathable fabric perfect for everyday wear. Features a ribbed crew neck and reinforced shoulder seams for durability.",
    price: 29.99,
    category: "men",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#FFFFFF", "#000000", "#808080"],
    stock: 100,
    discount: 0,
    isNew: true,
    featured: true
  },
  {
    name: "Slim Fit Dark Jeans",
    description: "Modern slim fit jeans crafted from premium stretch denim. Features a comfortable mid-rise waist and tapered leg for a contemporary silhouette. Five-pocket styling with durable construction.",
    price: 79.99,
    category: "men",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["#1a1a1a", "#2a4a6a", "#4a4a4a"],
    stock: 75,
    discount: 15,
    isNew: false,
    featured: true
  },
  {
    name: "Leather Messenger Bag",
    description: "Handcrafted genuine leather messenger bag with vintage appeal. Features multiple compartments, adjustable shoulder strap, and brass hardware. Perfect for work or travel.",
    price: 149.99,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800"
    ],
    sizes: ["One Size"],
    colors: ["#654321", "#2a1810"],
    stock: 30,
    discount: 20,
    isNew: true,
    featured: true
  },
  {
    name: "Minimalist Sneakers",
    description: "Clean, contemporary sneakers with premium leather upper. Featuring a cushioned insole for all-day comfort and a durable rubber outsole. Perfect for casual everyday wear.",
    price: 89.99,
    category: "shoes",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800"
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["#FFFFFF", "#000000"],
    stock: 60,
    discount: 0,
    isNew: true,
    featured: false
  },
  {
    name: "Wool Blend Overcoat",
    description: "Sophisticated wool blend overcoat perfect for cool weather. Features a notched lapel, double-breasted closure, and side pockets. Fully lined for comfort and warmth.",
    price: 199.99,
    category: "men",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1a1a1a", "#4a4a4a", "#2a4a6a"],
    stock: 40,
    discount: 25,
    isNew: false,
    featured: true
  },
  {
    name: "Silk Scarf",
    description: "Luxurious 100% silk scarf with elegant pattern. Hand-rolled edges and vibrant colors make this a versatile accessory. Can be worn multiple ways.",
    price: 49.99,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800",
      "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=800"
    ],
    sizes: ["One Size"],
    colors: ["#d4a65c", "#8b4513", "#2a4a6a"],
    stock: 50,
    discount: 10,
    isNew: true,
    featured: false
  },
  {
    name: "Canvas Tote Bag",
    description: "Durable canvas tote bag perfect for everyday use. Features reinforced handles, interior pocket, and spacious main compartment. Eco-friendly and sustainable.",
    price: 34.99,
    category: "bags",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800"
    ],
    sizes: ["One Size"],
    colors: ["#f5f5f5", "#1a1a1a", "#d4a65c"],
    stock: 80,
    discount: 0,
    isNew: true,
    featured: false
  },
  {
    name: "Aviator Sunglasses",
    description: "Classic aviator sunglasses with UV400 protection. Metal frame with adjustable nose pads for comfort. Includes protective case and cleaning cloth.",
    price: 59.99,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800"
    ],
    sizes: ["One Size"],
    colors: ["#C0C0C0", "#FFD700", "#000000"],
    stock: 45,
    discount: 15,
    isNew: false,
    featured: true
  }
];

// ============================================
// SCRIPT LOGIC - DON'T EDIT BELOW THIS LINE
// ============================================

const importProducts = async () => {
  try {
    console.log('🔌 Connecting to database...');
    await mongoose.connect(process.env.DATABASE_URL || process.env.MONGODB_URI);
    console.log('✅ Connected to database');

    // Count existing products
    const existingCount = await Product.countDocuments();
    console.log(`📦 Current products in database: ${existingCount}`);

    if (existingCount > 0) {
      console.log('⚠️  WARNING: Database already has products!');
      console.log('   This will DELETE existing products and add new ones.');
      console.log('   Press Ctrl+C to cancel or wait 3 seconds to continue...');
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Clear existing products
      const deleted = await Product.deleteMany({});
      console.log(`🗑️  Deleted ${deleted.deletedCount} existing products`);
    }

    // Insert new products
    console.log(`📦 Importing ${realProducts.length} products...`);
    const inserted = await Product.insertMany(realProducts);
    console.log(`✅ Successfully imported ${inserted.length} products!`);

    // Show summary
    console.log('\n📊 Import Summary:');
    console.log(`   Total products: ${inserted.length}`);
    console.log(`   New arrivals: ${inserted.filter(p => p.isNew).length}`);
    console.log(`   Featured: ${inserted.filter(p => p.featured).length}`);
    console.log(`   On sale: ${inserted.filter(p => p.discount > 0).length}`);

    console.log('\n✅ All done! Your products are now live.');
    console.log('💡 Visit your shop page to see them!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing products:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

// Run the script
importProducts();