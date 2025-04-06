import React from "react";

const Items = () => {
  const beautyItems = [
    "Makeup",
    "Skincare",
    "Haircare",
    "Bath & Body",
    "Luxe",
    "Fragrances",
  ];

  return (
    <div className="p-5">
      {/* Enable horizontal scrolling on small screens */}
      <div className="flex justify-center sm:justify-around gap-4 sm:gap-10 flex-wrap sm:flex-nowrap overflow-x-auto sm:overflow-visible scrollbar-hide">
        {beautyItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-2 w-24 h-24 sm:w-14 sm:h-14 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full border text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center hover:opacity-100 text-white transition-all bg-pink-400 opacity-60 hover:scale-105 duration-500"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
