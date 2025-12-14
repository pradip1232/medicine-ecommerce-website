'use client'

import React, { useState, useEffect } from 'react'

const NotificationBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      const { type, product, quantity } = event.detail
      
      let notificationMessage = ''
      
      switch (type) {
        case 'add':
          notificationMessage = `${product} has been added to your cart!`
          break
        case 'remove':
          notificationMessage = `${product} has been removed from your cart!`
          break
        case 'clear':
          notificationMessage = 'Cart has been cleared!'
          break
        default:
          notificationMessage = 'Cart updated!'
      }
      
      setMessage(notificationMessage)
      setIsVisible(true)
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }

    // Listen for cart update events
    window.addEventListener('cart-updated', handleCartUpdate as EventListener)
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate as EventListener)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-green-500 text-white px-4 py-3 text-center transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex-1">
          <span className="text-sm font-medium">{message}</span>
        </div>
        
        <button
          onClick={handleClose}
          className="ml-4 text-white hover:text-gray-200 transition-colors"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default NotificationBar