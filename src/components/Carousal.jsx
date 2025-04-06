"use client";

import { MoveLeft, MoveRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Carousel() {
  const images = [
    { text: "Extra Discount", Bank: "Axis Bank" },
    { text: "Extra Discount", Bank: "HDFC Bank" },
    { text: "Extra Discount", Bank: "ICICI Bank" },
    { text: "Extra Discount", Bank: "SBI Bank" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w- h-40 overflow-hidden bg-gray-800 text-white flex items-center justify-center my-5 ">
      {/* Slide Content */}
      <div className="text-center transition-all duration-700">
        <h2 className="text-2xl font-bold">{images[currentIndex].text}</h2>
        <p className="text-lg mt-2">Available on {images[currentIndex].Bank}</p>
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 px-3 py-2 rounded-full opacity-60 hover:opacity-100"
      >
        <MoveLeft />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 px-3 py-2 rounded-full opacity-60 hover:opacity-100"
      >
        <MoveRight />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full cursor-pointer ${currentIndex === index ? "bg-white" : "bg-gray-500"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
