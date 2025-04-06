'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiHeart, FiShoppingBag, FiCheck } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

const products = [
  {
    id: 1,
    name: "Dr. Sheth's Tea Tree & Lactic Acid Body Lotion Provides",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/0/b/0b49395drshe00000017_1.jpg",
    price: 299,
    tag: "BESTSELLER"
  },
  {
    id: 2,
    name: "Mamaearth Creamy Matte Long Stay Lipstick",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/5/3/53cad778904417306634_1.jpg",
    price: 399
  },
  {
    id: 3,
    name: "Mamaearth Onion Shampoo For Hair Growth & Hair Fall Control",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/8/9/8904417300266_1.jpg",
    price: 349
  }
];

export default function SunscreenPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState({});
  const [notification, setNotification] = useState({ show: false, productId: null });

  const toggleWishlist = (productId) => {
    setWishlist(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleAddToBag = (product) => {
    addToCart(product);
    setNotification({ show: true, productId: product.id });
    
    // Hide notification and navigate to cart after 1 second
    setTimeout(() => {
      setNotification({ show: false, productId: null });
      router.push('/cart');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Products Section */}
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            {/* Product Image */}
            <div className="relative h-64 mb-4">
              {product.tag && (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-sm rounded">
                  {product.tag}
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                unoptimized={true}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="font-medium text-lg line-clamp-2">{product.name}</h3>
              
              <div className="flex items-center gap-2">
                <span className="font-bold">₹{product.price}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex gap-2">
                <button 
                  onClick={() => handleAddToBag(product)}
                  className={`flex-1 relative flex items-center justify-center gap-2 py-2 px-4 rounded transition-colors ${
                    notification.show && notification.productId === product.id
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-pink-500 hover:bg-pink-600'
                  } text-white text-center`}
                >
                  {notification.show && notification.productId === product.id ? (
                    <>
                      <FiCheck className="w-5 h-5" />
                      Added to Bag
                    </>
                  ) : (
                    <>
                      <FiShoppingBag className="w-5 h-5" />
                      Add to Bag
                    </>
                  )}
                </button>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-10 flex items-center justify-center rounded transition-colors ${wishlist[product.id] ? 'bg-pink-50' : 'bg-gray-100 hover:bg-gray-200'}`}
                  aria-label="Add to Wishlist"
                >
                  {wishlist[product.id] ? (
                    <FaHeart className="w-5 h-5 text-pink-500" />
                  ) : (
                    <FiHeart className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 