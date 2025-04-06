'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UPIPayment from '@/components/UPIPayment';
import { useCart } from '@/app/context/cartContext';

export default function PaymentPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const { cart } = useCart();

  // Calculate cart totals
  const calculateTotals = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + tax;
    const savings = cart.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price;
      return total + ((originalPrice - item.price) * (item.quantity || 1));
    }, 0);

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      savings: savings.toFixed(2)
    };
  };

  const { subtotal, tax, total, savings } = calculateTotals();

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      description: 'Google Pay, PhonePe, Paytm & more',
      icon: '/images/upi-icon.svg'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, Rupay & more',
      icon: '/images/card-icon.svg'
    },
    {
      id: 'cod',
      name: 'Cash on delivery',
      description: 'Pay at your doorstep',
      icon: '/images/cod-icon.svg'
    },
    {
      id: 'netbanking',
      name: 'NetBanking',
      description: 'Pay through your favourite bank',
      icon: '/images/bank-icon.svg'
    },
    {
      id: 'giftcard',
      name: 'Gift card',
      description: 'One card for all Nykaa apps',
      icon: '/images/gift-icon.svg'
    },
    {
      id: 'emi',
      name: 'EMI',
      description: 'Easy installments',
      icon: '/images/emi-icon.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white">1</div>
            <span className="ml-2 text-pink-500 font-medium">Sign Up</span>
          </div>
          <div className="flex-1 h-1 mx-4 bg-pink-500"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white">2</div>
            <span className="ml-2 text-pink-500 font-medium">Address</span>
          </div>
          <div className="flex-1 h-1 mx-4 bg-pink-500"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white">3</div>
            <span className="ml-2 text-pink-500 font-medium">Payment</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Payment Methods Section */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-2">Choose payment method</h1>
                <p className="text-gray-600 mb-6">Choose the payment method you prefer</p>

                <div className="flex gap-6">
                  {/* Payment Method Options Sidebar */}
                  <div className="w-1/3">
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedMethod === method.id
                              ? 'border-pink-500 bg-pink-50'
                              : 'border-gray-200 hover:border-pink-200'
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <div className="w-8 h-8 flex-shrink-0">
                            <Image
                              src={method.icon}
                              alt={method.name}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium">{method.name}</h3>
                            <p className="text-xs text-gray-500">{method.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method Content */}
                  <div className="w-2/3">
                    {selectedMethod === 'upi' && <UPIPayment amount={1225} />}
                    {/* Add other payment method components here */}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg sticky top-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Bag</h2>
                  <button className="text-gray-600 flex items-center">
                    {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Cart Items Preview */}
                <div className="mb-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity || 1}</p>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">₹{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Price Details</h2>
                  <div className="text-right">
                    <div className="font-medium">₹{subtotal}</div>
                    <div className="text-sm text-gray-500">Inc. of all taxes</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>

                {savings > 0 && (
                  <div className="bg-green-50 text-green-600 p-3 rounded-md mb-6">
                    You are saving ₹{savings}
                  </div>
                )}

                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Image
                      src="/images/secure.svg"
                      alt="Secure"
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                    <span>Buy authentic products. Pay securely.</span>
                  </div>
                  <div className="flex items-center">
                    <Image
                      src="/images/secure.svg"
                      alt="Returns"
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                    <span>Easy returns and exchange</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 