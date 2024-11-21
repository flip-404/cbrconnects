'use client'

import { useMediaQuery } from '@mui/material'
import DesktopMyInfo from './(desktop)/DesktopMyInfo'

function MyInfo() {
  const isMobile = useMediaQuery('(max-width:768px)')

  return isMobile ? <DesktopMyInfo /> : <DesktopMyInfo />
}

export default MyInfo
