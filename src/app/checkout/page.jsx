'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white">1</div>
            <span className="ml-2 text-pink-500 font-medium">Sign Up</span>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div className="w-0 h-full bg-pink-500"></div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">2</div>
            <span className="ml-2 text-gray-500 font-medium">Address</span>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white">3</div>
            <span className="ml-2 text-gray-500 font-medium">Payment</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Account</h1>
          <p className="text-gray-600 mb-8">To place your order now, log into your existing account or signup</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Login Section */}
            <div className="bg-pink-50 rounded-lg p-6">
              <div className="mb-4">
                <div className="h-32 flex items-center justify-center">
                  <Image 
                    src="/images/id-card.svg" 
                    alt="ID Card" 
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">Have an account?</h2>
                <p className="text-gray-600 mb-4">Reward points on every order you place</p>
                <button 
                  onClick={() => router.push('/checkout/login')}
                  className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-colors"
                >
                  Log In
                </button>
              </div>
            </div>

            {/* Sign Up Section */}
            <div className="bg-pink-50 rounded-lg p-6">
              <div className="mb-4">
                <div className="h-32 flex items-center justify-center">
                  <Image 
                    src="/images/new-user.svg" 
                    alt="New User" 
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">New to Nykaa?</h2>
                <p className="text-gray-600 mb-4">Get ₹300 off* on your 1st App Order. Use code NFAPP300</p>
                <button 
                  onClick={() => router.push('/checkout/signup')}
                  className="w-full border-2 border-pink-500 text-pink-500 py-3 rounded-md hover:bg-pink-50 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Guest Checkout Section */}
            <div className="bg-pink-50 rounded-lg p-6">
              <div className="mb-4">
                <div className="h-32 flex items-center justify-center">
                  <Image 
                    src="/images/guest.svg" 
                    alt="Guest" 
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">Checkout as guest?</h2>
                <p className="text-gray-600 mb-4">Offers & Discounts not available for guest user.</p>
                <button 
                  onClick={() => router.push('/checkout/address')}
                  className="w-full border-2 border-pink-500 text-pink-500 py-3 rounded-md hover:bg-pink-50 transition-colors"
                >
                  Continue as guest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 