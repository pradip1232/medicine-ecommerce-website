'use client'

import React from 'react'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import BestSellers from '../components/BestSellers'
import NotificationBar from '../components/NotificationBar'

const HomeScreen: React.FC = () => {
  return (
    <>
      <NotificationBar />
      <HeroSection />
      <CategorySection />
      <BestSellers />
    </>
  )
}

export default HomeScreen