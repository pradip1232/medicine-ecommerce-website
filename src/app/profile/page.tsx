import { Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import ProfileScreen from '@/features/profile/screens/ProfileScreen'
import Loader from '@/components/Loader'

export const metadata = {
  title: 'My Profile - Sanjeevika',
  description: 'Manage your profile, addresses, and account settings.',
}

export default function ProfilePage() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader fullScreen text="Loading profile..." />}>
        <ProfileScreen />
      </Suspense>
    </MainLayout>
  )
}