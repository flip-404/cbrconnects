'use client'

import CalendarWidget from '@/app/_components/CalendarWidget'
import NotificationBox from '@/app/_components/NotificationBox'
import PromotionList from '@/app/_components/PromotionList'
import SubCategoryBar from '@/app/_components/SubCategoryBar'
import TempPostList from '@/app/_components/TempPostList'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'

export default function FirstDepthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const firstNavItem: NavsDataType = NavsData.find(
    (item) => item.href === pathname,
  )!
  const [subCategory, setSubCategory] = useState('all')

  return (
    <LayoutWrapper>
      <BodySection>
        <SubCategoryBar
          pathname={pathname}
          subCategory={subCategory}
          changeSubCategory={setSubCategory}
        />
        <TempPostList
          mainCategory={firstNavItem.id}
          subCategory={subCategory}
        />
        <PromotionList />
      </BodySection>
      <SidebarSection>
        <NotificationBox />
        <CalendarWidget />
      </SidebarSection>
      {children}
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 70px;
  padding-left: 320px;
`

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
`

const SidebarSection = styled.div`
  margin-top: 24px;
`
