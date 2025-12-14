'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Product } from '@/types'
import { useCart } from '@/features/cart/hooks'
import { useAuth } from '@/features/auth/hooks'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { CATEGORIES, CATEGORY_LABELS } from '@/utils/constants'
import { getImageUrl, formatCurrency } from '@/utils/helpers'

const ProductsScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  
  const searchParams = useSearchParams()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  // Mock products data - in real app, fetch from API
  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Neem Face Wash',
      description: 'Natural neem face wash for clear skin',
      price: 106,
      image: '12 6.webp',
      category: 'personalcare',
      rating: 4,
      reviews: 4,
    },
    {
      id: '2',
      title: 'Arogya Amrit',
      description: 'Herbal tea for immunity boost',
      price: 106,
      image: '11 5 (1).webp',
      category: 'healthcare',
      rating: 4,
      reviews: 4,
    },
    {
      id: '3',
      title: 'Keshwardhna Herbal Shampoo',
      description: 'Natural herbal shampoo for hair care',
      price: 106,
      image: '10 2.webp',
      category: 'haircare',
      rating: 4,
      reviews: 4,
    },
    {
      id: '4',
      title: 'Dant Shuddhi Toothpaste',
      description: 'Ayurvedic toothpaste for oral care',
      price: 106,
      image: 'DANT SHUDDHI.webp',
      category: 'oralcare',
      rating: 4,
      reviews: 4,
    },
    {
      id: '5',
      title: 'Brahmi Badam Sharbat',
      description: 'Refreshing herbal drink 750ml',
      price: 194,
      image: 'BRAHMI BADAM SHARBAT 1 (1).webp',
      category: 'beverages',
      rating: 4,
      reviews: 4,
    },
    {
      id: '6',
      title: 'Kiwi Fruit Juice',
      description: 'Natural kiwi fruit juice 750ml',
      price: 125,
      image: 'KIWI 1.webp',
      category: 'beverages',
      rating: 4,
      reviews: 4,
    },
    {
      id: '7',
      title: 'Aloe Vera Skin Gel',
      description: 'Pure aloe vera gel for skin care',
      price: 175,
      image: 'Aloe Vera Skin gel 1.webp',
      category: 'skincare',
      rating: 4,
      reviews: 4,
    },
    {
      id: '8',
      title: 'Hair Care Oil',
      description: 'Nourishing hair oil for healthy hair',
      price: 175,
      image: 'Hair Care Oil 1.png',
      category: 'haircare',
      rating: 4,
      reviews: 4,
    },
  ]

  const categories = [
    { id: 'healthcare', label: 'Health care' },
    { id: 'healthsupplements', label: 'Health supplements' },
    { id: 'beverages', label: 'Beverages' },
    { id: 'personalcare', label: 'Personal Care' },
    { id: 'haircare', label: 'Hair care' },
    { id: 'oralcare', label: 'Oral Care' },
    { id: 'skincare', label: 'Skin care' },
    { id: 'ayurvedicmedicines', label: 'Ayurvedic Medicines' },
    { id: 'classicmedicines', label: 'Classic Medicines' },
    { id: 'patentmedicines', label: 'Patent Medicines' },
  ]

  useEffect(() => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setIsLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
      filterProducts(category)
    }
  }, [searchParams, products])

  const filterProducts = (category: string) => {
    if (!category) {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(product => product.category === category)
      setFilteredProducts(filtered)
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    filterProducts(categoryId)
    setIsSidebarOpen(false)
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const handleWishlistClick = (productId: string) => {
    if (!isAuthenticated) {
      setShowLoginModal(true)
      return
    }
    // Handle wishlist logic here
    console.log('Add to wishlist:', productId)
  }

  const handleProductClick = (productId: string) => {
    window.location.href = `/product-details?id=${productId}`
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Categories</h2>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden mb-4 px-4 py-2 bg-gray-200 rounded-lg"
      >
        <span className="sr-only">Toggle menu</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className={`md:w-1/4 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleCategoryClick('')}
                className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                  selectedCategory === '' ? 'bg-green-100 text-green-600' : ''
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                    selectedCategory === category.id ? 'bg-green-100 text-green-600' : ''
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4">
          {/* Products Count and Sort */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{filteredProducts.length} products</p>
            <select className="border border-gray-300 rounded px-3 py-2">
              <option>Sort</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
              <option>Name: Z to A</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      variant="primary"
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Add to Cart
                    </Button>
                    
                    <button
                      onClick={() => handleWishlistClick(product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Please Log In"
      >
        <div className="text-center">
          <p className="mb-4">You need to log in to add items to your wishlist.</p>
          <div className="flex space-x-4 justify-center">
            <Button
              onClick={() => setShowLoginModal(false)}
              variant="outline"
            >
              Close
            </Button>
            <Button
              onClick={() => window.location.href = '/login'}
              variant="primary"
            >
              Log In
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProductsScreen