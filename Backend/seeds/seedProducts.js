require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const connectDB = require('../config/database');

const products = [
  {
    name: 'Cashmere Turtleneck Sweater',
    description: 'A timeless essential crafted from the finest Italian cashmere. This luxuriously soft turtleneck features a relaxed fit with ribbed trims and a slightly oversized silhouette for effortless elegance.',
    price: 495,
    category: 'Knitwear',
    gender: 'Women',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
        alt: 'Cashmere Turtleneck Sweater',
      },
    ],
    sizes: [
      { size: 'XS', stock: 10 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 12 },
    ],
    colors: [
      { name: 'Ivory', code: '#FFFFF0' },
      { name: 'Charcoal', code: '#36454F' },
      { name: 'Camel', code: '#C19A6B' },
    ],
    material: '100% Italian Cashmere',
    care: 'Dry clean only',
    madeIn: 'Italy',
    featured: true,
    newArrival: true,
    tags: ['cashmere', 'luxury', 'knitwear', 'essentials'],
  },
  {
    name: 'Tailored Wool Blazer',
    description: 'Impeccably tailored blazer in premium wool blend. Features structured shoulders, notched lapels, and a single-button closure. A versatile piece that transitions seamlessly from day to evening.',
    price: 895,
    compareAtPrice: 1095,
    category: 'Tailoring',
    gender: 'Women',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
        alt: 'Tailored Wool Blazer',
      },
    ],
    sizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 5 },
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Navy', code: '#000080' },
    ],
    material: '90% Wool, 10% Cashmere',
    care: 'Dry clean only',
    madeIn: 'Portugal',
    featured: true,
    bestseller: true,
    tags: ['blazer', 'tailoring', 'wool', 'workwear'],
  },
  {
    name: 'Silk Slip Dress',
    description: 'Ethereal silk slip dress with delicate bias-cut construction. Features thin adjustable straps and a fluid drape that skims the body. A modern take on understated luxury.',
    price: 650,
    category: 'Clothing',
    gender: 'Women',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
        alt: 'Silk Slip Dress',
      },
    ],
    sizes: [
      { size: 'XS', stock: 10 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 10 },
    ],
    colors: [
      { name: 'Champagne', code: '#F7E7CE' },
      { name: 'Midnight', code: '#191970' },
      { name: 'Stone', code: '#928E85' },
    ],
    material: '100% Silk Charmeuse',
    care: 'Dry clean or hand wash cold',
    madeIn: 'France',
    newArrival: true,
    tags: ['silk', 'dress', 'evening', 'luxury'],
  },
  {
    name: 'Leather Tote Bag',
    description: 'Spacious tote crafted from supple Italian leather. Features interior pockets, magnetic closure, and reinforced handles. The perfect everyday companion that ages beautifully.',
    price: 795,
    category: 'Bags',
    gender: 'Unisex',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
        alt: 'Leather Tote Bag',
      },
    ],
    sizes: [{ size: 'One Size', stock: 25 }],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Cognac', code: '#8B4513' },
      { name: 'Taupe', code: '#483C32' },
    ],
    material: 'Full-grain Italian Leather',
    care: 'Wipe clean with soft cloth',
    madeIn: 'Italy',
    featured: true,
    bestseller: true,
    tags: ['leather', 'bag', 'tote', 'accessories'],
  },
  {
    name: 'Merino Wool Coat',
    description: 'Double-breasted coat in premium merino wool. Features a timeless silhouette with peak lapels, welt pockets, and a belted waist. An investment piece for seasons to come.',
    price: 1295,
    category: 'Outerwear',
    gender: 'Women',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3',
        alt: 'Merino Wool Coat',
      },
    ],
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 6 },
    ],
    colors: [
      { name: 'Camel', code: '#C19A6B' },
      { name: 'Charcoal', code: '#36454F' },
    ],
    material: '100% Merino Wool',
    care: 'Dry clean only',
    madeIn: 'Italy',
    featured: true,
    tags: ['coat', 'outerwear', 'wool', 'luxury'],
  },
  {
    name: 'Minimalist Leather Sandals',
    description: 'Elegant flat sandals in buttery soft leather. Features a simple two-strap design with a cushioned footbed and rubber sole. Effortless summer sophistication.',
    price: 325,
    category: 'Footwear',
    gender: 'Women',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1',
        alt: 'Minimalist Leather Sandals',
      },
    ],
    sizes: [
      { size: '36', stock: 8 },
      { size: '37', stock: 12 },
      { size: '38', stock: 15 },
      { size: '39', stock: 12 },
      { size: '40', stock: 8 },
      { size: '41', stock: 5 },
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Tan', code: '#D2B48C' },
    ],
    material: 'Italian Leather',
    care: 'Wipe clean with damp cloth',
    madeIn: 'Spain',
    newArrival: true,
    tags: ['sandals', 'footwear', 'leather', 'summer'],
  },
  {
    name: 'Pure Linen Shirt',
    description: 'Relaxed button-down shirt in crisp European linen. Features a classic collar, chest pocket, and mother-of-pearl buttons. The ultimate warm-weather essential.',
    price: 245,
    category: 'Clothing',
    gender: 'Unisex',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
        alt: 'Pure Linen Shirt',
      },
    ],
    sizes: [
      { size: 'XS', stock: 12 },
      { size: 'S', stock: 18 },
      { size: 'M', stock: 22 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 10 },
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Oat', code: '#EAE6DB' },
      { name: 'Sky Blue', code: '#87CEEB' },
    ],
    material: '100% European Linen',
    care: 'Machine wash cold, tumble dry low',
    madeIn: 'Portugal',
    bestseller: true,
    tags: ['linen', 'shirt', 'summer', 'essentials'],
  },
  {
    name: 'Sterling Silver Hoops',
    description: 'Classic hoop earrings in polished sterling silver. Features secure post backs and a timeless silhouette. Everyday luxury that complements any look.',
    price: 165,
    category: 'Jewelry',
    gender: 'Unisex',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908',
        alt: 'Sterling Silver Hoops',
      },
    ],
    sizes: [{ size: 'One Size', stock: 50 }],
    colors: [{ name: 'Silver', code: '#C0C0C0' }],
    material: '925 Sterling Silver',
    care: 'Clean with silver polishing cloth',
    madeIn: 'Italy',
    tags: ['jewelry', 'earrings', 'silver', 'accessories'],
  },
];

function slugify(name) {
  if (!name) return null;
  return name
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function skuify(name) {
  if (!name) return `SKU-${Date.now()}`;
  // convert name to uppercase slug-like SKU: remove non-alnum, replace spaces with '-', limit length
  return name
    .toString()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);
}

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log('✓ Products cleared');

    // Prepare products: generate unique slug and unique sku, set status/isActive
    const usedSlugs = new Set();
    const usedSkus = new Set();
    const preparedProducts = products.map((p, idx) => {
      const baseSlug = slugify(p.name) || `product-${Date.now()}-${idx}`;
      let uniqueSlug = baseSlug;
      let sCounter = 1;
      while (usedSlugs.has(uniqueSlug)) {
        uniqueSlug = `${baseSlug}-${sCounter++}`;
      }
      usedSlugs.add(uniqueSlug);

      const baseSku = p.sku ? p.sku : skuify(p.name) || `SKU-${Date.now()}-${idx}`;
      let uniqueSku = baseSku;
      let k = 1;
      while (usedSkus.has(uniqueSku)) {
        uniqueSku = `${baseSku}-${k++}`;
      }
      usedSkus.add(uniqueSku);

      return {
        ...p,
        slug: p.slug || uniqueSlug,
        sku: p.sku || uniqueSku,
        status: p.status || 'active',
        isActive: typeof p.isActive === 'boolean' ? p.isActive : true,
      };
    });

    // Insert sample products
    await Product.insertMany(preparedProducts);
    console.log(`✓ ${preparedProducts.length} products seeded`);

    // Create admin user if it doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@isote.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log('✓ Admin user created');
    } else {
      console.log('✓ Admin user already exists');
    }

    console.log('\n✓ Database seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;