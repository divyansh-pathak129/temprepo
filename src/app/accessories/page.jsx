'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/cartContext';
import { useWishlist } from '../context/wishlistContext';
import { Heart } from 'lucide-react';

// Sample accessories products
const sampleAccessories = [
  {
    id: 'a1',
    name: 'Pro Makeup Brush Set',
    brand: 'MAC',
    description: 'Professional 12-piece brush set for flawless application',
    price: 4999,
    image_link: '/accessories/mac-brush-set.jpg',
    rating: 4.8,
    product_type: 'Brushes'
  },
  {
    id: 'a2',
    name: 'Beauty Blender Original',
    brand: 'Beauty Blender',
    description: 'The ultimate makeup sponge for a flawless finish',
    price: 1599,
    image_link: '/accessories/beauty-blender.jpg',
    rating: 4.9,
    product_type: 'Sponge'
  },
  {
    id: 'a3',
    name: 'Luxury Vanity Mirror',
    brand: 'Impressions Vanity',
    description: 'LED-lighted vanity mirror with 3x magnification',
    price: 7999,
    image_link: '/accessories/vanity-mirror.jpg',
    rating: 4.7,
    product_type: 'Tools'
  },
  {
    id: 'a4',
    name: 'Professional Eyelash Curler',
    brand: 'Shiseido',
    description: 'Ergonomic design for perfect curl every time',
    price: 1999,
    image_link: '/accessories/eyelash-curler.jpg',
    rating: 4.6,
    product_type: 'Tools'
  },
  {
    id: 'a5',
    name: 'Makeup Brush Cleaner Kit',
    brand: 'Sigma Beauty',
    description: 'Complete kit for maintaining clean, hygienic brushes',
    price: 2499,
    image_link: '/accessories/brush-cleaner.jpg',
    rating: 4.5,
    product_type: 'Tools'
  },
  {
    id: 'a6',
    name: 'Luxury Makeup Bag',
    brand: 'Charlotte Tilbury',
    description: 'Stylish and spacious makeup storage solution',
    price: 3499,
    image_link: '/accessories/makeup-bag.jpg',
    rating: 4.7,
    product_type: 'Storage'
  },
  {
    id: 'a7',
    name: 'Precision Tweezers Set',
    brand: 'Tweezerman',
    description: 'Professional-grade tweezers for perfect brows',
    price: 1799,
    image_link: '/accessories/tweezers.jpg',
    rating: 4.8,
    product_type: 'Tools'
  },
  {
    id: 'a8',
    name: 'Acrylic Makeup Organizer',
    brand: 'Muji',
    description: 'Clear acrylic storage system for organized beauty',
    price: 2999,
    image_link: '/accessories/organizer.jpg',
    rating: 4.6,
    product_type: 'Storage'
  }
];

export default function AccessoriesPage() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  
  // Breadcrumb data
  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: 'Accessories', path: '/accessories' }
  ];

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
            src="/accessories-banner.jpg"
            alt="Accessories Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-end pr-20">
            <div className="text-right">
              <h1 className="text-6xl font-bold text-white mb-4">
                ELEVATE YOUR
              </h1>
              <h2 className="text-7xl font-extrabold text-white flex items-center">
                BEAUTY <span className="font-script ml-4 text-8xl">tools</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Professional Beauty Tools</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleAccessories.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4"
            >
              <Link href={`/accessories/${product.id}`} passHref>
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