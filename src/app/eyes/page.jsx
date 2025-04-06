  "use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/cartContext';
import { useWishlist } from '../context/wishlistContext';
import { Heart } from 'lucide-react';
import { getAllProducts, transformMakeupData } from '@/utils/makeupApi';

// Utility function to strip HTML tags
const stripHtmlTags = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '');
};

export default function EyesPage() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [eyeProducts, setEyeProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Breadcrumb data
  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: 'Eyes', path: '/eyes' }
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
          (product.gender === 'female' && product.category === 'eyes')
        );
        
        setEyeProducts(lipsRelatedProducts);
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
      <div className="relative w-full h-[400px] bg-[#1E90FF]">
        <div className="absolute inset-0">
          <img
            src="/eyes-banner.jpg"
            alt="Eyes Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-end pr-20">
            <div className="text-right">
              <h1 className="text-6xl font-bold text-white mb-4">
                SPELLBINDING SHADES
              </h1>
              <h2 className="text-7xl font-extrabold text-white flex items-center">
                FOR <span className="font-script ml-4 text-8xl">mesmerizing eyes</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Eye Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {eyeProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4"
            >
              <Link href={`/eyes/${product.id}`} passHref>
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
              <p className="text-lg font-bold">
                {product.price_inr > 0 
                  ? `₹${product.price_inr}` 
                  : 'Price not available'}
              </p>

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

      {/* Categories Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Eyeliners & Kajal</h3>
              <p className="text-gray-600">Define your eyes with precision</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Eyeshadows</h3>
              <p className="text-gray-600">Create stunning eye looks</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💫</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Mascaras</h3>
              <p className="text-gray-600">Enhance your lashes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 