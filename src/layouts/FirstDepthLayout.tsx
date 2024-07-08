'use client'

import FixedPostList from '@/app/_components/FixedPostList'
import PostList from '@/app/_components/PostList'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { usePathname } from 'next/navigation'
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

  return (
    <LayoutWrapper>
      <FixedPostList href="/posts" label="공지사항" />
      <CenteredContainer>
        {firstNavItem.submenu?.length !== 0 ? (
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
        )}
        {}
        {children}
      </CenteredContainer>
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  padding-top: 40px;
  background-color: #eff0f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 60vh;
  gap: 40px;
`

const CenteredContainer = styled.div`
  width: 70vw;
  background-color: white;
  padding: 40px;
  border-radius: 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  gap: 4rem;
`
