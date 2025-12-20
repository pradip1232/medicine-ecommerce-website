import MainLayout from '@/layouts/MainLayout'
import ContactScreen from '@/features/contact/screens/ContactScreen'

export const metadata = {
  title: 'Contact Us - Sanjeevika',
  description: 'Get in touch with Sanjeevika for any questions about our Ayurvedic products or wellness solutions.',
}

export default function ContactPage() {
  return (
    <MainLayout>
      <ContactScreen />
    </MainLayout>
  )
}