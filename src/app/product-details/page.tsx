import { Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import ProductDetailsScreen from '@/features/products/screens/ProductDetailsScreen'
import Loader from '@/components/Loader'

export default function ProductDetailsPage() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader fullScreen text="Loading product details..." />}>
        <ProductDetailsScreen />
      </Suspense>
    </MainLayout>
  )
}