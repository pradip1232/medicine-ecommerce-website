'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Product, ProductVariant } from '@/types'
import { useCart } from '@/features/cart/hooks'
import { useAuth } from '@/features/auth/hooks'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { getImageUrl, formatCurrency } from '@/utils/helpers'

const ProductDetailsScreen: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [pinCode, setPinCode] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const searchParams = useSearchParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { isAuthenticated, user } = useAuth()

  const productId = searchParams.get('id')

  // Mock product data - in real app, fetch from API
  const mockProduct: Product = {
    id: '1',
    title: 'Turmeric Powder',
    description: 'Premium quality turmeric powder for cooking and health benefits',
    price: 38,
    image: 'turmeric-power.png',
    category: 'spices',
    rating: 4,
    reviews: 10,
    keyBenefits: [
      'Anti-inflammatory',
      'Rich in Antioxidants',
      'Support Digestive Health',
      'Boost Immunity',
      'Promotes Skin Health',
      'Support Brain Function'
    ],
    selectedTags: ['Organic', 'Natural', 'Ayurvedic', 'Pure'],
    variants: [
      {
        quantity: '100gm',
        price: 50,
        sellingPrice: 38,
        discount: 24,
        productTax: 'included tax'
      },
      {
        quantity: '250gm',
        price: 120,
        sellingPrice: 95,
        discount: 21,
        productTax: 'included tax'
      },
      {
        quantity: '500gm',
        price: 200,
        sellingPrice: 180,
        discount: 10,
        productTax: 'included tax'
      }
    ]
  }

  const productImages = [
    'turmeric-power.png',
    '10 2.png',
    '11 5 (1).webp',
    '10 2.webp'
  ]

  useEffect(() => {
    if (productId) {
      // Simulate API call
      setIsLoading(true)
      setTimeout(() => {
        setProduct(mockProduct)
        if (mockProduct.variants && mockProduct.variants.length > 0) {
          setSelectedVariant(mockProduct.variants[0])
        }
        setIsLoading(false)
      }, 500)
    }
  }, [productId])

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (product && selectedVariant) {
      const checkoutUrl = `/checkout?price=${selectedVariant.sellingPrice}&tax=${encodeURIComponent(selectedVariant.productTax)}`
      router.push(checkoutUrl)
    }
  }

  const handleImageSwap = (index: number) => {
    setSelectedImageIndex(index)
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Button onClick={() => router.push('/products')} variant="primary">
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tags */}
      <div className="mb-6">
        <h6 className="text-sm font-medium mb-2">Tags:</h6>
        <div className="flex flex-wrap gap-2">
          {product.selectedTags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Thumbnail Images */}
          <div className="flex space-x-2 order-2 lg:order-1">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageSwap(index)}
                className={`w-16 h-16 border-2 rounded overflow-hidden ${
                  selectedImageIndex === index ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative border border-gray-200 rounded-lg overflow-hidden order-1 lg:order-2">
            <img
              src={getImageUrl(productImages[selectedImageIndex])}
              alt={product.title}
              className="w-full h-96 object-contain p-4"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating || 0)}
              </div>
              <span className="text-sm text-gray-500">
                {product.reviews} reviews
              </span>
            </div>
          </div>

          {/* Variant Selection */}
          {selectedVariant && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {product.variants?.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border rounded ${
                      selectedVariant === variant
                        ? 'border-green-500 bg-green-50 text-green-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {variant.quantity}
                  </button>
                ))}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500 line-through">
                  M.R.P {formatCurrency(selectedVariant.price)}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-red-600 font-medium">
                    {selectedVariant.discount}% off
                  </span>
                  <span className="text-2xl font-bold text-gray-800">
                    {formatCurrency(selectedVariant.sellingPrice)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{selectedVariant.productTax}</p>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              fullWidth
              className="bg-green-500 hover:bg-green-600"
            >
              ADD TO CART
            </Button>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleBuyNow}
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                BUY NOW
              </Button>
              <button className="p-3 border border-gray-300 rounded hover:bg-gray-50">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Delivery Check */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <Input
                placeholder="Enter delivery pincode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="flex-1"
              />
              <Button variant="primary" size="sm">
                Check
              </Button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="text-center text-sm text-gray-600 mb-4">
            Delivering all across India
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-xs">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-xs">Easy Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">Key Benefits</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {product.keyBenefits?.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-100 px-4 py-2 rounded-lg text-center text-sm"
            >
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-12">
        <div className="flex justify-center space-x-8 mb-6 border-b">
          {['description', 'benefits', 'usage'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-green-500 text-green-600 font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab === 'description' ? 'Product Description' : tab}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {activeTab === 'description' && (
            <p className="text-gray-700 leading-relaxed">
              Our product is a state-of-the-art solution designed to enhance your daily life with unparalleled efficiency and reliability. Crafted from high-quality materials, it ensures durability and longevity, providing exceptional value for your investment. With a sleek design and user-friendly interface, this product seamlessly integrates into any environment, offering both functionality and aesthetic appeal.
            </p>
          )}
          
          {activeTab === 'benefits' && (
            <p className="text-gray-700 leading-relaxed">
              The benefits of using our product are numerous. It boosts productivity by streamlining tasks and minimizing downtime. Its innovative features are designed to adapt to your specific needs, making your operations more efficient. Furthermore, the product's intuitive design ensures a hassle-free user experience, reducing the learning curve and allowing you to achieve optimal results quickly.
            </p>
          )}
          
          {activeTab === 'usage' && (
            <p className="text-gray-700 leading-relaxed">
              To use the product, simply follow these easy steps: first, ensure it is properly assembled and all components are securely in place. Next, activate the device by pressing the power button. Refer to the included manual for specific settings and configurations tailored to your requirements. Regular maintenance, as outlined in the user guide, will ensure the product remains in peak condition, delivering consistent performance over time.
            </p>
          )}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Discover why customers rave about our {product.title}! Here's what they're saying
          </h2>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="sm">
            {product.reviews} Reviews
          </Button>
          <Button variant="primary" size="sm">
            WRITE A REVIEW
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Amandeep Singh', date: 'June 4, 2024', review: 'The best turmeric powder I have ever used. The quality is outstanding.' },
            { name: 'Aditya Sharma', date: 'June 4, 2024', review: 'I love this turmeric powder! It adds such a rich flavor to my dishes.' },
            { name: 'Priya Mehta', date: 'June 3, 2024', review: 'Fantastic product! It has made a noticeable difference in my cooking.' },
            { name: 'Ravi Kumar', date: 'June 2, 2024', review: 'High-quality turmeric powder with great color and aroma. Highly recommend.' },
          ].map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h5 className="font-semibold mb-2">{review.name}</h5>
              <div className="flex mb-2">
                {renderStars(5)}
              </div>
              <p className="text-sm text-gray-600 mb-2">{review.review}</p>
              <p className="text-xs text-gray-500">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsScreen