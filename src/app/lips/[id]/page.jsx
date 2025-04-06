"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../../context/cartContext";
import { X } from "lucide-react";
import WriteReviewModal from "@/components/WriteReviewModal";
import { getAllProducts, transformMakeupData } from "@/utils/makeupApi";
import { getSafeImageSrc } from "@/utils/imageUtils";

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
    const fetchProduct = async () => {
      try {
        const data = await getAllProducts();
        const transformedData = transformMakeupData(data);
        const foundProduct = transformedData.find(p => p.id.toString() === params.id);
        
        if (!foundProduct) {
          setError('Product not found');
          return;
        }

        setProduct(foundProduct);
        
        // Generate multiple product images (using the same image for now, but you can replace with actual product images)
        const images = [
          foundProduct.image_link,
          foundProduct.image_link,
          foundProduct.image_link,
          foundProduct.image_link
        ];
        setProductImages(images);
        
        // Get recommended products (same brand or product type)
        const recommended = transformedData
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
        <Link href="/lips" className="text-pink-500 hover:underline mt-4 block">
          Back to Lips
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
            <Link href="/lips" className="text-gray-500 hover:text-pink-600">
              Lips
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
              src={getSafeImageSrc(productImages[selectedImage])}
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
                  src={getSafeImageSrc(image)}
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
          <p className="text-3xl font-bold mb-4">₹{Math.round(product.price * 80)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Color Options if available */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Available Colors:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer"
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

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
              <li>Category: {product.category}</li>
              <li>Product Type: {product.product_type}</li>
              {product.tag_list && product.tag_list.length > 0 && (
                <li>Tags: {product.tag_list.join(', ')}</li>
              )}
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
                <p className="text-sm text-gray-600 mt-1">{product.numReviews} verified ratings</p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="mb-8">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = product.reviews.filter(review => Math.round(review.rating) === star).length;
              const percentage = (count / product.numReviews) * 100;
              return (
                <div key={star} className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2 w-24">
                    <span className="text-sm">{star}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-16">{count} reviews</span>
                </div>
              );
            })}
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.user}</h4>
                        {review.verified && (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-gray-500 text-sm">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.round(review.rating) ? "text-yellow-400" : "text-gray-200"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedProducts.map((rec) => (
              <Link key={rec.id} href={`/lips/${rec.id}`}>
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={getSafeImageSrc(rec.image_link)}
                    alt={rec.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold">{rec.name}</h3>
                  <p className="text-gray-600">{rec.brand}</p>
                  <p className="font-bold mt-2">₹{Math.round(rec.price * 80)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 