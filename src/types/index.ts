// Product Types
export interface Product {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
  sku?: string
  quantity?: number
  reviews?: number
  rating?: number
  variants?: ProductVariant[]
  keyBenefits?: string[]
  selectedTags?: string[]
}

export interface ProductVariant {
  quantity: string
  price: number
  sellingPrice: number
  discount: number
  productTax: string
}

// User Types
export interface User {
  id: string
  name: string
  email: string
  mobile: string
  state?: string
  country?: string
  addresses?: Address[]
}

export interface Address {
  line1: string
  line2?: string
  landmark: string
  city: string
  state: string
  pinCode: string
  country: string
}

// Cart Types
export interface CartItem extends Product {
  quantity: number
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  mobile: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

// Checkout Types
export interface CheckoutData {
  user: User
  items: CartItem[]
  selectedAddress: Address
  totalPrice: number
  tax: number
  discount: number
  shippingCost: number
}

// Category Types
export interface Category {
  id: string
  name: string
  image: string
  slug: string
}