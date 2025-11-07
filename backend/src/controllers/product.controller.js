import { db } from '../config/db.js';

export const getProducts = async (req, res) => {
  console.log('Received request with query params:', req.query);
  
  try {
    // Verify database connection
    await db.raw('SELECT 1');
    
    const { category, search, sort = 'newest' } = req.query;
    
    console.log('Building query with:', { category, search, sort });
    
    let query = db('products').select('*');

    // Apply filters
    if (category) {
      console.log('Applying category filter:', category);
      query = query.where('category', 'ilike', `%${category}%`);
    }

    if (search) {
      console.log('Applying search filter:', search);
      query = query.where('name', 'ilike', `%${search}%`);
    }

    // Apply sorting
    console.log('Applying sort:', sort);
    if (sort === 'price-low-high') {
      query = query.orderBy('price', 'asc');
    } else if (sort === 'price-high-low') {
      query = query.orderBy('price', 'desc');
    } else if (sort === 'newest') {
      query = query.orderBy('created_at', 'desc');
    } else if (sort === 'popular') {
      query = query.orderBy('created_at', 'desc'); // Default to newest for now
    }

    console.log('Executing query...');
    let products = await query;
    console.log(`Found ${products.length} products`);

    // Normalize image URLs: if image_url is relative or missing, provide a placeholder
    products = (products || []).map((p) => {
      const img = p.image_url || p.imageUrl || p.image || '';
      if (img && /^\//.test(img)) {
        // relative path, serve from backend static assets
        p.image_url = `${req.protocol}://${req.get('host')}${img}`;
      } else if (img && /^https?:\/\//i.test(img)) {
        p.image_url = img;
      } else {
        // deterministic placeholder per product id/name
        const seed = p.id || encodeURIComponent((p.name || '').replace(/\s+/g, '-').toLowerCase()) || 'product';
        p.image_url = `https://picsum.photos/seed/${seed}/600/600`;
      }
      return p;
    });

    // If no products found, return empty array instead of 404
    res.json(products || []);
  } catch (error) {
    console.error('Error in getProducts:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      detail: error.detail,
      hint: error.hint,
      table: error.table,
      constraint: error.constraint
    });
    
    // Send appropriate error response
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { 
        stack: error.stack,
        details: {
          code: error.code,
          detail: error.detail,
          hint: error.hint,
          table: error.table,
          constraint: error.constraint
        }
      })
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching product with ID: ${id}`);
  
  if (!id) {
    return res.status(400).json({ 
      success: false,
      error: 'Product ID is required' 
    });
  }

  try {
    // Verify database connection first
    await db.raw('SELECT 1');
    
  let product = await db('products').where({ id }).first();
    
    if (!product) {
      console.log(`Product not found with ID: ${id}`);
      return res.status(404).json({ 
        success: false,
        error: 'Product not found' 
      });
    }
    
    console.log(`Found product:`, { id: product.id, name: product.name });
    // Normalize image
    const img = product.image_url || product.imageUrl || product.image || '';
    if (img && /^\//.test(img)) {
      product.image_url = `${req.protocol}://${req.get('host')}${img}`;
    } else if (img && /^https?:\/\//i.test(img)) {
      product.image_url = img;
    } else {
      const seed = product.id || encodeURIComponent((product.name || '').replace(/\s+/g, '-').toLowerCase()) || 'product';
      product.image_url = `https://picsum.photos/seed/${seed}/600/600`;
    }

    res.json({
      success: true,
      data: product
    });
    
  } catch (error) {
    console.error('Error in getProductById:', {
      id,
      message: error.message,
      stack: error.stack,
      code: error.code,
      detail: error.detail
    });
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch product',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    // Verify database connection
    await db.raw('SELECT 1');

    // Return latest 8 products as featured (fallback when no explicit featured flag exists)
    let products = await db('products')
      .select('*')
      .orderBy('created_at', 'desc')
      .limit(8);

    products = (products || []).map((p) => {
      const img = p.image_url || p.imageUrl || p.image || '';
      if (img && /^\//.test(img)) {
        p.image_url = `${req.protocol}://${req.get('host')}${img}`;
      } else if (img && /^https?:\/\//i.test(img)) {
        p.image_url = img;
      } else {
        const seed = p.id || encodeURIComponent((p.name || '').replace(/\s+/g, '-').toLowerCase()) || 'product';
        p.image_url = `https://picsum.photos/seed/${seed}/600/600`;
      }
      return p;
    });

    res.json(products || []);
  } catch (error) {
    console.error('Error in getFeaturedProducts:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ success: false, message: 'Failed to fetch featured products', error: error.message });
  }
};
