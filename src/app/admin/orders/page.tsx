import { Suspense } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import AdminOrdersScreen from '@/features/admin/screens/AdminOrdersScreen'
import Loader from '@/components/Loader'

export const metadata = {
  title: 'Manage Orders - Admin Dashboard',
  description: 'View and manage customer orders, shipping, and order status.',
}

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <Suspense fallback={<Loader fullScreen text="Loading orders..." />}>
        <AdminOrdersScreen />
      </Suspense>
    </AdminLayout>
  )
}