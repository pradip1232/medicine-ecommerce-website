'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/features/cart/hooks'
import Button from '@/components/Button'
import { Product } from '@/types'
import { getImageUrl, formatCurrency } from '@/utils/helpers'

const BestSellers: React.FC = () => {
  const { addToCart } = useCart()

  // Mock data - in real app, this would come from API
  const bestSellers: Product[] = [
    {
      id: '1',
      title: 'Neem Face Wash',
      description: 'Gel 80g',
      price: 106,
      image: '12 6.webp',
      category: 'personalcare',
      rating: 4,
      reviews: 4,
    },
    {
      id: '2',
      title: 'Arogya Amrit',
      description: 'Herbal Tea 115g',
      price: 106,
      image: '11 5 (1).webp',
      category: 'healthcare',
      rating: 4,
      reviews: 4,
    },
    {
      id: '3',
      title: 'Keshwardhna Herbal',
      description: 'Shampoo 200ml',
      price: 106,
      image: '10 2.webp',
      category: 'haircare',
      rating: 4,
      reviews: 4,
    },
    {
      id: '4',
      title: 'Dant Shuddhi',
      description: 'Toothpaste 100gm',
      price: 106,
      image: 'DANT SHUDDHI.webp',
      category: 'oralcare',
      rating: 4,
      reviews: 4,
    },
  ]

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const handleProductClick = (product: Product) => {
    // Navigate to product details
    window.location.href = `/product-details?id=${product.id}`
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-yellow-400 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ))
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <img
              src={getImageUrl('Leaf.png')}
              alt="Leaf"
              className="w-6 h-6 mr-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Best Sellers
            </h2>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Product Image */}
              <div 
                className="relative h-48 bg-gray-100 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={getImageUrl(product.image)}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/default-product.png'
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 
                  className="font-semibold text-gray-800 mb-1 cursor-pointer hover:text-green-600 transition-colors"
                  onClick={() => handleProductClick(product)}
                >
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {renderStars(product.rating || 0)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.reviews} reviews
                  </span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <span className="text-lg font-bold text-gray-800">
                    {formatCurrency(product.price)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="primary"
                  size="sm"
                  fullWidth
                  className="bg-green-500 hover:bg-green-600"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Link */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            View All Products
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BestSellers