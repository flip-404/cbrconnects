'use client'

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
      <SidebarSection>dsadasdas</SidebarSection>
      {children}
      {/* <CenteredContainer> */}
      {/* {firstNavItem.submenu?.length !== 0 ? (
          firstNavItem.submenu!.map((secondNavItem) => (
            <PostList
              key={secondNavItem.id}
              href={secondNavItem.href}
              label={secondNavItem.label}
              displayAll={false}
              mainCategoryLink={{
                href: firstNavItem.href,
                label: firstNavItem.label,
                id: firstNavItem.id,
              }}
              subCategoryLink={{
                href: secondNavItem.href,
                label: secondNavItem.label,
                id: secondNavItem.id,
              }}
            />
          ))
        ) : (
          <PostList
            key={firstNavItem.id}
            href={firstNavItem.href}
            label={firstNavItem.label}
            displayAll
            mainCategoryLink={{
              href: firstNavItem.href,
              label: firstNavItem.label,
              id: firstNavItem.id,
            }}
          />
        )} */}

      {/* {children}
      </CenteredContainer> */}
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  padding-left: 320px;
`

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
`

const SidebarSection = styled.div`
  display: flex;
`

// const CenteredContainer = styled.div`
//   width: 70vw;
//   background-color: white;
//   padding: 40px;
//   border-radius: 25px;
//   box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   justify-items: center;
//   gap: 4rem;
// `
