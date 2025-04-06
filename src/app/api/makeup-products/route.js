import { NextResponse } from 'next/server';

const MAKEUP_API_BASE_URL = 'https://makeup-api.herokuapp.com/api/v1/products.json';

export async function GET() {
  try {
    const response = await fetch(MAKEUP_API_BASE_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products from external API');
    }
    
    const data = await response.json();
    
    // Log raw product data for debugging
    console.log('Total Products:', data.length);
    console.log('Product Types:', [...new Set(data.map(p => p.product_type))]);
    console.log('Categories:', [...new Set(data.map(p => p.category))]);
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in makeup products API route:', error);
    
    // Fallback products in case of error
    const fallbackProducts = [
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
      }
    ];
    
    return NextResponse.json(fallbackProducts, { status: 200 });
  }
} 