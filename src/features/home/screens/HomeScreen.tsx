'use client'

import React from 'react'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import BestSellers from '../components/BestSellers'
import SeasonalProducts from '../components/SeasonalProducts'
import MasalaBanner from '../components/MasalaBanner'
import CertificationSection from '../components/CertificationSection'
import NewsletterSection from '../components/NewsletterSection'
import AmlaAloeBanner from '../components/AmlaAloeBanner'
import PersonalCareSection from '../components/PersonalCareSection'
import HairCareSection from '../components/HairCareSection'
import NotificationBar from '../components/NotificationBar'

const HomeScreen: React.FC = () => {
  return (
    <>
      <NotificationBar />
      <HeroSection />
      <CategorySection />
      <BestSellers />
      <SeasonalProducts />
      <MasalaBanner />
      <CertificationSection />
      <NewsletterSection />
      <AmlaAloeBanner />
      <PersonalCareSection />
      <HairCareSection />
    </>
  )
}

export default HomeScreen