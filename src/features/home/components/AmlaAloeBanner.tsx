'use client'

import React from 'react'
import Button from '@/components/Button'
import { getImageUrl } from '@/utils/helpers'

const AmlaAloeBanner: React.FC = () => {
  const handleShopNow = () => {
    window.location.href = '/products?category=beverages'
  }

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative">
        <img
          src={getImageUrl('amla juice 1.png')}
          alt="Amla and Aloe Vera Juice"
          className="w-full h-64 md:h-80 lg:h-96 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/assets/images/default-banner.jpg'
          }}
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8">
          {/* Top Content */}
          <div className="text-left max-w-lg">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
              The Wholesome blend of
            </h3>
            <h6 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700">
              Amla and Aloe Vera juice
            </h6>
          </div>
          
          {/* Bottom Content */}
          <div className="text-left max-w-md">
            <h6 className="text-sm md:text-base lg:text-lg text-gray-700 mb-4 font-medium">
              Your natural elixir for vitality and well-being
            </h6>
            <Button
              onClick={handleShopNow}
              variant="primary"
              size="md"
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2"
            >
              Shop now
            </Button>
          </div>
        </div>

        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-white/10" />
      </div>
    </section>
  )
}

export default AmlaAloeBanner