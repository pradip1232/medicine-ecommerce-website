import { NextRequest, NextResponse } from 'next/server'
import { RegisterData, AuthResponse } from '@/types'

// Mock user database - in real app, use a proper database
let mockUsers = [
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
    const body: RegisterData = await request.json()
    const { name, email, password, mobile } = body

    // Validate input
    if (!name || !email || !password || !mobile) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      password, // In real app, hash the password
      mobile,
    }

    mockUsers.push(newUser)

    // Generate mock JWT token (in real app, use proper JWT library)
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser
    
    const response: AuthResponse = {
      success: true,
      message: 'Registration successful',
      user: userWithoutPassword,
      token,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}