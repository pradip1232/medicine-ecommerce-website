import MainLayout from '@/layouts/MainLayout'
import BlogScreen from '@/features/blog/screens/BlogScreen'

export const metadata = {
  title: 'Blog - Sanjeevika',
  description: 'Read the latest articles about Ayurveda, health tips, and wellness advice from Sanjeevika experts.',
}

export default function BlogPage() {
  return (
    <MainLayout>
      <BlogScreen />
    </MainLayout>
  )
}