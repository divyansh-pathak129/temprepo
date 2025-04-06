const MAKEUP_API_BASE_URL = 'https://makeup-api.herokuapp.com/api/v1';

// Fallback product data in case of fetch failure
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Classic Red Lipstick",
    brand: "Glamour Cosmetics",
    price: 19.99,
    description: "A timeless red lipstick with long-lasting color and smooth application.",
    image_link: "https://images.unsplash.com/photo-1619352520578-8fefbfa2f904?w=600",
    category: "Lipstick",
    product_type: "lipstick",
    product_colors: [
      { colour_name: "Classic Red", hex_value: "#FF0000" },
      { colour_name: "Deep Burgundy", hex_value: "#800020" }
    ]
  },
  {
    id: 2,
    name: "Volumizing Mascara",
    brand: "Beauty Essentials",
    price: 15.50,
    description: "Dramatic volume and length with our waterproof mascara.",
    image_link: "https://images.unsplash.com/photo-1512207128881-1baee87126fb?w=600",
    category: "Mascara",
    product_type: "mascara",
    product_colors: []
  },
  // Add more fallback products as needed
];

// Predefined price ranges for different product types
const PRODUCT_PRICE_RANGES = {
  'lipstick': { min: 8, max: 25, defaultPrice: 15.99 },
  'mascara': { min: 10, max: 30, defaultPrice: 18.50 },
  'foundation': { min: 15, max: 45, defaultPrice: 29.99 },
  'blush': { min: 12, max: 35, defaultPrice: 22.50 },
  'eyeliner': { min: 8, max: 25, defaultPrice: 14.99 },
  'eyeshadow': { min: 15, max: 40, defaultPrice: 27.50 },
  'concealer': { min: 10, max: 35, defaultPrice: 19.99 },
  'bronzer': { min: 15, max: 40, defaultPrice: 26.50 },
  'highlighter': { min: 12, max: 35, defaultPrice: 23.99 },
  'lip gloss': { min: 8, max: 25, defaultPrice: 16.50 },
  'lip liner': { min: 7, max: 22, defaultPrice: 12.99 }
};

// Brand-specific price adjustments
const BRAND_PRICE_MULTIPLIERS = {
  'nyx': 0.8,
  'maybelline': 0.9,
  'l\'oreal': 1.2,
  'revlon': 1.1,
  'covergirl': 1.0,
  'mac': 1.5,
  'benefit': 1.4,
  'urban decay': 1.3,
  'e.l.f.': 0.7,
  'wet n wild': 0.6
};

// Fetch all makeup products with error handling
export const getAllProducts = async () => {
  try {
    // Use the Next.js API route to fetch products
    const response = await fetch('/api/makeup-products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching to always fetch fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    return data.length > 0 ? data : FALLBACK_PRODUCTS;
  } catch (error) {
    console.error('Error fetching makeup products:', error);
    
    // Return fallback products if fetch fails
    return FALLBACK_PRODUCTS;
  }
};

// Fetch products by brand
export const getProductsByBrand = async (brand) => {
  try {
    const response = await fetch(`/api/makeup-products?brand=${brand}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products by brand');
    }
    
    const data = await response.json();
    return data.length > 0 ? data : FALLBACK_PRODUCTS.filter(p => p.brand.toLowerCase().includes(brand.toLowerCase()));
  } catch (error) {
    console.error('Error fetching products by brand:', error);
    return FALLBACK_PRODUCTS.filter(p => p.brand.toLowerCase().includes(brand.toLowerCase()));
  }
};

// Fetch products by type
export const getProductsByType = async (productType) => {
  try {
    const response = await fetch(`/api/makeup-products?product_type=${productType}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products by type');
    }
    
    const data = await response.json();
    return data.length > 0 ? data : FALLBACK_PRODUCTS.filter(p => p.product_type.toLowerCase() === productType.toLowerCase());
  } catch (error) {
    console.error('Error fetching products by type:', error);
    return FALLBACK_PRODUCTS.filter(p => p.product_type.toLowerCase() === productType.toLowerCase());
  }
};

// Transform makeup API data to match your application's format
export const transformMakeupData = (makeupProducts) => {
  return makeupProducts.map(product => {
    // Normalize product type and brand for consistent matching
    const normalizedProductType = product.product_type?.toLowerCase().trim() || 'misc';
    const normalizedBrand = product.brand?.toLowerCase().trim() || 'generic';

    // Parse the original price first
    let price;
    const originalPrice = product.price;
    
    if (typeof originalPrice === 'number' && !isNaN(originalPrice)) {
      price = originalPrice;
    } else if (typeof originalPrice === 'string') {
      const parsedPrice = parseFloat(originalPrice);
      price = !isNaN(parsedPrice) ? parsedPrice : 0;
    } else {
      price = 0;
    }

    // Only apply transformations if we don't have a valid price
    if (price === 0) {
      const priceRange = PRODUCT_PRICE_RANGES[normalizedProductType] || 
        { min: 10, max: 35, defaultPrice: 24.99 };
      price = priceRange.defaultPrice;
    }

    // Store the final calculated price
    const finalPrice = price;

    return {
      ...product,
      price: finalPrice,
      // Add these fields for transparency
      original_price: originalPrice,
      calculated_price: finalPrice,
      price_inr: Math.round(finalPrice * 80)
    };
  });
};

// Function to fetch and transform all products for Clerk storage
export const fetchAllMakeupProducts = async () => {
  try {
    const response = await fetch('/api/makeup-products');
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    
    // Transform the data to include additional metadata for Clerk
    return data.map(product => ({
      id: product.id.toString(), // Ensure ID is a string for Clerk
      name: product.name,
      brand: product.brand,
      price: product.price,
      description: product.description,
      image_link: product.image_link,
      category: product.category,
      product_type: product.product_type,
      metadata: {
        // Additional metadata can be stored here
        originalProductData: JSON.stringify(product)
      }
    }));
  } catch (error) {
    console.error('Error fetching all makeup products:', error);
    return FALLBACK_PRODUCTS.map(product => ({
      id: product.id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.price,
      description: product.description,
      image_link: product.image_link,
      category: product.category,
      product_type: product.product_type,
      metadata: {
        originalProductData: JSON.stringify(product)
      }
    }));
  }
}; 