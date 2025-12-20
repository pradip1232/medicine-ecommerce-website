'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth/hooks'
import { useCart } from '@/features/cart/hooks'
import Button from '@/components/Button'
import { Product } from '@/types'
import { getImageUrl, formatCurrency } from '@/utils/helpers'

const WishlistScreen: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Mock wishlist data - in real app, fetch from API
    const mockWishlist: Product[] = [
      {
        id: 'PROD001',
        title: 'Neem Face Wash',
        description: 'Natural neem face wash for clear and healthy skin',
        price: 106,
        image: '12 6.webp',
        category: 'personalcare',
        rating: 4.2,
        reviews: 15,
      },
      {
        id: 'PROD007',
        title: 'Aloe Vera Skin Gel',
        description: 'Pure aloe vera gel for skin care and healing',
        price: 175,
        image: 'Aloe Vera Skin gel 1.webp',
        category: 'skincare',
        rating: 4.6,
        reviews: 32,
      },
      {
        id: 'PROD005',
        title: 'Brahmi Badam Sharbat',
        description: 'Refreshing and nutritious herbal drink',
        price: 194,
        image: 'BRAHMI BADAM SHARBAT 1 (1).webp',
        category: 'beverages',
        rating: 4.4,
        reviews: 25,
      },
    ]

    setTimeout(() => {
      setWishlistItems(mockWishlist)
      setIsLoading(false)
    }, 500)
  }, [isAuthenticated, router])

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId))
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const handleProductClick = (productId: string) => {
    router.push(`/product-details?id=${productId}`)
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

  if (!isAuthenticated) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-8">
                <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-8">Save your favorite products to your wishlist.</p>
              <Button
                onClick={() => router.push('/products')}
                variant="primary"
                size="lg"
                className="bg-green-500 hover:bg-green-600"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">{wishlistItems.length} item(s) in your wishlist</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                  >
                    {/* Product Image */}
                    <div 
                      className="relative h-48 bg-gray-100 cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/assets/images/default-product.png'
                        }}
                      />
                      
                      {/* Remove from Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveFromWishlist(product.id)
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 
                        className="font-semibold text-gray-800 mb-1 cursor-pointer hover:text-green-600 transition-colors"
                        onClick={() => handleProductClick(product.id)}
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

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          variant="primary"
                          size="sm"
                          fullWidth
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Add to Cart
                        </Button>
                        
                        <Button
                          onClick={() => handleProductClick(product.id)}
                          variant="outline"
                          size="sm"
                          fullWidth
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="text-center mt-12">
                <Button
                  onClick={() => router.push('/products')}
                  variant="outline"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default WishlistScreen