'use client'

import { useState, useEffect, useContext, createContext } from 'react'
import { CartItem, Product } from '@/types'
import { STORAGE_KEYS } from '@/utils/constants'
import { storage, getCartTotal, getCartItemCount } from '@/utils/helpers'

interface CartContextType {
  items: CartItem[]
  totalPrice: number
  itemCount: number
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
  getItemQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const useCartProvider = (): CartContextType => {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = storage.get<CartItem[]>(STORAGE_KEYS.CART, [])
    setItems(savedCart)
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    storage.set(STORAGE_KEYS.CART, items)
  }, [items])

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity }]
      }
    })

    // Show notification (you can implement a notification system)
    if (typeof window !== 'undefined') {
      // Dispatch custom event for notification
      window.dispatchEvent(new CustomEvent('cart-updated', {
        detail: { 
          type: 'add',
          product: product.title,
          quantity 
        }
      }))
    }
  }

  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId)
      const updatedItems = prevItems.filter(item => item.id !== productId)
      
      // Show notification
      if (typeof window !== 'undefined' && itemToRemove) {
        window.dispatchEvent(new CustomEvent('cart-updated', {
          detail: { 
            type: 'remove',
            product: itemToRemove.title
          }
        }))
      }
      
      return updatedItems
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    
    // Show notification
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cart-updated', {
        detail: { 
          type: 'clear'
        }
      }))
    }
  }

  const isInCart = (productId: string): boolean => {
    return items.some(item => item.id === productId)
  }

  const getItemQuantity = (productId: string): number => {
    const item = items.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const totalPrice = getCartTotal(items)
  const itemCount = getCartItemCount(items)

  return {
    items,
    totalPrice,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  }
}

export { CartContext }