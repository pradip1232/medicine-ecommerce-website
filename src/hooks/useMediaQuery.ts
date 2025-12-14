'use client'

import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '@/utils/constants'

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    
    // Set initial value
    setMatches(media.matches)

    // Create event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    media.addEventListener('change', listener)

    // Cleanup
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// Predefined breakpoint hooks
export const useIsMobile = (): boolean => {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.MD - 1}px)`)
}

export const useIsTablet = (): boolean => {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px) and (max-width: ${BREAKPOINTS.LG - 1}px)`)
}

export const useIsDesktop = (): boolean => {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)
}

export const useIsSmallScreen = (): boolean => {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.SM - 1}px)`)
}

export const useIsLargeScreen = (): boolean => {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.XL}px)`)
}