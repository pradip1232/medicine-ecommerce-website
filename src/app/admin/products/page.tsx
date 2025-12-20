import { Suspense } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import AdminProductsScreen from '@/features/admin/screens/AdminProductsScreen'
import Loader from '@/components/Loader'

export const metadata = {
  title: 'Manage Products - Admin Dashboard',
  description: 'Manage products, inventory, and product information.',
}

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <Suspense fallback={<Loader fullScreen text="Loading products..." />}>
        <AdminProductsScreen />
      </Suspense>
    </AdminLayout>
  )
}