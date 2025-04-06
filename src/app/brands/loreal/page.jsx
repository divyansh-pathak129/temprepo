'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    image: '/brands/loreal-banner.jpg',
    title: 'BEST OF PARISIAN BEAUTY'
  }
  // Add more banners as needed
];

export default function LorealPage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 p-4 text-sm bg-white">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link href="/brands" className="text-gray-500 hover:text-gray-700">
          Brand
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-700">L'Oreal Paris</span>
      </nav>

      {/* Title */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto py-4 px-4">
          <h1 className="text-2xl font-medium text-center">
            Buy L'Oreal Paris Products Online
            <span className="text-gray-500 ml-2">(129)</span>
          </h1>
        </div>
      </div>

      {/* Banner Slider */}
      <div className="max-w-[1200px] mx-auto mt-4 px-4">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentBanner ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}

          {/* Navigation Buttons */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
            <button
              onClick={prevBanner}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Previous banner"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <button
              onClick={nextBanner}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Next banner"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid - To be added later */}
      <div className="max-w-[1200px] mx-auto mt-8 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Product cards will go here */}
        </div>
      </div>
    </div>
  );
} 