'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Shopping Bag is Empty</h2>
        <p className="text-gray-600 mb-8">Add items to your bag to start shopping</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Bag</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
            <div className="relative w-24 h-24">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain"
                unoptimized={true}
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <FiMinus className="w-5 h-5" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>

            <div className="text-right">
              <p className="font-bold">₹{item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600 mt-1"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-lg shadow-md p-4 mt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total</span>
            <span className="text-2xl font-bold">₹{getCartTotal()}</span>
          </div>
          <button className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-colors mt-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 