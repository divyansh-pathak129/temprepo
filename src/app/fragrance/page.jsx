'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/cartContext';
import { useWishlist } from '../context/wishlistContext';
import { Heart } from 'lucide-react';

// Sample fragrance products
const sampleFragrances = [
  {
    id: 'f1',
    name: 'Chanel N°5',
    brand: 'CHANEL',
    description: 'A floral-aldehydic fragrance for the legendary woman',
    price: 8999,
    image_link: '/fragrances/chanel-5.jpg',
    rating: 4.8,
    product_type: 'Perfume'
  },
  {
    id: 'f2',
    name: 'La Vie Est Belle',
    brand: 'Lancôme',
    description: 'Life is beautiful with iris, jasmine, and orange blossom',
    price: 7499,
    image_link: '/fragrances/lancome-lveb.jpg',
    rating: 4.7,
    product_type: 'Perfume'
  },
  {
    id: 'f3',
    name: 'Black Opium',
    brand: 'Yves Saint Laurent',
    description: 'The seductively intoxicating feminine fragrance',
    price: 8299,
    image_link: '/fragrances/ysl-black-opium.jpg',
    rating: 4.9,
    product_type: 'Perfume'
  },
  {
    id: 'f4',
    name: 'J\'adore',
    brand: 'Dior',
    description: 'A modern, glamorous fragrance that has become a legend',
    price: 9299,
    image_link: '/fragrances/dior-jadore.jpg',
    rating: 4.6,
    product_type: 'Perfume'
  },
  {
    id: 'f5',
    name: 'Good Girl',
    brand: 'Carolina Herrera',
    description: 'It\'s so good to be bad',
    price: 6999,
    image_link: '/fragrances/ch-good-girl.jpg',
    rating: 4.7,
    product_type: 'Perfume'
  },
  {
    id: 'f6',
    name: 'Light Blue',
    brand: 'Dolce & Gabbana',
    description: 'Mediterranean sensuality and freshness',
    price: 5999,
    image_link: '/fragrances/dg-light-blue.jpg',
    rating: 4.5,
    product_type: 'Perfume'
  },
  {
    id: 'f7',
    name: 'Flowerbomb',
    brand: 'Viktor&Rolf',
    description: 'An explosive floral bouquet',
    price: 8799,
    image_link: '/fragrances/vr-flowerbomb.jpg',
    rating: 4.8,
    product_type: 'Perfume'
  },
  {
    id: 'f8',
    name: 'Miss Dior',
    brand: 'Dior',
    description: 'A new era of grace',
    price: 8499,
    image_link: '/fragrances/dior-miss.jpg',
    rating: 4.7,
    product_type: 'Perfume'
  }
];

export default function FragrancePage() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  
  // Breadcrumb data
  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: 'Fragrance', path: '/fragrance' }
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
            src="/fragrance-banner.jpg"
            alt="Fragrance Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-end pr-20">
            <div className="text-right">
              <h1 className="text-6xl font-bold text-white mb-4">
                DISCOVER YOUR
              </h1>
              <h2 className="text-7xl font-extrabold text-white flex items-center">
                SIGNATURE <span className="font-script ml-4 text-8xl">scent</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Luxury Fragrances</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleFragrances.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4"
            >
              <Link href={`/fragrance/${product.id}`} passHref>
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