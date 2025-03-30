/* eslint-disable consistent-return */

'use client'

import { useMediaQuery } from '@mui/material'
import MobileHeader from '../Mobile/MobileHeader'
import DesktopHeader from '../Desktop/DesktopHeader'

function Header() {
  const isMobile = useMediaQuery('(max-width: 1200px)')
  return !isMobile ? <DesktopHeader /> : <MobileHeader />
}

export default Header
