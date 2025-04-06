"use client";
import { useRef } from "react";
import Cards from "./Cards";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Offer() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
      >
        <div className="flex space-x-5 py-7 px-5 w-full">
          {[
            { title: "Offer 1", description: "Get 50% off on your first purchase!", img: "/hero.webp" },
            { title: "Offer 2", description: "Buy 1 Get 1 Free on selected items!", img: "/hero.webp" },
            { title: "Offer 3", description: "Limited time deal: 30% off on skincare!", img: "/hero.webp" },
            { title: "Offer 4", description: "Exclusive: Flat 40% off on Luxe products!", img: "/hero.webp" },
            { title: "Offer 5", description: "Hurry! Free shipping on orders above $50!", img: "/hero.webp" },
          ].map((offer, index) => (
            <div key={index} className="w-full sm:w-[300px] flex-shrink-0 snap-center">
              <Cards {...offer} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow-md hover:bg-pink-600 z-10 hidden md:block"
        onClick={scrollLeft}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-3 rounded-full shadow-md hover:bg-pink-600 z-10 hidden md:block"
        onClick={scrollRight}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
