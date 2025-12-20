import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@/types'

// Mock database - in real app, use actual database
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
  {
    id: 'PROD003',
    title: 'Keshwardhna Herbal Shampoo',
    description: 'Natural herbal shampoo for healthy hair growth',
    price: 106,
    image: '10 2.webp',
    category: 'haircare',
    rating: 4.3,
    reviews: 18,
    keyBenefits: ['Hair growth', 'Anti-dandruff', 'Natural ingredients', 'Chemical-free'],
    selectedTags: ['Herbal', 'Natural', 'Hair care', 'Organic'],
    variants: [
      {
        quantity: '200ml',
        price: 120,
        sellingPrice: 106,
        discount: 12,
        productTax: 'included tax'
      }
    ]
  },
  {
    id: 'PROD004',
    title: 'Dant Shuddhi Toothpaste',
    description: 'Ayurvedic toothpaste for complete oral care',
    price: 106,
    image: 'DANT SHUDDHI.webp',
    category: 'oralcare',
    rating: 4.1,
    reviews: 12,
    keyBenefits: ['Prevents cavities', 'Fresh breath', 'Natural whitening', 'Gum protection'],
    selectedTags: ['Ayurvedic', 'Natural', 'Fluoride-free', 'Herbal'],
    variants: [
      {
        quantity: '100g',
        price: 120,
        sellingPrice: 106,
        discount: 12,
        productTax: 'included tax'
      }
    ]
  },
  {
    id: 'PROD005',
    title: 'Brahmi Badam Sharbat',
    description: 'Refreshing and nutritious herbal drink',
    price: 194,
    image: 'BRAHMI BADAM SHARBAT 1 (1).webp',
    category: 'beverages',
    rating: 4.4,
    reviews: 25,
    keyBenefits: ['Brain health', 'Memory enhancement', 'Natural cooling', 'Nutritious'],
    selectedTags: ['Herbal', 'Refreshing', 'Natural', 'Healthy'],
    variants: [
      {
        quantity: '750ml',
        price: 220,
        sellingPrice: 194,
        discount: 12,
        productTax: 'included tax'
      }
    ]
  },
  {
    id: 'PROD006',
    title: 'Kiwi Fruit Juice',
    description: 'Natural kiwi fruit juice rich in Vitamin C',
    price: 125,
    image: 'KIWI 1.webp',
    category: 'beverages',
    rating: 4.0,
    reviews: 8,
    keyBenefits: ['Rich in Vitamin C', 'Natural antioxidants', 'Refreshing taste', 'Healthy'],
    selectedTags: ['Natural', 'Vitamin C', 'Refreshing', 'Healthy'],
    variants: [
      {
        quantity: '750ml',
        price: 140,
        sellingPrice: 125,
        discount: 11,
        productTax: 'included tax'
      }
    ]
  },
  {
    id: 'PROD007',
    title: 'Aloe Vera Skin Gel',
    description: 'Pure aloe vera gel for skin care and healing',
    price: 175,
    image: 'Aloe Vera Skin gel 1.webp',
    category: 'skincare',
    rating: 4.6,
    reviews: 32,
    keyBenefits: ['Skin healing', 'Moisturizing', 'Anti-inflammatory', 'Natural'],
    selectedTags: ['Natural', 'Healing', 'Moisturizing', 'Pure'],
    variants: [
      {
        quantity: '100g',
        price: 200,
        sellingPrice: 175,
        discount: 13,
        productTax: 'included tax'
      }
    ]
  },
  {
    id: 'PROD008',
    title: 'Hair Care Oil',
    description: 'Nourishing hair oil for healthy and strong hair',
    price: 175,
    image: 'Hair Care Oil 1.png',
    category: 'haircare',
    rating: 4.3,
    reviews: 19,
    keyBenefits: ['Hair nourishment', 'Prevents hair fall', 'Natural ingredients', 'Strengthens hair'],
    selectedTags: ['Natural', 'Nourishing', 'Hair care', 'Herbal'],
    variants: [
      {
        quantity: '100ml',
        price: 200,
        sellingPrice: 175,
        discount: 13,
        productTax: 'included tax'
      }
    ]
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let filteredProducts = [...mockProducts]

    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.selectedTags?.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // Apply pagination
    const paginatedProducts = filteredProducts.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        total: filteredProducts.length,
        limit,
        offset,
        hasMore: offset + limit < filteredProducts.length
      }
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}