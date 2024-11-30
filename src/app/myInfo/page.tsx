'use client'

import { useMediaQuery } from '@mui/material'
import DesktopMyInfo from './(desktop)/DesktopMyInfo'
import MobileMyInfo from './(mobile)/MobileMyInfo'

function MyInfo() {
  const isMobile = useMediaQuery('(max-width:768px)')

  return isMobile ? <MobileMyInfo /> : <DesktopMyInfo />
}

export default MyInfo
