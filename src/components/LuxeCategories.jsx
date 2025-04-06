import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: 'MAKEUP',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80',
    path: '/luxe/makeup'
  },
  {
    name: 'SKIN',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80',
    path: '/luxe/skin'
  },
  {
    name: 'FRAGRANCE',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80',
    path: '/luxe/fragrance'
  },
  {
    name: 'HAIR',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80',
    path: '/luxe/hair'
  },
  {
    name: 'MINIS',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80',
    path: '/luxe/minis'
  },
  {
    name: 'BODY',
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&q=80',
    path: '/luxe/body'
  },
  {
    name: 'APPLIANCES',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80',
    path: '/luxe/appliances'
  },
  {
    name: 'SHOP ALL',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80',
    path: '/luxe/shop-all'
  },
  {
    name: 'NEW LAUNCH',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80',
    path: '/luxe/new-launch'
  }
];

export default function LuxeCategories() {
  return (
    <div className="w-full px-4 py-8">
      <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
        {categories.map((category, index) => (
          <Link 
            key={index}
            href={category.path}
            className="flex-shrink-0 group"
          >
            <div className="relative w-[150px] h-[150px] rounded-lg overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-medium text-center text-sm">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 