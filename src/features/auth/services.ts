import { LoginCredentials, RegisterData, AuthResponse } from '@/types'
import api from '@/utils/api'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', credentials)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', data)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      // Ignore logout errors, just clear local storage
      console.error('Logout error:', error)
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/refresh')
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token refresh failed')
    }
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed')
    }
  },

  async resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/auth/reset-password', { token, password })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed')
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/auth/change-password', { 
        currentPassword, 
        newPassword 
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password change failed')
    }
  },

  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/auth/verify-email', { token })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Email verification failed')
    }
  },

  async resendVerification(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/auth/resend-verification', { email })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Resend verification failed')
    }
  },
}