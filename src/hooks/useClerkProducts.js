'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export function useClerkProducts() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      try {
        // Access products from Clerk's public metadata
        const clerkProducts = user.publicMetadata?.products || [];
        setProducts(clerkProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error accessing Clerk products:', err);
        setError(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  return { products, loading, error };
} 