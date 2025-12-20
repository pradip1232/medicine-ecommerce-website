'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth/hooks'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { Address } from '@/types'
import { isValidEmail, isValidPhone } from '@/utils/helpers'
import { INDIAN_STATES } from '@/utils/constants'

const ProfileScreen: React.FC = () => {
  const { user, isAuthenticated, updateUser, logout } = useAuth()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showAddressModal, setShowAddressModal] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: '',
  })
  
  const [addresses, setAddresses] = useState<Address[]>([])
  const [newAddress, setNewAddress] = useState<Address>({
    line1: '',
    line2: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
      })
      
      // Mock addresses - in real app, fetch from API
      setAddresses([
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
      ])
    }
  }, [isAuthenticated, user, router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!profileData.name.trim()) {
      setMessage('Name is required')
      return
    }
    
    if (!isValidEmail(profileData.email)) {
      setMessage('Please enter a valid email address')
      return
    }
    
    if (profileData.mobile && !isValidPhone(profileData.mobile)) {
      setMessage('Please enter a valid mobile number')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      updateUser(profileData)
      setMessage('Profile updated successfully!')
    } catch (error) {
      setMessage('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
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

  const handleDeleteAddress = (index: number) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout()
      router.push('/')
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>
          
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'addresses'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'orders'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Orders
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h2>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-md">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      fullWidth
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      fullWidth
                    />

                    <Input
                      label="Mobile Number"
                      type="tel"
                      value={profileData.mobile}
                      onChange={(e) => setProfileData(prev => ({ ...prev, mobile: e.target.value }))}
                      fullWidth
                    />

                    {message && (
                      <div className={`p-3 rounded-md ${
                        message.includes('successfully') 
                          ? 'bg-green-50 text-green-800' 
                          : 'bg-red-50 text-red-800'
                      }`}>
                        {message}
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button
                        type="submit"
                        variant="primary"
                        loading={isLoading}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Update Profile
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">My Addresses</h2>
                    <Button
                      onClick={() => setShowAddressModal(true)}
                      variant="primary"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Add New Address
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="space-y-1 mb-4">
                          <p className="font-medium">{address.line1}</p>
                          {address.line2 && <p className="text-sm text-gray-600">{address.line2}</p>}
                          <p className="text-sm text-gray-600">Landmark: {address.landmark}</p>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state} {address.pinCode}
                          </p>
                          <p className="text-sm text-gray-600">{address.country}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteAddress(index)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">My Orders</h2>
                  
                  <div className="text-center py-12">
                    <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No Orders Yet</h3>
                    <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                    <Button
                      onClick={() => router.push('/products')}
                      variant="primary"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Start Shopping
                    </Button>
                  </div>
                </div>
              )}
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
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleAddAddress}
              className="bg-green-500 hover:bg-green-600"
            >
              Add Address
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProfileScreen