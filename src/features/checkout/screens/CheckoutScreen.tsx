'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth/hooks'
import { Address } from '@/types'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { formatCurrency } from '@/utils/helpers'
import { INDIAN_STATES } from '@/utils/constants'

const CheckoutScreen: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const [newAddress, setNewAddress] = useState<Address>({
    line1: '',
    line2: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
  })

  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  const price = parseFloat(searchParams.get('price') || '0')
  const taxType = searchParams.get('tax') || ''
  const discount = 6.00
  const shippingCost = 14.00

  // Calculate tax
  const tax = taxType === 'included tax' ? 0 : price * 0.18
  const taxMessage = taxType === 'included tax' ? 'Included in the price' : '18% Tax Applied'
  const totalPrice = price + tax - discount + shippingCost

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Mock addresses - in real app, fetch from API
    const mockAddresses: Address[] = [
      {
        line1: '123 Main Street',
        line2: 'Apartment 4B',
        landmark: 'Near Central Park',
        city: 'New Delhi',
        state: 'Delhi',
        pinCode: '110001',
        country: 'India',
      },
      {
        line1: '456 Oak Avenue',
        line2: '',
        landmark: 'Opposite Metro Station',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400001',
        country: 'India',
      },
    ]
    setAddresses(mockAddresses)
  }, [isAuthenticated, router])

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address)
  }

  const handleAddAddress = () => {
    if (!newAddress.line1 || !newAddress.city || !newAddress.state || !newAddress.pinCode) {
      alert('Please fill in all required fields')
      return
    }

    setAddresses(prev => [...prev, newAddress])
    setNewAddress({
      line1: '',
      line2: '',
      landmark: '',
      city: '',
      state: '',
      pinCode: '',
      country: 'India',
    })
    setShowAddressModal(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedAddress) {
      alert('Please select a delivery address')
      return
    }

    setIsLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      alert('Order placed successfully!')
      router.push('/')
      setIsLoading(false)
    }, 2000)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              {/* User Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={user?.name || ''}
                    readOnly
                    fullWidth
                  />
                  <Input
                    label="Phone"
                    value={user?.mobile || ''}
                    readOnly
                    fullWidth
                  />
                  <Input
                    label="Email"
                    value={user?.email || ''}
                    readOnly
                    fullWidth
                    className="md:col-span-2"
                  />
                </div>
              </div>

              <hr className="my-6" />

              {/* Addresses */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Your Addresses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address, index) => (
                    <div
                      key={index}
                      onClick={() => handleAddressSelect(address)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedAddress === address
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{address.line1}</p>
                        {address.line2 && <p className="text-sm text-gray-600">{address.line2}</p>}
                        <p className="text-sm text-gray-600">Landmark: {address.landmark}</p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.pinCode}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Add New Address Button */}
                  <div
                    onClick={() => setShowAddressModal(true)}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors flex items-center justify-center"
                  >
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <p className="text-sm text-gray-600">Add new address</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message to seller
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Any special instructions..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isLoading}
                  disabled={!selectedAddress}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total price:</span>
                  <span>{formatCurrency(price)}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span>Tax:</span>
                  <span>{taxMessage} ({formatCurrency(tax)})</span>
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
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        title="Add New Address"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Address Line 1"
            value={newAddress.line1}
            onChange={(e) => setNewAddress(prev => ({ ...prev, line1: e.target.value }))}
            required
            fullWidth
          />
          
          <Input
            label="Address Line 2"
            value={newAddress.line2}
            onChange={(e) => setNewAddress(prev => ({ ...prev, line2: e.target.value }))}
            fullWidth
          />
          
          <Input
            label="Landmark"
            value={newAddress.landmark}
            onChange={(e) => setNewAddress(prev => ({ ...prev, landmark: e.target.value }))}
            fullWidth
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              value={newAddress.city}
              onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
              required
              fullWidth
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={newAddress.state}
                onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Choose...</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Pin Code"
              value={newAddress.pinCode}
              onChange={(e) => setNewAddress(prev => ({ ...prev, pinCode: e.target.value }))}
              required
              fullWidth
            />
            
            <Input
              label="Country"
              value={newAddress.country}
              onChange={(e) => setNewAddress(prev => ({ ...prev, country: e.target.value }))}
              required
              fullWidth
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddressModal(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleAddAddress}
              className="bg-green-500 hover:bg-green-600"
            >
              Save Address
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CheckoutScreen