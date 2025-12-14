'use client'

import React from 'react'
import { getImageUrl } from '@/utils/helpers'

const CertificationSection: React.FC = () => {
  const certifications = [
    {
      icon: 'Icon (4).webp',
      title: 'GMP CERTIFIED',
      alt: 'GMP Certified'
    },
    {
      icon: 'Icon (2).webp',
      title: 'GLUTEN FREE',
      alt: 'Gluten Free'
    },
    {
      icon: 'Icon (3).webp',
      title: 'BEST IN QUALITY',
      alt: 'Best in Quality'
    },
    {
      icon: 'Icon (1).webp',
      title: 'NO EXTRACTS USED',
      alt: 'No Extracts Used'
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                <img
                  src={getImageUrl(cert.icon)}
                  alt={cert.alt}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/default-icon.png'
                  }}
                />
              </div>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-xs md:text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-default min-w-[120px] md:min-w-[140px]">
                {cert.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertificationSection