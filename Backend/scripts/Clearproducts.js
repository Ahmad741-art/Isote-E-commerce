// Backend/scripts/clearProducts.js
// This script deletes ALL products from your database
// Use this to remove default/demo products before adding real ones

const mongoose = require('mongoose');
require('dotenv').config();

// Import your Product model
// Adjust the path if your model is in a different location
const Product = require('../models/Product');

const clearProducts = async () => {
  try {
    console.log('🔌 Connecting to database...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL || process.env.MONGODB_URI);
    console.log('✅ Connected to database');

    // Count products before deletion
    const countBefore = await Product.countDocuments();
    console.log(`📦 Products in database: ${countBefore}`);

    if (countBefore === 0) {
      console.log('ℹ️  No products to delete');
      process.exit(0);
    }

    // Ask for confirmation
    console.log('⚠️  This will DELETE ALL products from your database!');
    console.log('   Press Ctrl+C to cancel or wait 3 seconds to continue...');
    
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Delete all products
    const result = await Product.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} products`);

    // Count products after deletion
    const countAfter = await Product.countDocuments();
    console.log(`📦 Products remaining: ${countAfter}`);

    console.log('✅ All products cleared successfully!');
    console.log('💡 You can now add your real products via the admin panel');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing products:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

// Run the script
clearProducts();