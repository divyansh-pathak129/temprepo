"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishlistContext";
import { Heart } from "lucide-react";
import { getAllProducts, transformMakeupData } from "@/utils/makeupApi";
import { getSafeImageSrc } from "@/utils/imageUtils";

export default function Page() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        
        // Log raw data for debugging
        console.log('Raw Products:', data.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          priceType: typeof p.price,
          brand: p.brand,
          product_type: p.product_type
        })));

        const transformedData = transformMakeupData(data);
        
        // Log transformed data for debugging
        console.log('Transformed Products:', transformedData.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          priceType: typeof p.price,
          brand: p.brand,
          product_type: p.product_type
        })));
        
        setProducts(transformedData);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Cosmetic Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden text-center p-4"
          >
            <Link href={`/products/${product.id}`} passHref>
              <div className="cursor-pointer">
                <img
                  src={getSafeImageSrc(product.image_link)}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <p className="text-lg font-semibold mt-2">{product.name}</p>
              </div>
            </Link>
            <p className="text-gray-600 line-clamp-2">{product.description}</p>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <p className="text-lg font-bold">₹{Math.round(product.price * 80)}</p>

            <div className="flex items-center justify-center mt-2">
              <button
                className="mt-2 bg-pink-500 text-white px-4 py-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add to Bag
              </button>

              <button
                className="ml-2 mt-2 bg-gray-200 p-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  addToWishlist(product);
                }}
              >
                <Heart className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}