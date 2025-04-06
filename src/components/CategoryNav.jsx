"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function CategoryNav() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);

  const categories = [
    {
      name: 'LIPS', 
      path: '/lips',
      subcategories: [
        {
          name: 'Lipstick',
          items: ['Matte Lipstick', 'Liquid Lipstick', 'Lip Crayon', 'Lip Gloss', 'Lip Liner', 'Lip Plumper', 'Lip Tint']
        },
        {
          name: 'Lip Care',
          items: ['Lip Balm', 'Lip Scrub', 'Lip Mask', 'Lip Treatment']
        }
      ]
    },
    {
      name: 'EYES', 
      path: '/eyes',
      subcategories: [
        {
          name: 'Eye Makeup',
          items: ['Kajal', 'Eyeliner', 'Mascara', 'Eye Shadow', 'Eye Brow', 'False Eyelashes']
        },
        {
          name: 'Eye Care',
          items: ['Under Eye Cream', 'Eye Masks', 'Eye Serum']
        }
      ]
    },
    {
      name: 'FACE', 
      path: '/face',
      subcategories: [
        {
          name: 'Face Makeup',
          items: ['Foundation', 'Concealer', 'Compact', 'Blush', 'Bronzer', 'Highlighter', 'Setting Powder']
        },
        {
          name: 'Face Care',
          items: ['Face Primer', 'Setting Spray', 'Makeup Remover', 'BB & CC Cream']
        }
      ]
    },
    {
      name: 'SKINCARE', 
      path: '/skincare',
      subcategories: [
        {
          name: 'Cleansers',
          items: ['Face Wash', 'Cleansing Balm', 'Micellar Water', 'Cleansing Oil']
        },
        {
          name: 'Moisturizers',
          items: ['Face Cream', 'Face Gel', 'Face Oil', 'Night Cream', 'Sunscreen']
        },
        {
          name: 'Treatments',
          items: ['Serum', 'Face Mask', 'Toner', 'Exfoliator', 'Eye Cream']
        }
      ]
    },
    {
      name: 'NAILS', 
      path: '/nails',
      subcategories: [
        {
          name: 'Nail Polish',
          items: ['Regular Polish', 'Gel Polish', 'Matte Polish', 'Top Coat', 'Base Coat']
        },
        {
          name: 'Nail Care',
          items: ['Nail Treatment', 'Cuticle Care', 'Nail Art', 'Nail Tools']
        }
      ]
    },
    { 
      name: 'FRAGRANCE', 
      path: '/fragrance',
      subcategories: [
        {
          name: 'Women',
          items: ['Perfumes', 'Body Mists', 'Deodorants', 'Gift Sets']
        },
        {
          name: 'Men',
          items: ['Perfumes', 'Body Sprays', 'Deodorants', 'Gift Sets']
        }
      ]
    },
    { 
      name: 'ACCESSORIES', 
      path: '/accessories',
      subcategories: [
        {
          name: 'Makeup Tools',
          items: ['Brushes', 'Sponges', 'Eyelash Curlers', 'Tweezers']
        },
        {
          name: 'Storage',
          items: ['Makeup Bags', 'Organizers', 'Travel Cases']
        }
      ]
    },
    { 
      name: 'OFFERS', 
      path: '/offers',
      subcategories: [
        {
          name: 'Discounts',
          items: ['Clearance Sale', 'Bundle Offers', 'Gift Sets', 'Student Discount']
        },
        {
          name: 'Deals',
          items: ['Buy 1 Get 1', 'First Purchase Offers', 'App Only Deals']
        }
      ]
    },
    { 
      name: 'FRESH IN', 
      path: '/fresh-in',
      subcategories: [
        {
          name: 'New Arrivals',
          items: ['Latest Launches', 'Coming Soon', 'Trending Now']
        },
        {
          name: 'Collections',
          items: ['Limited Edition', 'Seasonal Collections', 'Brand Collaborations']
        }
      ]
    }
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <ul className="flex items-center justify-center space-x-12 py-3 px-4">
          {categories.map((category, index) => (
            <li 
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => {
                setHoveredCategory(null);
                setHoveredSubCategory(null);
              }}
            >
              <Link 
                href={category.path}
                className={`text-sm font-semibold tracking-wide hover:text-pink-500 transition-colors ${
                  category.name === 'OFFERS' ? 'text-pink-500' : 'text-gray-800'
                } ${hoveredCategory === category.name ? 'text-pink-500' : ''}`}
              >
                {category.name}
              </Link>
              {hoveredCategory === category.name && category.subcategories && (
                <div className="absolute top-full left-0 bg-white shadow-lg py-4 px-6 min-w-[200px] z-50">
                  <ul className="space-y-3">
                    {category.subcategories.map((subcat, idx) => (
                      <li 
                        key={idx}
                        className="relative"
                        onMouseEnter={() => setHoveredSubCategory(subcat.name)}
                        onMouseLeave={() => setHoveredSubCategory(null)}
                      >
                        <Link 
                          href={`${category.path}/${subcat.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm text-gray-700 hover:text-pink-500 transition-colors block py-1 font-medium"
                        >
                          {subcat.name}
                        </Link>
                        {hoveredSubCategory === subcat.name && (
                          <div className="absolute left-full top-0 bg-white shadow-lg py-4 px-6 min-w-[200px] -mt-4 ml-1">
                            <ul className="space-y-2">
                              {subcat.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link 
                                    href={`${category.path}/${subcat.name.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-sm text-gray-600 hover:text-pink-500 transition-colors block py-1"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
} 