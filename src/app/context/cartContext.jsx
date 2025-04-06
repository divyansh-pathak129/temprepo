"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // Load cart from localStorage on initial render and when user changes
  useEffect(() => {
    const loadCart = () => {
      const key = user ? `cart_${user.uid}` : 'cart_guest';
      const savedCart = localStorage.getItem(key);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]); // Reset cart if no saved data
      }
    };

    loadCart();
  }, [user]); // Reload when user changes

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const key = user ? `cart_${user.uid}` : 'cart_guest';
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, user]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        // If product exists, increment quantity
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // If product doesn't exist, add it with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
