'use client'

import Sidebar from '@/app/_components/Sidebar'
import styled from 'styled-components'
import { useMediaQuery } from '@mui/material'

export default function FirstDepthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMediaQuery('(max-width:768px)')

  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>
      <BodySection>{children}</BodySection>
      <Sidebar />
    </DesktopLayout>
  )
}

const MobileLayout = styled.div`
  margin-top: 56px;
`

const DesktopLayout = styled.div`
  margin-top: 80px;
  display: flex;
  gap: 70px;
  padding-left: 320px;
  padding-bottom: 100px;
`

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
`
