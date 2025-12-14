'use client'

import React from 'react'
import Link from 'next/link'
import { getImageUrl, formatCurrency } from '@/utils/helpers'

const HairCareSection: React.FC = () => {
  const hairCareProducts = [
    {
      id: 'hc-1',
      title: 'Hair Care Oil',
      description: '100ml',
      price: 175,
      image: 'Hair Care Oil 1.png',
      href: '/product-details?id=hc-1'
    },
    {
      id: 'hc-2',
      title: 'Herbal Hair Oil',
      description: '100ml',
      price: 175,
      image: 'Hair Care Oil 1.png',
      href: '/product-details?id=hc-2'
    },
    {
      id: 'hc-3',
      title: 'Anti Hair Fall Oil',
      description: '100ml',
      price: 175,
      image: 'Anti Hair Fall Oil 1.png',
      href: '/product-details?id=hc-3'
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Products */}
          {hairCareProducts.map((product, index) => (
            <div key={product.id} className={`order-${index + 1}`}>
              <Link href={product.href} className="group block">
                <div className="text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.title}
                      className="w-full h-48 object-contain bg-white group-hover:scale-110 transition-transform duration-300"
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

          {/* Category Header */}
          <div className="order-4 flex justify-center md:justify-end">
            <div className="bg-amber-900 text-white px-6 py-4 rounded-lg text-center md:text-right w-full">
              <h4 className="text-lg md:text-xl font-semibold">Hair care</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HairCareSection