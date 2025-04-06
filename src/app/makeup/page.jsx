'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MakeupPage() {
  const categories = [
    { name: 'FACE PRIMER', gradient: 'from-[#FFA07A] to-[#FF7F50]' },
    { name: 'FOUNDATION', gradient: 'from-[#40E0D0] to-[#20B2AA]' },
    { name: 'FACE WASH', gradient: 'from-[#FF69B4] to-[#FF1493]' },
    { name: 'TONERS', gradient: 'from-[#FFD700] to-[#FFA500]' },
    { name: 'NEW & NOW', gradient: 'from-[#4169E1] to-[#0000FF]' },
    { name: 'LIP BALM', gradient: 'from-[#90EE90] to-[#32CD32]' },
    { name: 'NIGHT CREAMS', gradient: 'from-[#9370DB] to-[#8A2BE2]' },
    { name: 'MASKS & PEELS', gradient: 'from-[#FFA500] to-[#FF4500]' },
    { name: 'EYE CARE', gradient: 'from-cyan-400 via-cyan-300 to-cyan-200' },
    { name: 'SKIN COMBOS', gradient: 'from-pink-500 via-pink-400 to-pink-300' },
    { name: 'GIFTING', gradient: 'from-yellow-400 via-yellow-300 to-yellow-200' }
  ];

  const brandDeals = [
    {
      brand: 'OBAGI',
      image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=800&auto=format&fit=crop&q=60',
      discount: 'Up To 10% Off',
      description: 'Transformative Skincare'
    },
    {
      brand: 'EPISOFT',
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=60',
      discount: 'Up To 20% Off',
      description: 'On Entire Range'
    },
    {
      brand: 'FIXDERMA',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=60',
      discount: 'Up To 30% Off',
      description: 'On Entire Range'
    },
    {
      brand: 'NYKAA SKIN',
      image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&auto=format&fit=crop&q=60',
      discount: 'Up To 30% Off',
      description: 'On Entire Brand'
    },
    {
      brand: 'SKIN1004',
      image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?w=800&auto=format&fit=crop&q=60',
      discount: 'Up To 15% Off',
      description: 'K-beauty Must Haves'
    }
  ];

  return (
    <div className="w-full">
      {/* Banner Section */}
      <div 
        className="relative w-full h-[300px] animate-gradient bg-gradient"
        style={{
          background: 'linear-gradient(135deg, #FFE4E1, #E6E6FA, #F0FFF0, #FFF0F5, #F0FFFF)',
          backgroundSize: '400% 400%',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 
              className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] via-[#FF1493] to-[#8B00FF]"
            >
              UP TO 50% OFF ON
            </h1>
            <h2 
              className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] via-[#FF1493] to-[#8B00FF]"
            >
              MAKEUP
            </h2>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/makeup/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className={`flex-shrink-0 px-8 py-3 rounded-xl bg-gradient-to-r ${category.gradient} 
                         text-white font-medium text-sm hover:shadow-lg transition-all duration-300
                         whitespace-nowrap`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Deals Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            DEALS AS VIBRANT AS YOU
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {brandDeals.map((deal, index) => (
              <Link 
                href={`/brand/${deal.brand.toLowerCase().replace(/ /g, '-')}`}
                key={index} 
                className="group relative bg-gradient-to-tr from-blue-50 via-pink-50 to-yellow-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 p-6">
                  <div className="relative h-full w-full">
                    <Image
                      src={deal.image}
                      alt={deal.brand}
                      fill
                      className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 text-center">
                  <h3 className="font-bold text-lg mb-1">{deal.brand}</h3>
                  <p className="text-pink-600 font-semibold text-xl mb-1">{deal.discount}</p>
                  <p className="text-gray-600 text-sm">{deal.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}