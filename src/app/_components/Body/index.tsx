'use client'

import { useMediaQuery } from '@mui/material'
import { ReactNode } from 'react'
import styled from 'styled-components'

function Body({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery('(max-width:768px)')

  return isMobile ? (
    <MobileBody>{children}</MobileBody>
  ) : (
    <DesktopBody>{children}</DesktopBody>
  )
}

export default Body

const MobileBody = styled.div``

const DesktopBody = styled.div`
  width: 100%;
  min-width: 1200px;
  display: flex;
  justify-content: center;
`
