import { NextRequest, NextResponse } from 'next/server'
import { LoginCredentials, AuthResponse } from '@/types'

// Mock user database - in real app, use a proper database
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // In real app, this would be hashed
    mobile: '9876543210',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    mobile: '9876543211',
  },
]

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = mockUsers.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate mock JWT token (in real app, use proper JWT library)
    const token = `mock-jwt-token-${user.id}-${Date.now()}`

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    
    const response: AuthResponse = {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}