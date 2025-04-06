import Image from "next/image";

export default function Cards({ title, description, img }) {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white w-full sm:w-[300px] flex-shrink-0 snap-center">
      <div className="relative w-full h-48">
        <Image 
          src={img} 
          alt={title} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-t-lg"
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-pink-700">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <button className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all">
          Learn More
        </button>
      </div>
    </div>
  );
}
