import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TopBrands = () => {
  const brands = [
    {
      id: 1,
      title: "Sun-proof",
      subtitle: "Your Skin with Our Bestselling Sunscreens",
      offer: "Buy 2 Get 1 Free",
      subOffer: "On Bestsellers",
      image: "/images/sunscreen-products.jpg",
      link: "/sunscreen"
    },
    {
      id: 2,
      title: "Absolut Repair Molecular",
      subtitle: "Repair up to 2 years of damage, in one use.",
      offer: "Up to 10% Off",
      subOffer: "Salon Grade Haircare",
      image: "/images/loreal-products.jpg",
      link: "/shop-now"
    },
    {
      id: 3,
      title: "MAC",
      subtitle: "LET YOUR SHADES DO THE TALKING",
      offer: "3-piece Kit on ₹3500",
      subOffer: "Free Lipstick on ₹4500",
      image: "/images/mac-products.jpg",
      link: "/shop-now"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-orange-500">EXPLORE OUR TOP BRANDS</h2>
        <p className="text-pink-500 text-lg">A-LISTERS TO OBSESS OVER</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div key={brand.id} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 w-full">
              <Image
                src={brand.image}
                alt={brand.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h3 className="text-xl font-semibold">{brand.title}</h3>
              <p className="text-sm mb-2">{brand.subtitle}</p>
              <div className="space-y-1">
                <p className="text-lg font-bold">{brand.offer}</p>
                <p className="text-sm">{brand.subOffer}</p>
              </div>
              
              <Link 
                href={brand.link}
                className="inline-block mt-3 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBrands; 