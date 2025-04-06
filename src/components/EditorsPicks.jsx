import Image from 'next/image';
import Link from 'next/link';

const editorPicks = [
  {
    title: "ELEVATED EYE ESSENTIALS",
    image: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800",
    path: "/luxe/elevated-eye-essentials"
  },
  {
    title: "ICONIC BEAUTY",
    image: "https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=800",
    path: "/luxe/iconic-beauty"
  },
  {
    title: "SKINCARE FOR EVERY AGE",
    image: "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=800",
    path: "/luxe/skincare"
  },
  {
    title: "SOFT FOCUS MAKEUP EDIT",
    image: "https://images.pexels.com/photos/2721977/pexels-photo-2721977.jpeg?auto=compress&cs=tinysrgb&w=800",
    path: "/luxe/soft-focus"
  },
  {
    title: "NIGHT ROUTINE",
    image: "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=800",
    path: "/luxe/night-routine"
  },
  {
    title: "ICONIC FRAGRANCE",
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
    path: "/luxe/fragrance"
  }
];

export default function EditorsPicks() {
  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">EDITOR'S PICKS</h2>
      <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
        {editorPicks.map((pick, index) => (
          <Link 
            key={index}
            href={pick.path}
            className="flex-shrink-0 group"
          >
            <div className="relative w-[280px] h-[280px] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={pick.image}
                alt={pick.title}
                fill
                sizes="280px"
                priority={index < 2}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="text-white font-medium text-center text-lg">
                  {pick.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 