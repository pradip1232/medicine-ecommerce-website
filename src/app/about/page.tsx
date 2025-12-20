import MainLayout from '@/layouts/MainLayout'
import AboutScreen from '@/features/about/screens/AboutScreen'

export const metadata = {
  title: 'About Us - Sanjeevika',
  description: 'Learn about Sanjeevika\'s journey in providing premium Ayurvedic products for health and wellness.',
}

export default function AboutPage() {
  return (
    <MainLayout>
      <AboutScreen />
    </MainLayout>
  )
}