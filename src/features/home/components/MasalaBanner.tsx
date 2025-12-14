'use client'

import React from 'react'
import { getImageUrl } from '@/utils/helpers'

const MasalaBanner: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative">
        <img
          src={getImageUrl('masla bannerf 1.webp')}
          alt="Sanjeevika Masala Banner"
          className="w-full h-64 md:h-80 lg:h-96 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/assets/images/default-banner.jpg'
          }}
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-8 lg:pr-16">
          <div className="text-right max-w-md">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
              Sanjeevika Masala
            </h1>
            <h6 className="text-sm md:text-base lg:text-lg text-white drop-shadow-lg leading-relaxed">
              Where every pinch narrates a tale of rich, aromatic indulgence in every dish
            </h6>
          </div>
        </div>

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
      </div>
    </section>
  )
}

export default MasalaBanner