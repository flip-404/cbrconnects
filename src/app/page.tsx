'use client'

import { useMediaQuery } from '@mui/material'
import DesktopHome from './(home)/(desktop)'
import MobileHome from './(home)/(mobile)'

export default function Home() {
  const isMobile = useMediaQuery('(max-width:768px)')

  return isMobile ? <MobileHome /> : <DesktopHome />
}
