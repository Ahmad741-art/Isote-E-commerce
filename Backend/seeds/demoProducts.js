/**
 * Run: node Backend/seeds/demoProducts.js
 *
 * Make sure Backend/.env is set with MONGODB_URI and MongoDB is running.
 */

require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const path = require('path');

const connectDB = require('../config/database'); // uses existing connect logic
const Product = require('../models/Product');

const demoProducts = [
  {
    name: 'Signature Black Leather Jacket',
    sku: 'MEN-JACKET-001',
    price: 249.99,
    description: 'Minimalist black leather jacket — premium cut and finish.',
    category: 'Jackets',
    gender: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    images: [
      'https://via.placeholder.com/600x800?text=Black+Leather+Jacket'
    ],
    countInStock: 20
  },
  {
    name: 'Tailored Navy Blazer',
    sku: 'MEN-BLAZER-001',
    price: 199.99,
    description: 'Slim-fit navy blazer, perfect for formal and smart-casual.',
    category: 'Blazers',
    gender: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy'],
    images: [
      'https://via.placeholder.com/600x800?text=Navy+Blazer'
    ],
    countInStock: 15
  },
  {
    name: 'Silk Slip Dress',
    sku: 'WOMEN-DRESS-001',
    price: 149.99,
    description: 'Luxurious silk slip dress — elegant and effortless.',
    category: 'Dresses',
    gender: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Champagne'],
    images: [
      'https://via.placeholder.com/600x800?text=Silk+Slip+Dress'
    ],
    countInStock: 25
  },
  {
    name: 'Wool Tailored Coat',
    sku: 'WOMEN-COAT-001',
    price: 219.99,
    description: 'Warm wool coat with a refined silhouette.',
    category: 'Coats',
    gender: 'women',
    sizes: ['S', 'M', 'L'],
    colors: ['Camel'],
    images: [
      'https://via.placeholder.com/600x800?text=Wool+Coat'
    ],
    countInStock: 10
  }
];

async function seed() {
  try {
    console.log('Connecting to DB...');
    connectDB(); // existing file should handle the connection

    // wait for mongoose connection ready
    await new Promise(resolve => {
      if (mongoose.connection.readyState === 1) return resolve();
      mongoose.connection.once('open', resolve);
    });

    console.log('Clearing a few demo products (non-destructive to others)...');

    for (const item of demoProducts) {
      // Upsert by SKU to avoid duplicates
      await Product.findOneAndUpdate({ sku: item.sku }, item, { upsert: true, new: true, setDefaultsOnInsert: true });
      console.log(`Upserted ${item.sku}`);
    }

    console.log('Demo products seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();