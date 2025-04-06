import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const QuickCheckoutModal = ({ isOpen, onClose, product }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Quick Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoClose size={24} />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex items-start gap-4 mb-6">
          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Select Quantity</label>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">
              -
            </button>
            <span>1</span>
            <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">
              +
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Price (1 items)</span>
            <span>₹399.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (18%)</span>
            <span>₹71.82</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>₹470.82</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => navigate('/checkout/account')}
          className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default QuickCheckoutModal; 