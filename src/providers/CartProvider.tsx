'use client'

import React from 'react'
import { CartContext, useCartProvider } from '@/features/cart/hooks'

interface CartProviderProps {
  children: React.ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const cart = useCartProvider()

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}