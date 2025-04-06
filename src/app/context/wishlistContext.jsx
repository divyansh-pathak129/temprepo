"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './authContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  // Load wishlist from localStorage on initial render and when user changes
  useEffect(() => {
    const loadWishlist = () => {
      const key = user ? `wishlist_${user.uid}` : 'wishlist_guest';
      const savedWishlist = localStorage.getItem(key);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      } else {
        setWishlist([]); // Reset wishlist if no saved data
      }
    };

    loadWishlist();
  }, [user]); // Reload when user changes

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    const key = user ? `wishlist_${user.uid}` : 'wishlist_guest';
    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyAdded = prevWishlist.some((item) => item.id === product.id);
      
      if (isAlreadyAdded) {
        return prevWishlist; // Return the same list if item exists
      }

      return [...prevWishlist, product]; // Add if not already present
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((product) => product.id !== productId)
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
