'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const luxuryBrands = [
  {
    id: 1,
    name: 'NARS',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80',
    logo: '/nars-logo.png',
    title: 'NOW ON SITE',
    subtitle: 'Discover Best-In-Class Artistry'
  },
  {
    id: 2,
    name: 'YSL',
    image: 'https://images.unsplash.com/photo-1512207128881-1baee87126fb?auto=format&fit=crop&q=80',
    logo: '/ysl-logo.png',
    title: 'LASH CLASH WATERPROOF',
    subtitle: 'YSL Icons'
  },
  {
    id: 3,
    name: 'TOM FORD',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80',
    logo: '/tomford-logo.png',
    title: 'New Launch!',
    subtitle: 'Gifts on all orders!'
  }
];

export default function LuxeBrands() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
      >
        {luxuryBrands.map((brand) => (
          <div
            key={brand.id}
            className="min-w-full flex-shrink-0 snap-center relative"
          >
            <div className="w-full h-[500px] relative">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center w-full px-4">
                <h2 className="text-4xl font-bold text-white mb-3">{brand.title}</h2>
                <p className="text-2xl text-white/90">{brand.subtitle}</p>
                <button className="mt-6 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition-all">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {luxuryBrands.map((brand, index) => (
          <button
            key={brand.id}
            className="w-2 h-2 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  left: window.innerWidth * index,
                  behavior: 'smooth'
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
} 