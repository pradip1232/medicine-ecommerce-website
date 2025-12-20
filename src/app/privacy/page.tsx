import MainLayout from '@/layouts/MainLayout'
import PrivacyScreen from '@/features/legal/screens/PrivacyScreen'

export const metadata = {
  title: 'Privacy Policy - Sanjeevika',
  description: 'Learn how Sanjeevika collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <MainLayout>
      <PrivacyScreen />
    </MainLayout>
  )
}