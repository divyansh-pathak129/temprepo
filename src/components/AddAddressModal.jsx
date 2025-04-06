'use client';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const AddAddressModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    pincode: '',
    houseNo: '',
    roadName: '',
    name: '',
    phone: '',
    email: '',
    isDefault: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-0 right-0 bottom-0 w-[500px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Add New Address</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <IoMdClose size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address</h3>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  type="text"
                  name="houseNo"
                  placeholder="House/ Flat/ Office No."
                  value={formData.houseNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  type="text"
                  name="roadName"
                  placeholder="Road Name/ Area /Colony"
                  value={formData.roadName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact</h3>
                <p className="text-gray-600 text-sm">
                  Information provided here will be used to contact you for delivery updates
                </p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID (Optional)"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Default Address Toggle */}
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Use as default address</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                </label>
              </div>
            </form>
          </div>

          {/* Footer with Submit Button */}
          <div className="p-6 border-t mt-auto">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-pink-500 text-white py-4 rounded font-medium hover:bg-pink-600 transition-colors text-lg"
            >
              SHIP TO THIS ADDRESS
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddressModal; 