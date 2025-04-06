// pages/wishlist.js or /app/wishlist/page.js
'use client';

import { useWishlist } from '../context/wishlistContext'; // Import Wishlist context
import { useCart } from '../context/cartContext';
import Link from 'next/link';
import { getSafeImageSrc } from '@/utils/imageUtils';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist(); // Get wishlist and removeFromWishlist function
  const { addToCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your wishlist is empty!</p>
          <Link href="/products">
            <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4">
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.image_link ? getSafeImageSrc(product.image_link) : '/images/placeholder.png'}
                  alt={product.name}
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold mt-2 hover:text-pink-500 cursor-pointer">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-2 mt-1">{product.description}</p>
              <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
              <p className="text-lg font-bold mt-2">₹{Math.round(product.price * 80)}</p>
              
              <div className="flex justify-center gap-2 mt-4">
                <button
                  className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
