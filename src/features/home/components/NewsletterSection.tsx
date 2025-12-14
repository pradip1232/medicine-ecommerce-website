'use client'

import React, { useState } from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { isValidEmail } from '@/utils/helpers'

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      return
    }
    
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setMessage('')

    // Simulate API call
    setTimeout(() => {
      setMessage('Thank you for subscribing to our newsletter!')
      setEmail('')
      setIsLoading(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000)
    }, 1000)
  }

  return (
    <section className="py-12 bg-amber-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h6 className="text-xl md:text-2xl font-semibold mb-2">
          Subscribe to our Newsletter
        </h6>
        <p className="text-amber-200 mb-6">
          Get updates right in your inbox
        </p>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 bg-white border-white text-gray-900 placeholder-gray-500"
                fullWidth
              />
            </div>
            <Button
              type="submit"
              loading={isLoading}
              className="h-9 bg-green-500 hover:bg-green-600 text-black font-medium px-6 whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
          
          {message && (
            <div className={`mt-3 p-2 rounded text-sm ${
              message.includes('Thank you') 
                ? 'bg-green-500/20 text-green-100' 
                : 'bg-red-500/20 text-red-100'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection