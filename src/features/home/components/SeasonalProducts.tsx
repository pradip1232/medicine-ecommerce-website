'use client'

import React, { useState } from 'react'
import { useCart } from '@/features/cart/hooks'
import Button from '@/components/Button'
import { Product } from '@/types'
import { getImageUrl, formatCurrency } from '@/utils/helpers'

const SeasonalProducts: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { addToCart } = useCart()

  const seasonalProducts: Product[] = [
    {
      id: 'seasonal-1',
      title: 'Brahmi Badam Sharbat',
      description: '750ml',
      price: 194,
      image: 'BRAHMI BADAM SHARBAT 1 (1).webp',
      category: 'beverages',
      rating: 4,
      reviews: 4,
    },
    {
      id: 'seasonal-2',
      title: 'Kiwi Fruit Juice',
      description: '750ml',
      price: 125,
      image: 'KIWI 1.webp',
      category: 'beverages',
      rating: 4,
      reviews: 4,
    },
    {
      id: 'seasonal-3',
      title: 'Aloe Vera Skin Gel',
      description: '750ml',
      price: 150,
      image: 'Aloe Vera Skin gel 1.webp',
      category: 'skincare',
      rating: 4,
      reviews: 4,
    },
    {
      id: 'seasonal-4',
      title: 'Summer Cooler',
      description: '500ml',
      price: 120,
      image: 'BRAHMI BADAM SHARBAT 1 (1).webp',
      category: 'beverages',
      rating: 4,
      reviews: 4,
    },
  ]

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ))
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Seasonal Products
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-sm mx-auto">
          {/* Product Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
              <img
                src={getImageUrl(seasonalProducts[currentSlide].image)}
                alt={seasonalProducts[currentSlide].title}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/default-product.png'
                }}
              />
            </div>
            
            <div className="p-6 text-center">
              <h3 className="font-semibold text-gray-800 mb-2">
                {seasonalProducts[currentSlide].title} {seasonalProducts[currentSlide].description}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center justify-center mb-2">
                <div className="flex mr-2">
                  {renderStars(seasonalProducts[currentSlide].rating || 0)}
                </div>
                <span className="text-sm text-gray-500">
                  {seasonalProducts[currentSlide].reviews} reviews
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-4">
                <span className="text-xl font-bold text-gray-800">
                  {formatCurrency(seasonalProducts[currentSlide].price)}
                </span>
              </div>
              
              {/* Add to Cart Button */}
              <Button
                onClick={() => handleAddToCart(seasonalProducts[currentSlide])}
                variant="primary"
                size="sm"
                className="bg-green-500 hover:bg-green-600"
              >
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {seasonalProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-6 h-6 rounded-full transition-colors ${
                  index === currentSlide
                    ? 'bg-gray-400'
                    : 'bg-gray-300 hover:bg-gray-350'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="text-center mt-4 text-sm text-gray-500 md:hidden">
          Swipe to see more products
        </div>
      </div>
    </section>
  )
}

export default SeasonalProducts