'use client';

import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import { WishlistProvider } from './context/wishlistContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
} 