'use client'

import React from 'react'
import { getImageUrl } from '@/utils/helpers'

const AboutScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-amber-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Sanjeevika
            </h1>
            <p className="text-xl md:text-2xl text-amber-200 leading-relaxed">
              Your trusted partner in Ayurvedic wellness, bringing you the finest natural products 
              for a healthier, more balanced life.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded with a deep respect for ancient Ayurvedic wisdom, Sanjeevika has been 
                    dedicated to bringing you authentic, high-quality natural products that promote 
                    health and wellness.
                  </p>
                  <p>
                    Our journey began with a simple belief: that nature holds the key to optimal 
                    health. We source the finest herbs and natural ingredients, carefully crafting 
                    each product to maintain their therapeutic properties and effectiveness.
                  </p>
                  <p>
                    Today, Sanjeevika stands as a trusted name in Ayurvedic wellness, serving 
                    thousands of customers who have experienced the transformative power of our 
                    natural products.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src={getImageUrl('about-story.jpg')}
                  alt="Our Story"
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/default-about.jpg'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              To make authentic Ayurvedic wellness accessible to everyone, empowering individuals 
              to take charge of their health through the power of nature's finest ingredients.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality First</h3>
                <p className="text-gray-600">
                  We never compromise on quality, ensuring every product meets the highest standards.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Natural Purity</h3>
                <p className="text-gray-600">
                  All our products are made from pure, natural ingredients without harmful chemicals.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Care</h3>
                <p className="text-gray-600">
                  Your wellness journey is our priority, and we're here to support you every step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
              Our Certifications
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <img
                  src={getImageUrl('Icon (4).webp')}
                  alt="GMP Certified"
                  className="w-16 h-16 mx-auto mb-4"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/default-icon.png'
                  }}
                />
                <h3 className="font-semibold text-gray-800">GMP Certified</h3>
              </div>
              
              <div className="text-center">
                <img
                  src={getImageUrl('Icon (2).webp')}
                  alt="Gluten Free"
                  className="w-16 h-16 mx-auto mb-4"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/default-icon.png'
                  }}
                />
                <h3 className="font-semibold text-gray-800">Gluten Free</h3>
              </div>
              
              <div className="text-center">
                <img
                  src={getImageUrl('Icon (3).webp')}
                  alt="Best in Quality"
                  className="w-16 h-16 mx-auto mb-4"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/default-icon.png'
                  }}
                />
                <h3 className="font-semibold text-gray-800">Best in Quality</h3>
              </div>
              
              <div className="text-center">
                <img
                  src={getImageUrl('Icon (1).webp')}
                  alt="No Extracts Used"
                  className="w-16 h-16 mx-auto mb-4"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/default-icon.png'
                  }}
                />
                <h3 className="font-semibold text-gray-800">No Extracts Used</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
              Our Team
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              Our dedicated team of Ayurvedic experts, researchers, and wellness enthusiasts 
              work tirelessly to bring you the best natural products for your health and well-being.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr. Ayurveda Expert</h3>
                <p className="text-gray-600">Chief Ayurvedic Consultant</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Manager</h3>
                <p className="text-gray-600">Product Quality Assurance</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Research Head</h3>
                <p className="text-gray-600">Product Development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Discover our range of authentic Ayurvedic products and experience the difference.
          </p>
          <button
            onClick={() => window.location.href = '/products'}
            className="bg-white text-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default AboutScreen