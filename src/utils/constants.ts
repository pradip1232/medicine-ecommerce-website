// App Constants
export const APP_NAME = 'Sanjeevika'
export const APP_DESCRIPTION = 'Premium Ayurvedic Products for Health & Wellness'

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  PRODUCTS: {
    ALL: '/products',
    BY_ID: '/products/:id',
    BY_CATEGORY: '/products/category/:category',
  },
  USER: {
    PROFILE: '/user/profile',
    ADDRESSES: '/user/addresses',
  },
}

// Product Categories
export const CATEGORIES = {
  HEALTHCARE: 'healthcare',
  PERSONAL_CARE: 'personalcare',
  HAIR_CARE: 'haircare',
  ORAL_CARE: 'oralcare',
  SKIN_CARE: 'skincare',
  AYURVEDIC_MEDICINES: 'ayurvedicmedicines',
  BEVERAGES: 'beverages',
  SEASONAL: 'seasonal',
  SPECIAL_COMBOS: 'specialcombos',
} as const

// Category Labels
export const CATEGORY_LABELS = {
  [CATEGORIES.HEALTHCARE]: 'Health Care',
  [CATEGORIES.PERSONAL_CARE]: 'Personal Care',
  [CATEGORIES.HAIR_CARE]: 'Hair Care',
  [CATEGORIES.ORAL_CARE]: 'Oral Care',
  [CATEGORIES.SKIN_CARE]: 'Skin Care',
  [CATEGORIES.AYURVEDIC_MEDICINES]: 'Ayurvedic Medicines',
  [CATEGORIES.BEVERAGES]: 'Beverages',
  [CATEGORIES.SEASONAL]: 'Seasonal',
  [CATEGORIES.SPECIAL_COMBOS]: 'Special Combos',
}

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/product-details',
  CART: '/my-cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  WISHLIST: '/wishlist',
}

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'shoppingCart',
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  WISHLIST: 'wishlist',
}

// Theme Colors
export const COLORS = {
  PRIMARY: '#77C712',
  SECONDARY: '#482607',
  SUCCESS: '#77C712',
  DANGER: '#dc3545',
  WARNING: '#ffc107',
  INFO: '#17a2b8',
  LIGHT: '#f8f9fa',
  DARK: '#343a40',
}

// Breakpoints (matching Bootstrap)
export const BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
}

// Default Product Images
export const DEFAULT_IMAGES = {
  PRODUCT: '/assets/images/default-product.png',
  USER: '/assets/images/default-user.png',
  CATEGORY: '/assets/images/default-category.png',
}

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  PIN_CODE_REGEX: /^[1-9][0-9]{5}$/,
  MIN_PASSWORD_LENGTH: 6,
}

// Indian States
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
  'Delhi',
  'Puducherry',
  'Ladakh',
  'Jammu and Kashmir',
]