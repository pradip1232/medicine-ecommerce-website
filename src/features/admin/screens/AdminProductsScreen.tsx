'use client'

import React, { useState, useEffect } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { Product } from '@/types'
import { formatCurrency, getImageUrl } from '@/utils/helpers'

const AdminProductsScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const categories = [
    'All Categories',
    'Healthcare',
    'Personal Care',
    'Hair Care',
    'Oral Care',
    'Skin Care',
    'Beverages',
    'Ayurvedic Medicines'
  ]

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: 'PROD001',
      title: 'Neem Face Wash',
      description: 'Natural neem face wash for clear and healthy skin',
      price: 106,
      image: '12 6.webp',
      category: 'personalcare',
      rating: 4.2,
      reviews: 15,
      keyBenefits: ['Anti-bacterial', 'Deep cleansing'],
      selectedTags: ['Organic', 'Natural'],
    },
    {
      id: 'PROD002',
      title: 'Brahmi Badam Sharbat',
      description: 'Refreshing and nutritious herbal drink',
      price: 194,
      image: 'BRAHMI BADAM SHARBAT 1 (1).webp',
      category: 'beverages',
      rating: 4.4,
      reviews: 25,
      keyBenefits: ['Brain health', 'Memory enhancement'],
      selectedTags: ['Herbal', 'Refreshing'],
    },
    {
      id: 'PROD003',
      title: 'Aloe Vera Skin Gel',
      description: 'Pure aloe vera gel for skin care and healing',
      price: 175,
      image: 'Aloe Vera Skin gel 1.webp',
      category: 'skincare',
      rating: 4.6,
      reviews: 32,
      keyBenefits: ['Skin healing', 'Moisturizing'],
      selectedTags: ['Natural', 'Healing'],
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, products])

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId))
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowAddModal(true)
  }

  const getStatusBadge = (product: Product) => {
    // Mock stock status
    const stock = Math.floor(Math.random() * 100)
    if (stock > 20) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">In Stock</span>
    } else if (stock > 0) {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Low Stock</span>
    } else {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Out of Stock</span>
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Button
          onClick={() => {
            setEditingProduct(null)
            setShowAddModal(true)
          }}
          variant="primary"
          className="bg-amber-900 hover:bg-amber-800"
        >
          Add New Product
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All Categories' ? '' : category}>
                {category}
              </option>
            ))}
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={getImageUrl(product.image)}
                          alt={product.title}
                          onError={(e) => {
                            e.currentTarget.src = '/assets/images/default-product.png'
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(product)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.reviews})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          setEditingProduct(null)
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Product Name"
            placeholder="Enter product name"
            defaultValue={editingProduct?.title || ''}
            fullWidth
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter product description"
              defaultValue={editingProduct?.description || ''}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Price"
              type="number"
              placeholder="0.00"
              defaultValue={editingProduct?.price || ''}
              fullWidth
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                defaultValue={editingProduct?.category || ''}
              >
                <option value="">Select Category</option>
                <option value="healthcare">Healthcare</option>
                <option value="personalcare">Personal Care</option>
                <option value="haircare">Hair Care</option>
                <option value="oralcare">Oral Care</option>
                <option value="skincare">Skin Care</option>
                <option value="beverages">Beverages</option>
                <option value="ayurvedicmedicines">Ayurvedic Medicines</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddModal(false)
                setEditingProduct(null)
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="bg-amber-900 hover:bg-amber-800"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminProductsScreen