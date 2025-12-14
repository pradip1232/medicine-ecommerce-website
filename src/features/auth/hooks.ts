'use client'

import { useState, useEffect, useContext, createContext } from 'react'
import { User, LoginCredentials, RegisterData } from '@/types'
import { authAPI } from '@/utils/api'
import { STORAGE_KEYS } from '@/utils/constants'
import { storage } from '@/utils/helpers'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = storage.get<User | null>(STORAGE_KEYS.USER, null)
    const token = storage.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null)
    
    if (storedUser && token) {
      setUser(storedUser)
    }
    
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const response = await authAPI.login(credentials)
      
      if (response.success && response.user && response.token) {
        setUser(response.user)
        storage.set(STORAGE_KEYS.USER, response.user)
        storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token)
        
        return { success: true, message: 'Login successful' }
      } else {
        return { success: false, message: response.message || 'Login failed' }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true)
      const response = await authAPI.register(data)
      
      if (response.success && response.user && response.token) {
        setUser(response.user)
        storage.set(STORAGE_KEYS.USER, response.user)
        storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token)
        
        return { success: true, message: 'Registration successful' }
      } else {
        return { success: false, message: response.message || 'Registration failed' }
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      storage.remove(STORAGE_KEYS.USER)
      storage.remove(STORAGE_KEYS.AUTH_TOKEN)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      storage.set(STORAGE_KEYS.USER, updatedUser)
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  }
}

export { AuthContext }