'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/cartContext';
import { useWishlist } from '../context/wishlistContext';
import { Heart } from 'lucide-react';
import { getAllProducts, transformMakeupData } from '@/utils/makeupApi';

export default function SkincarePage() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [skincareProducts, setSkincareProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Breadcrumb data
  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: 'Skincare', path: '/skincare' }
  ];

  useEffect(() => {
    const fetchSkincareProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        const transformedProducts = transformMakeupData(allProducts);
        
        // Debug logging
        console.log('Total Products:', transformedProducts.length);
        console.log('Product Types:', [...new Set(transformedProducts.map(p => p.product_type))]);
        
        // Filter products that are skincare-related
        const skincareProducts = transformedProducts.filter(product => {
          const productType = product.product_type?.toLowerCase() || '';
          const category = product.category?.toLowerCase() || '';
          const name = product.name?.toLowerCase() || '';
          const description = product.description?.toLowerCase() || '';
          
          return (
            // Skincare product types
            productType.includes('cleanser') ||
            productType.includes('moisturizer') ||
            productType.includes('serum') ||
            productType.includes('toner') ||
            productType.includes('mask') ||
            productType.includes('sunscreen') ||
            productType.includes('exfoliator') ||
            productType.includes('face wash') ||
            productType.includes('face cream') ||
            productType.includes('face oil') ||
            productType.includes('face lotion') ||
            productType.includes('face gel') ||
            productType.includes('face scrub') ||
            productType.includes('face treatment') ||
            productType.includes('face moisturizer') ||
            productType.includes('face cleanser') ||
            productType.includes('face serum') ||
            productType.includes('face toner') ||
            productType.includes('face mask') ||
            productType.includes('face sunscreen') ||
            productType.includes('face exfoliator') ||
            // Skincare categories
            category.includes('skincare') ||
            category.includes('face care') ||
            category.includes('skin care') ||
            // Product names and descriptions
            name.includes('face wash') ||
            name.includes('face cream') ||
            name.includes('face oil') ||
            name.includes('face lotion') ||
            name.includes('face gel') ||
            name.includes('face scrub') ||
            name.includes('face treatment') ||
            name.includes('face moisturizer') ||
            name.includes('face cleanser') ||
            name.includes('face serum') ||
            name.includes('face toner') ||
            name.includes('face mask') ||
            name.includes('face sunscreen') ||
            name.includes('face exfoliator') ||
            description.includes('face wash') ||
            description.includes('face cream') ||
            description.includes('face oil') ||
            description.includes('face lotion') ||
            description.includes('face gel') ||
            description.includes('face scrub') ||
            description.includes('face treatment') ||
            description.includes('face moisturizer') ||
            description.includes('face cleanser') ||
            description.includes('face serum') ||
            description.includes('face toner') ||
            description.includes('face mask') ||
            description.includes('face sunscreen') ||
            description.includes('face exfoliator')
          );
        });

        // Debug logging for filtered products
        console.log('Filtered Skincare Products:', skincareProducts.length);
        console.log('Filtered Product Types:', [...new Set(skincareProducts.map(p => p.product_type))]);
        
        setSkincareProducts(skincareProducts);
      } catch (error) {
        console.error('Error fetching skincare products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkincareProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              <Link href={item.path} className="hover:text-pink-500">
                {item.name}
              </Link>
              {index < breadcrumb.length - 1 && <span>➔</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Banner Section */}
      <div className="relative w-full h-[400px] bg-[#C41E3A]">
        <div className="absolute inset-0">
          <img
            src="/skincare-banner.jpg"
            alt="Skincare Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-end pr-20">
            <div className="text-right">
              <h1 className="text-6xl font-bold text-white mb-4">
                GLOWING
              </h1>
              <h2 className="text-7xl font-extrabold text-white flex items-center">
                SKIN <span className="font-script ml-4 text-8xl">care</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Skincare Products</h1>
        {skincareProducts.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No skincare products found. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skincareProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4"
              >
                <Link href={`/skincare/${product.id}`} passHref>
                  <div className="cursor-pointer">
                    <img
                      src={product.image_link}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    <p className="text-lg font-semibold mt-2">{product.name}</p>
                  </div>
                </Link>
                <p className="text-gray-600 line-clamp-2">{product.description}</p>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-lg font-bold">₹{Math.round(product.price * 80)}</p>

                <div className="flex items-center justify-center mt-2">
                  <button
                    className="mt-2 bg-pink-500 text-white px-4 py-2 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add to Bag
                  </button>

                  <button
                    className="ml-2 mt-2 bg-gray-200 p-2 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product);
                    }}
                  >
                    <Heart className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 