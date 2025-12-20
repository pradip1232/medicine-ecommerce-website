import { Suspense } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import DashboardScreen from '@/features/admin/screens/DashboardScreen'
import Loader from '@/components/Loader'

export const metadata = {
  title: 'Admin Dashboard - Sanjeevika',
  description: 'Admin dashboard for managing products, orders, and customers.',
}

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <Suspense fallback={<Loader fullScreen text="Loading dashboard..." />}>
        <DashboardScreen />
      </Suspense>
    </AdminLayout>
  )
}