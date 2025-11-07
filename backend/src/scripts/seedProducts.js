import { db } from '../config/db.js';

const products = [
  {
    name: 'Handcrafted Ceramic Bowl',
    description: 'Beautifully glazed ceramic bowl made by skilled artisans.',
    price: 799.00,
    stock: 10,
    category: 'pottery',
    image_url: '/images/products/product-ceramic-bowl.jpg'
  },
  {
    name: 'Embroidered Textile Scarf',
    description: 'Soft embroidered scarf with traditional motifs.',
    price: 599.00,
    stock: 15,
    category: 'textiles',
    image_url: '/images/products/product-textile.jpg'
  },
  {
    name: 'Brass Candle Holder',
    description: 'Hand-polished brass candle holder with intricate design.',
    price: 749.00,
    stock: 8,
    category: 'home-decor',
    image_url: '/images/products/product-brass.jpg'
  },
  {
    name: 'Artisan Pottery Vase',
    description: 'Rustic pottery vase perfect for decor and gifting.',
    price: 699.00,
    stock: 12,
    category: 'pottery',
    image_url: '/images/products/product-pottery.jpg'
  }
];

const seed = async () => {
  try {
    console.log('Checking products table...');
    const existing = await db('products').select('id').limit(1);
    if (existing.length > 0) {
      console.log('Products table already has data. Skipping seed.');
      process.exit(0);
    }

    console.log('Seeding products...');
    for (const p of products) {
      await db('products').insert({
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        category: p.category,
        image_url: p.image_url,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      });
    }

    console.log('Seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
