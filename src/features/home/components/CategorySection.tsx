'use client'

import React from 'react'
import Link from 'next/link'
import { getImageUrl } from '@/utils/helpers'
import { CATEGORIES, CATEGORY_LABELS } from '@/utils/constants'

const CategorySection: React.FC = () => {
  const categories = [
    {
      id: CATEGORIES.HEALTHCARE,
      name: CATEGORY_LABELS[CATEGORIES.HEALTHCARE],
      image: 'samisha march 3.webp',
      href: `/products?category=${CATEGORIES.HEALTHCARE}`,
    },
    {
      id: CATEGORIES.PERSONAL_CARE,
      name: CATEGORY_LABELS[CATEGORIES.PERSONAL_CARE],
      image: 'samisha march 1.webp',
      href: `/products?category=${CATEGORIES.PERSONAL_CARE}`,
    },
    {
      id: CATEGORIES.AYURVEDIC_MEDICINES,
      name: CATEGORY_LABELS[CATEGORIES.AYURVEDIC_MEDICINES],
      image: 'samisha march 1.webp',
      href: `/products?category=${CATEGORIES.AYURVEDIC_MEDICINES}`,
    },
    {
      id: CATEGORIES.SEASONAL,
      name: CATEGORY_LABELS[CATEGORIES.SEASONAL],
      image: 'samisha march 4.webp',
      href: `/products?category=${CATEGORIES.SEASONAL}`,
    },
    {
      id: CATEGORIES.SPECIAL_COMBOS,
      name: 'Special Combos',
      image: 'samisha march 5 (1).webp',
      href: `/products?category=${CATEGORIES.SPECIAL_COMBOS}`,
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group flex flex-col items-center text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative mb-4 overflow-hidden rounded-full">
                <img
                  src={getImageUrl(category.image)}
                  alt={category.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/default-category.png'
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-full" />
              </div>
              
              <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium group-hover:bg-green-500 group-hover:text-white transition-all duration-300 min-w-[120px]">
                {category.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection