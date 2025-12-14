import { Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import CheckoutScreen from '@/features/checkout/screens/CheckoutScreen'
import Loader from '@/components/Loader'

export default function CheckoutPage() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader fullScreen text="Loading checkout..." />}>
        <CheckoutScreen />
      </Suspense>
    </MainLayout>
  )
}