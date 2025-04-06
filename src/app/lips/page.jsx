'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/cartContext';
import { useWishlist } from '../context/wishlistContext';
import { Heart } from 'lucide-react';

export default function LipsPage() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [lipProducts, setLipProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Breadcrumb data
  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: 'Lips', path: '/lips' }
  ];

  useEffect(() => {
    const fetchLipProducts = async () => {
      try {
        // Fetch products from your API endpoint
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const products = await response.json();
        
        // Filter products for lips-related items
        // Filtering female makeup products focusing on lips
        const lipsRelatedProducts = products.filter(product => 
          (product.gender === 'female' && product.category === 'lips')
        );
        
        setLipProducts(lipsRelatedProducts);
      } catch (error) {
        console.error('Error fetching lip products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLipProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <h2 className="text-xl font-bold text-red-500">Error loading products</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (lipProducts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <h2 className="text-xl font-bold">No lip products found</h2>
        <p>Check back soon for our new arrivals!</p>
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
            src="/lips-banner.jpg"
            alt="Lips Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-end pr-20">
            <div className="text-right">
              <h1 className="text-6xl font-bold text-white mb-4">
                LET YOUR LIPS
              </h1>
              <h2 className="text-7xl font-extrabold text-white flex items-center">
                CAST A <span className="font-script ml-4 text-8xl">spell</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Lip Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lipProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4"
            >
              <Link href={`/product/${product._id}`} passHref>
                <div className="cursor-pointer">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <p className="text-lg font-semibold mt-2">{product.name}</p>
                </div>
              </Link>
              <p className="text-gray-600 line-clamp-2">{product.description}</p>
              <p className="text-sm text-gray-500">{product.brand}</p>
              <p className="text-lg font-bold">₹{product.price}</p>

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
      </div>
    </div>
  );
}