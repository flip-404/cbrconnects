'use client'

import { useMediaQuery } from '@mui/material'
import DesktopHeader from './(desktop)'
import MobileHeader from './(mobile)'

function Header() {
  const isMobile = useMediaQuery('(max-width:768px)')

  return isMobile ? <MobileHeader /> : <DesktopHeader />
}

export default Header
