'use client'

import React from 'react'
import Link from 'next/link'
import { getImageUrl, formatCurrency } from '@/utils/helpers'

const PersonalCareSection: React.FC = () => {
  const personalCareProducts = [
    {
      id: 'pc-1',
      title: 'Aloevera Skin gel',
      description: '80g',
      price: 175,
      image: 'Aloe Vera Skin gel 1.png',
      href: '/product-details?id=pc-1'
    },
    {
      id: 'pc-2',
      title: 'Shine Lotion',
      description: '60g',
      price: 175,
      image: 'Shine Lotion 1.png',
      href: '/product-details?id=pc-2'
    },
    {
      id: 'pc-3',
      title: 'Neem Face Wash Gel',
      description: '80g',
      price: 175,
      image: 'Neam Face Wash 1.png',
      href: '/product-details?id=pc-3'
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Category Header */}
          <div className="md:order-1 order-4 flex justify-center md:justify-start">
            <div className="bg-amber-900 text-white px-6 py-4 rounded-lg text-center md:text-left w-full">
              <h4 className="text-lg md:text-xl font-semibold">Personal care</h4>
            </div>
          </div>

          {/* Products */}
          {personalCareProducts.map((product, index) => (
            <div key={product.id} className={`md:order-${index + 2} order-${index + 1}`}>
              <Link href={product.href} className="group block">
                <div className="text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.title}
                      className="w-full h-48 object-contain bg-gray-50 group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/default-product.png'
                      }}
                    />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-green-600 transition-colors">
                    {product.title} {product.description}
                  </h4>
                  <p className="text-lg font-bold text-gray-800">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PersonalCareSection