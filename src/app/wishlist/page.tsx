import MainLayout from '@/layouts/MainLayout'
import WishlistScreen from '@/features/wishlist/screens/WishlistScreen'

export const metadata = {
  title: 'My Wishlist - Sanjeevika',
  description: 'View and manage your favorite Ayurvedic products.',
}

export default function WishlistPage() {
  return (
    <MainLayout>
      <WishlistScreen />
    </MainLayout>
  )
}