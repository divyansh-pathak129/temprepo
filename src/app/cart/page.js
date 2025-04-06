'use client';

import { useCart } from '../context/cartContext';
import Link from 'next/link';
import { getSafeImageSrc } from '@/utils/imageUtils';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (Math.round(item.price * 80)) * item.quantity, 0);
    const tax = subtotal * 0.18;
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + tax).toFixed(2)
    };
  };

  const { subtotal, tax, total } = calculateTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link href="/products">
          <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items - Left Side (70%) */}
          <div className="lg:w-[70%]">
            <div className="bg-white rounded-lg shadow-md">
              {cart.map((item) => (
                <div key={item.id} className="p-6 border-b last:border-b-0">
                  <div className="flex items-center gap-6">
                    <Link href={`/products/${item.id}`} className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image_link ? getSafeImageSrc(item.image_link) : '/images/placeholder.png'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="text-lg font-semibold hover:text-pink-500 cursor-pointer">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                            className="px-3 py-1 border rounded-full hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity || 1}</span>
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="px-3 py-1 border rounded-full hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-lg font-semibold">₹{Math.round(item.price * 80)}</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary - Right Side (30%) */}
          <div className="lg:w-[30%]">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Cart Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold">₹{total}</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">Free shipping on all orders!</p>
                </div>

                <Link href="/checkout">
                  <button
                    className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-colors mt-6"
                  >
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
