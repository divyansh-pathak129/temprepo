import { Truck, Facebook, Twitter, Instagram, Linkedin, Tags } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Truck className="w-8 h-8 text-yellow-500" />
              <span>FastDelivery</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-sm">
              Delivering happiness at your doorstep with the fastest service in town!
            </p>
          </div>

          {/* Our Services */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Truck className="w-8 h-8 text-blue-500" />
              <span>Our Services</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-sm">
              Trusted by thousands for on-time and secure deliveries across the globe.
            </p>
          </div>

          {/* Brands */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Tags className="h-8 w-8 text-white bg-pink-600 p-1 rounded-full" />
              <span>Top Brands</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-sm">
              Partnering with leading brands to ensure premium delivery experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-yellow-500 transition">Home</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition">Services</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold text-white">Follow Us</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="hover:text-yellow-500 transition"><Facebook size={28} /></a>
              <a href="#" className="hover:text-yellow-500 transition"><Twitter size={28} /></a>
              <a href="#" className="hover:text-yellow-500 transition"><Instagram size={28} /></a>
              <a href="#" className="hover:text-yellow-500 transition"><Linkedin size={28} /></a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">© 2025 FastDelivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
