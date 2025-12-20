import { NextRequest, NextResponse } from 'next/server'
import { isValidEmail } from '@/utils/helpers'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  isRead: boolean
}

// Mock contact messages storage
let contactMessages: ContactMessage[] = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!subject?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Subject is required' },
        { status: 400 }
      )
    }

    if (!message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Message is required' },
        { status: 400 }
      )
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters long' },
        { status: 400 }
      )
    }

    // Create contact message
    const contactMessage: ContactMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      isRead: false
    }

    // Store message
    contactMessages.push(contactMessage)

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: contactMessage.id
      }
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Admin endpoint to get all contact messages
  return NextResponse.json({
    success: true,
    data: {
      messages: contactMessages.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      totalMessages: contactMessages.length,
      unreadMessages: contactMessages.filter(msg => !msg.isRead).length
    }
  })
}