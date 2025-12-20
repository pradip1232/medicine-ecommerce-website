import MainLayout from '@/layouts/MainLayout'
import TermsScreen from '@/features/legal/screens/TermsScreen'

export const metadata = {
  title: 'Terms and Conditions - Sanjeevika',
  description: 'Read our terms and conditions for using Sanjeevika products and services.',
}

export default function TermsPage() {
  return (
    <MainLayout>
      <TermsScreen />
    </MainLayout>
  )
}