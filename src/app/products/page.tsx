import { Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import ProductsScreen from '@/features/products/screens/ProductsScreen'
import Loader from '@/components/Loader'

export default function ProductsPage() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader fullScreen text="Loading products..." />}>
        <ProductsScreen />
      </Suspense>
    </MainLayout>
  )
}