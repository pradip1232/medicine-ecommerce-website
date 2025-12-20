import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@/types'

// Mock database - same as in products/route.ts
const mockProducts: Product[] = [
  {
    id: 'PROD001',
    title: 'Neem Face Wash',
    description: 'Natural neem face wash for clear and healthy skin',
    price: 106,
    image: '12 6.webp',
    category: 'personalcare',
    rating: 4.2,
    reviews: 15,
    keyBenefits: ['Anti-bacterial', 'Deep cleansing', 'Natural ingredients', 'Suitable for all skin types'],
    selectedTags: ['Organic', 'Natural', 'Ayurvedic', 'Herbal'],
    variants: [
      {
        quantity: '80g',
        price: 120,
        sellingPrice: 106,
        discount: 12,
        productTax: 'included tax'
      }
    ]
  },
  {
    id: 'PROD002',
    title: 'Arogya Amrit Herbal Tea',
    description: 'Immunity boosting herbal tea blend',
    price: 106,
    image: '11 5 (1).webp',
    category: 'healthcare',
    rating: 4.5,
    reviews: 22,
    keyBenefits: ['Boosts immunity', 'Natural antioxidants', 'Stress relief', 'Digestive health'],
    selectedTags: ['Organic', 'Herbal', 'Immunity', 'Natural'],
    variants: [
      {
        quantity: '115g',
        price: 120,
        sellingPrice: 106,
        discount: 12,
        productTax: 'included tax'
      }
    ]
  },
  // Add other products here...
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params

    const product = mockProducts.find(p => p.id === productId)

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error('Product details API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product details' },
      { status: 500 }
    )
  }
}