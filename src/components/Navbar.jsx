// components/Navbar.js

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Heart, Menu, ShoppingCart, LogOut, User } from 'lucide-react';
import { useCart } from '../app/context/cartContext';
import { useWishlist } from '@/app/context/wishlistContext';
import { useAuth } from '@/app/context/authContext';
import Image from 'next/image';

export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  
  const navItems = [
    { name: 'Categories', path: '/categories' },
    { name: 'Brands', path: '/brands' },
    { name: 'Luxe', path: '/luxe' },
    { name: 'Fashion', path: '/fashion' },
    { name: 'Products', path: '/products' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-12">
            <Link href="/" className="text-xl font-extrabold">
              LOGO
            </Link>
            <ul className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.path} className="text-gray-800 hover:text-pink-500 transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/wishlist" className="text-gray-800 hover:text-pink-500">
              <div className="relative">
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </Link>

            <Link href="/cart" className="text-gray-800 hover:text-pink-500">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center space-x-2 text-gray-800 hover:text-pink-500"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      {user.email}
                    </div>
                    <hr />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-gray-800 hover:text-pink-500 font-medium"
              >
                Sign in
              </Link>
            )}

            <button
              onClick={() => setMenuToggle(!menuToggle)}
              className="md:hidden text-gray-800 hover:text-pink-500"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuToggle && (
          <div className="md:hidden py-4">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    className="block text-gray-800 hover:text-pink-500 transition-colors font-medium"
                    onClick={() => setMenuToggle(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
