"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../../context/cartContext";
import { X } from "lucide-react";
import WriteReviewModal from "@/components/WriteReviewModal";

// Sample accessories products (same as in the main page)
const sampleAccessories = [
  {
    id: 'a1',
    name: 'Pro Makeup Brush Set',
    brand: 'MAC',
    description: 'Professional 12-piece brush set for flawless application',
    price: 4999,
    image_link: '/accessories/mac-brush-set.jpg',
    rating: 4.8,
    product_type: 'Brushes'
  },
  {
    id: 'a2',
    name: 'Beauty Blender Original',
    brand: 'Beauty Blender',
    description: 'The ultimate makeup sponge for a flawless finish',
    price: 1599,
    image_link: '/accessories/beauty-blender.jpg',
    rating: 4.9,
    product_type: 'Sponge'
  },
  {
    id: 'a3',
    name: 'Luxury Vanity Mirror',
    brand: 'Impressions Vanity',
    description: 'LED-lighted vanity mirror with 3x magnification',
    price: 7999,
    image_link: '/accessories/vanity-mirror.jpg',
    rating: 4.7,
    product_type: 'Tools'
  },
  {
    id: 'a4',
    name: 'Professional Eyelash Curler',
    brand: 'Shiseido',
    description: 'Ergonomic design for perfect curl every time',
    price: 1999,
    image_link: '/accessories/eyelash-curler.jpg',
    rating: 4.6,
    product_type: 'Tools'
  },
  {
    id: 'a5',
    name: 'Makeup Brush Cleaner Kit',
    brand: 'Sigma Beauty',
    description: 'Complete kit for maintaining clean, hygienic brushes',
    price: 2499,
    image_link: '/accessories/brush-cleaner.jpg',
    rating: 4.5,
    product_type: 'Tools'
  },
  {
    id: 'a6',
    name: 'Luxury Makeup Bag',
    brand: 'Charlotte Tilbury',
    description: 'Stylish and spacious makeup storage solution',
    price: 3499,
    image_link: '/accessories/makeup-bag.jpg',
    rating: 4.7,
    product_type: 'Storage'
  },
  {
    id: 'a7',
    name: 'Precision Tweezers Set',
    brand: 'Tweezerman',
    description: 'Professional-grade tweezers for perfect brows',
    price: 1799,
    image_link: '/accessories/tweezers.jpg',
    rating: 4.8,
    product_type: 'Tools'
  },
  {
    id: 'a8',
    name: 'Acrylic Makeup Organizer',
    brand: 'Muji',
    description: 'Clear acrylic storage system for organized beauty',
    price: 2999,
    image_link: '/accessories/organizer.jpg',
    rating: 4.6,
    product_type: 'Storage'
  }
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const foundProduct = sampleAccessories.find(p => p.id === params.id);
        
        if (!foundProduct) {
          setError('Product not found');
          return;
        }

        setProduct(foundProduct);
        
        // Generate multiple product images
        const images = [
          foundProduct.image_link,
          foundProduct.image_link,
          foundProduct.image_link,
          foundProduct.image_link
        ];
        setProductImages(images);
        
        // Get recommended products (same brand or product type)
        const recommended = sampleAccessories
          .filter(p => (p.brand === foundProduct.brand || p.product_type === foundProduct.product_type) && p.id !== foundProduct.id)
          .slice(0, 3);
        setRecommendedProducts(recommended);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    router.push('/checkout');
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">{error || 'Product not found'}</p>
        <Link href="/accessories" className="text-pink-500 hover:underline mt-4 block">
          Back to Accessories
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-pink-600">
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-400 mx-2">/</span>
          </li>
          <li>
            <Link href="/accessories" className="text-gray-500 hover:text-pink-600">
              Accessories
            </Link>
          </li>
          <li>
            <span className="text-gray-400 mx-2">/</span>
          </li>
          <li>
            <span className="text-pink-600 font-medium">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
            <img
              src={productImages[selectedImage]}
              alt={`${product.name} view ${selectedImage + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-pink-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.brand}</p>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-2xl ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.rating} out of 5</span>
          </div>
          <p className="text-3xl font-bold mb-4">₹{product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => handleQuantityChange('decrease')}
              className="px-3 py-1 border rounded-l"
            >
              -
            </button>
            <span className="px-4 py-1 border-t border-b">{quantity}</span>
            <button
              onClick={() => handleQuantityChange('increase')}
              className="px-3 py-1 border rounded-r"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => addToCart({ ...product, quantity })}
              className="flex-1 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
            >
              Add to Bag
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900"
            >
              Buy Now
            </button>
          </div>

          {/* Product Features */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-2">Product Details:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Brand: {product.brand}</li>
              <li>Category: Accessories</li>
              <li>Product Type: {product.product_type}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews and Ratings Section */}
      <div className="mt-16 border-t pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Ratings & Reviews</h2>
            <div className="flex items-center gap-6">
              <div className="bg-gray-50 px-6 py-3 rounded-xl text-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-pink-600">{product.rating}</span>
                  <span className="text-pink-600">/5</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">verified ratings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedProducts.map((rec) => (
              <Link key={rec.id} href={`/accessories/${rec.id}`}>
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={rec.image_link}
                    alt={rec.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold">{rec.name}</h3>
                  <p className="text-gray-600">{rec.brand}</p>
                  <p className="font-bold mt-2">₹{rec.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 