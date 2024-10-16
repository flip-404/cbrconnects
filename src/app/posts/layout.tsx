'use client'

import Sidebar from '@/app/_components/Sidebar'
import styled from 'styled-components'

export default function FirstDepthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutWrapper>
      <BodySection>{children}</BodySection>
      <Sidebar />
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
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
