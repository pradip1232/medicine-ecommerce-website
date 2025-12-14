import axios from 'axios'
import { AuthResponse, LoginCredentials, RegisterData, ApiResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },
}

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/products')
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  getByCategory: async (category: string) => {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  },
}

// Cart API (using localStorage for now)
export const cartAPI = {
  getCart: () => {
    const cart = localStorage.getItem('shoppingCart')
    return cart ? JSON.parse(cart) : []
  },

  addToCart: (product: any) => {
    const cart = cartAPI.getCart()
    const existingItem = cart.find((item: any) => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('shoppingCart', JSON.stringify(cart))
    return cart
  },

  removeFromCart: (productId: string) => {
    const cart = cartAPI.getCart()
    const updatedCart = cart.filter((item: any) => item.id !== productId)
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart))
    return updatedCart
  },

  updateQuantity: (productId: string, quantity: number) => {
    const cart = cartAPI.getCart()
    const item = cart.find((item: any) => item.id === productId)
    
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
    
    localStorage.setItem('shoppingCart', JSON.stringify(cart))
    return cart
  },

  clearCart: () => {
    localStorage.removeItem('shoppingCart')
    return []
  },
}

export default api