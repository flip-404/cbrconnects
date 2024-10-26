'use client'

import { useMediaQuery } from '@mui/material'
import DesktopFooter from './(desktop)'
import MobileFooter from './(mobile)'

function Footer() {
  const isMobile = useMediaQuery('(max-width:768px)')

  return !isMobile ? <DesktopFooter /> : <MobileFooter />
}
export default Footer
