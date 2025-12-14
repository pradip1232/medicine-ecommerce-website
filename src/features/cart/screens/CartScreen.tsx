'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../hooks'
import { useAuth } from '@/features/auth/hooks'
import Button from '@/components/Button'
import { formatCurrency } from '@/utils/helpers'

const CartScreen: React.FC = () => {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const shippingCost = 14.00
  const discount = 6.00
  const tax = 0 // Assuming tax is included
  const finalTotal = totalPrice + shippingCost - discount + tax

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: string, productTitle: string) => {
    removeFromCart(productId)
    showNotification(`${productTitle} has been removed from your cart!`, 'success')
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    const checkoutUrl = `/checkout?price=${totalPrice}&tax=included`
    router.push(checkoutUrl)
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">No products in your cart. Please add some products.</p>
          <Button
            onClick={() => router.push('/products')}
            variant="primary"
            size="lg"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center mb-8 text-amber-900">Your Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PRODUCT
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                    PRICE
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QUANTITY
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          <img
                            className="h-16 w-16 object-contain rounded"
                            src={`/assets/images/${item.image}`}
                            alt={item.title}
                            onError={(e) => {
                              e.currentTarget.src = '/assets/images/default-product.png'
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50">
                      <div className="text-lg font-medium text-green-600">
                        {formatCurrency(item.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50 relative">
                      <div className="text-lg font-medium text-green-600">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.title)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>CALCULATED AT CHECKOUT</span>
              </div>
              
              <div className="flex justify-between">
                <span>Total price:</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              
              <div className="flex justify-between text-green-600">
                <span>Tax:</span>
                <span>Included in the price ({formatCurrency(tax)})</span>
              </div>
              
              <div className="flex justify-between text-red-600">
                <span>Discount:</span>
                <span>- {formatCurrency(discount)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping cost:</span>
                <span>+ {formatCurrency(shippingCost)}</span>
              </div>
              
              <hr className="my-4" />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total price:</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              variant="secondary"
              size="lg"
              fullWidth
              className="mt-6 bg-amber-900 hover:bg-amber-800 text-white"
            >
              PROCEED TO CHECKOUT
            </Button>

            <div className="text-center mt-4">
              <button
                onClick={() => router.push('/products')}
                className="text-green-600 hover:text-green-700 text-sm"
              >
                or continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartScreen