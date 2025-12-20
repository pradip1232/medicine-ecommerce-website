import { NextRequest, NextResponse } from 'next/server'
import { isValidEmail } from '@/utils/helpers'

// Mock newsletter subscriptions storage
let newsletterSubscriptions: string[] = []

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    if (newsletterSubscriptions.includes(email.toLowerCase())) {
      return NextResponse.json(
        { success: false, message: 'This email is already subscribed to our newsletter' },
        { status: 409 }
      )
    }

    // Add to subscriptions
    newsletterSubscriptions.push(email.toLowerCase())

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      totalSubscriptions: newsletterSubscriptions.length
    }
  })
}