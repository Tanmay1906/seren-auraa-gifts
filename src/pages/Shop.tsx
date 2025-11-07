import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts, useFeaturedProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
// ProductCard was removed per request; use inline tiles or link to product detail instead
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const fallbackProducts = [
  {
    id: 'fallback-blush-chiffon-petal-pink',
    name: 'Blush Chiffon Scarf - Petal Pink',
    price: 549,
    image: '/images/products/Blush%20Chiffon%20-%20Pink.PNG',
    category: 'textiles',
    artisan: 'Ananya Rao',
    color: 'Petal Pink',
    created_at: '2024-10-01T00:00:00.000Z',
  },
  {
    id: 'fallback-coastal-constellation-bracelet',
    name: 'Coastal Constellation Sea Star Pearl Bracelet',
    price: 899,
    image: '/images/products/Coastal%20Constellation%20-%20Sea%20Star%20Pearl%20Bracelet.PNG',
    category: 'jewelry',
    artisan: 'Arnav Shah',
    color: 'Ocean Pearl',
    created_at: '2024-10-02T00:00:00.000Z',
  },
  {
    id: 'fallback-knot-of-truth-classic-silver',
    name: 'Knot of Truth Eight Knot Ring - Classic Silver',
    price: 779,
    image: '/images/products/Knot%20of%20Truth%20-%20Eight%20Knot%20Ring.PNG',
    category: 'jewelry',
    artisan: 'Mira Kapoor',
    color: 'Classic Silver',
    created_at: '2024-10-03T00:00:00.000Z',
  },
  {
    id: 'fallback-knot-of-truth-rose-gold',
    name: 'Knot of Truth Eight Knot Ring - Rose Gold',
    price: 829,
    image: '/images/products/Knot%20of%20Truth%20-%20Eight%20Knot%20Ring01.PNG',
    category: 'jewelry',
    artisan: 'Mira Kapoor',
    color: 'Rose Gold',
    created_at: '2024-10-04T00:00:00.000Z',
  },
  {
    id: 'fallback-knot-of-truth-midnight-onyx',
    name: 'Knot of Truth Eight Knot Ring - Midnight Onyx',
    price: 799,
    image: '/images/products/Knot%20of%20Truth%20-%20Eight%20Knot%20Ring02.PNG',
    category: 'jewelry',
    artisan: 'Mira Kapoor',
    color: 'Midnight Onyx',
    created_at: '2024-10-05T00:00:00.000Z',
  },
  {
    id: 'fallback-ombre-noire-evening-clutch',
    name: 'Ombre Noire Evening Clutch',
    price: 959,
    image: '/images/products/Ombre%20Noire%20-%20Black.PNG',
    category: 'accessories',
    artisan: 'Leila Das',
    color: 'Shadow Black',
    created_at: '2024-10-06T00:00:00.000Z',
  },
  {
    id: 'fallback-riviera-lux-silverlight',
    name: 'Riviera Lux Silverlight Pearl Earrings',
    price: 929,
    image: '/images/products/Riviera%20Lux%20-%20Silverlight%20Pearl%20Earrings.PNG',
    category: 'jewelry',
    artisan: 'Saanvi Iyer',
    color: 'Silverlight',
    created_at: '2024-10-07T00:00:00.000Z',
  },
  {
    id: 'fallback-riviera-lux-aurora',
    name: 'Riviera Lux Aurora Pearl Earrings',
    price: 969,
    image: '/images/products/Riviera%20Lux%20-%20Silverlight%20Pearl%20Earrings01.PNG',
    category: 'jewelry',
    artisan: 'Saanvi Iyer',
    color: 'Aurora Glow',
    created_at: '2024-10-08T00:00:00.000Z',
  },
  {
    id: 'fallback-roseate-promise-heart-ring',
    name: 'Roseate Promise Heart Ring',
    price: 699,
    image: '/images/products/Roseate%20Promise%20-%20Heart-shaped%20Ring.PNG',
    category: 'jewelry',
    artisan: 'Ishita Sethi',
    color: 'Rose Blush',
    created_at: '2024-10-09T00:00:00.000Z',
  },
  {
    id: 'fallback-scented-candle-vanilla-chai',
    name: 'Scented Candle - Vanilla Chai',
    price: 499,
    image: '/images/products/Scented%20Candle.PNG',
    category: 'home-decor',
    artisan: 'Rhea Bhandari',
    scent: 'Vanilla Chai',
    created_at: '2024-10-10T00:00:00.000Z',
  },
  {
    id: 'fallback-scented-candle-himalayan-cedar',
    name: 'Scented Candle - Himalayan Cedar',
    price: 549,
    image: '/images/products/Scented%20Candle00.PNG',
    category: 'home-decor',
    artisan: 'Rhea Bhandari',
    scent: 'Himalayan Cedar',
    created_at: '2024-10-11T00:00:00.000Z',
  },
  {
    id: 'fallback-scented-candle-rosewood-bloom',
    name: 'Scented Candle - Rosewood Bloom',
    price: 579,
    image: '/images/products/Scented%20Candle01.PNG',
    category: 'home-decor',
    artisan: 'Rhea Bhandari',
    scent: 'Rosewood Bloom',
    created_at: '2024-10-12T00:00:00.000Z',
  },
  {
    id: 'fallback-scented-candle-azure-sea-salt',
    name: 'Scented Candle - Azure Sea Salt',
    price: 529,
    image: '/images/products/Scented%20Candle02.PNG',
    category: 'home-decor',
    artisan: 'Rhea Bhandari',
    scent: 'Azure Sea Salt',
    created_at: '2024-10-13T00:00:00.000Z',
  },
  {
    id: 'fallback-scented-candle-amber-ember',
    name: 'Scented Candle - Amber Ember',
    price: 589,
    image: '/images/products/Scented%20Candle03.PNG',
    category: 'home-decor',
    artisan: 'Rhea Bhandari',
    scent: 'Amber Ember',
    created_at: '2024-10-14T00:00:00.000Z',
  },
  {
    id: 'fallback-scented-candle-citrus-verbena',
    name: 'Scented Candle - Citrus Verbena',
    price: 559,
    image: '/images/products/Scented%20Candle04.PNG',
    category: 'home-decor',
    artisan: 'Rhea Bhandari',
    scent: 'Citrus Verbena',
    created_at: '2024-10-15T00:00:00.000Z',
  },
  {
    id: 'fallback-solstice-hoops-gold-aura',
    name: 'Solstice Hoops Gold Aura Earrings - Radiant',
    price: 799,
    image: '/images/products/Solstice%20Hoops%20-%20Gold%20Aura%20Earrings.JPG',
    category: 'jewelry',
    artisan: 'Naina Arora',
    color: 'Radiant Gold',
    created_at: '2024-10-16T00:00:00.000Z',
  },
  {
    id: 'fallback-solstice-hoops-celestial-aura',
    name: 'Solstice Hoops Gold Aura Earrings - Celestial',
    price: 859,
    image: '/images/products/Solstice%20Hoops%20-%20Gold%20Aura%20Earrings.PNG',
    category: 'jewelry',
    artisan: 'Naina Arora',
    color: 'Celestial Gold',
    created_at: '2024-10-17T00:00:00.000Z',
  },
  {
    id: 'fallback-heiress-studs-champagne',
    name: 'Heiress Studs Luxe Set of Six',
    price: 989,
    image: '/images/products/The%20Heiress%20Studs%20-%20Set%20of%206%20Studs.PNG',
    category: 'jewelry',
    artisan: 'Zara Menon',
    color: 'Champagne Glow',
    created_at: '2024-10-18T00:00:00.000Z',
  },
  {
    id: 'fallback-whisper-taffeta-cocoa',
    name: 'Whisper Taffeta Drape - Cocoa',
    price: 749,
    image: '/images/products/Whisper%20Taffeta%20-%20Brown.PNG',
    category: 'textiles',
    artisan: 'Devika Anand',
    color: 'Cocoa',
    created_at: '2024-10-19T00:00:00.000Z',
  },
];

const featuredFallback = fallbackProducts;

type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'popular';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  // Get filter and sort values from URL or use defaults
  const category = searchParams.get('category') || '';
  const sort = (searchParams.get('sort') as SortOption) || 'newest';
  const search = searchParams.get('search') || '';

  // Initialize search query from URL
  useEffect(() => {
    if (search) {
      setSearchQuery(search);
    }
  }, [search]);

  // Fetch products with filters
  const { data: products, isLoading, isError, error } = useProducts({
    category: category || undefined,
    search: search || undefined,
    sort,
  });

  // Log any errors for debugging
  useEffect(() => {
    if (error) {
      console.error('Error fetching products:', error);
    }
  }, [error]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
  };

  // Handle category filter
  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  // Handle sort
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    setSearchParams(params);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  // Check if any filters are active
  const hasActiveFilters = Boolean(category) || Boolean(search);

  // Fallback featured products (used when API & featured endpoint return empty)
  // Prepare base list: prefer server products, otherwise fallback
  // Also try fetching featured products endpoint
  const { data: featured } = useFeaturedProducts();

  const fallbackSource = [
    ...featuredFallback,
    ...((featured || []).filter((feat) => {
      const featId = String(feat.id || feat.name || '').toLowerCase();
      return !featuredFallback.some((fallback) => {
        const fallbackId = String(fallback.id || fallback.name || '').toLowerCase();
        return fallbackId === featId;
      });
    })),
  ];

  const normalizedProducts = Array.isArray(products) ? products : [];

  const baseProducts = normalizedProducts.length > 0
    ? [
        ...normalizedProducts,
        ...fallbackSource.filter((fallback) => {
          const fallbackId = String(fallback.id || fallback.name || '').toLowerCase();
          return !normalizedProducts.some((product) => {
            const productId = String(product.id || product.name || '').toLowerCase();
            return productId === fallbackId;
          });
        }),
      ]
    : fallbackSource;

  // Apply client-side filtering/sorting so UI controls work even when API is empty
  const filteredProducts = baseProducts
    .filter((p: any) => {
      if (category && category !== 'all') {
        // match category loosely
        const cat = (p.category || p.category?.toString() || '').toString().toLowerCase();
        if (!cat.includes(category.toLowerCase())) return false;
      }
      if (search && search.trim()) {
        const q = search.toLowerCase();
        const name = (p.name || p.title || '').toString().toLowerCase();
        if (!name.includes(q)) return false;
      }
      return true;
    })
    .sort((a: any, b: any) => {
      if (sort === 'price-low-high') return Number(a.price) - Number(b.price);
      if (sort === 'price-high-low') return Number(b.price) - Number(a.price);
      // newest or popular default: try created_at if present
      if (sort === 'newest') {
        const da = new Date(a.created_at || a.createdAt || Date.now()).getTime();
        const db = new Date(b.created_at || b.createdAt || Date.now()).getTime();
        return db - da;
      }
      return 0;
    });

  const isUsingApiProducts = normalizedProducts.length > 0;
  const productsToRender = isUsingApiProducts ? filteredProducts : filteredProducts;
  const resultsCount = productsToRender.length;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div className="space-y-4 w-full">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-6 w-96" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Skeleton className="h-10 w-full md:w-64" />
                <Skeleton className="h-10 w-full md:w-48" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                  <X className="w-8 h-8 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Error loading products
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're having trouble loading the products. Please try again later.
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {category 
                    ? `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} Collection` 
                    : 'Our Collection'}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Discover unique handmade products from talented artisans around the world.
                </p>
              </div>
              
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearAllFilters}
                  className="shrink-0"
                >
                  Clear filters
                </Button>
              )}
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {category && (
                  <Badge variant="secondary" className="gap-2">
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className="ml-1 hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {search && (
                  <Badge variant="secondary" className="gap-2">
                    Search: "{search}"
                    <button
                      onClick={clearSearch}
                      className="ml-1 hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Filters Bar */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-muted/30 p-4 rounded-lg border">
              <form onSubmit={handleSearch} className="w-full md:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10 w-full bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {/* Category Filter */}
                <Select value={category || 'all'} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full md:w-48 bg-background">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="pottery">Pottery</SelectItem>
                    <SelectItem value="textiles">Textiles</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="home-decor">Home Decor</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sort} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full md:w-48 bg-background">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          {resultsCount > 0 && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{resultsCount}</span> {resultsCount === 1 ? 'product' : 'products'}
              </p>
            </div>
          )}

          {/* Products Grid */}
          {productsToRender.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {productsToRender.map((product: any) => {
                const title = product.name || product.title || '';
                const price = Number(product.price) || 0;
                const image = product.image_url || product.imageUrl || product.image || '';
                const artisan = product.artisan_name || product.artisanName || product.artisan;

                return (
                  <ProductCard
                    key={product.id || title}
                    id={String(product.id || title)}
                    title={title}
                    price={price}
                    image={image}
                    artisan={artisan}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {search
                  ? `No products match your search "${search}". Try different keywords or filters.`
                  : 'No products available in this category. Try browsing other categories.'}
              </p>
              {hasActiveFilters && (
                <Button onClick={clearAllFilters} variant="outline">
                  Clear all filters
                </Button>
              )}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Shop;