'use client'

import { marketData } from '@/mocks/PostList'
import FixedPostList from '@/app/_components/FixedPostList'
import PostList from '@/app/_components/PostList'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

export default function SecondDepthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const communityPath = pathname.split('/')[1]
  console.log('pathname', pathname)
  const firstNavItem: NavsDataType = NavsData.find(
    (item) => item.href === `/${communityPath}`,
  )!
  console.log('firstNavItem', firstNavItem)
  const secondNavItem: NavsDataType = firstNavItem.submenu!.find(
    (item) => item.href === pathname,
  )!

  console.log('secondNavItem', secondNavItem)

  return (
    <LayoutWrapper>
      <Container>
        <FixedPostList href="/post" label="공지사항" />
        <FixedPostList href="/post" label="최근 게시물" />
      </Container>
      <CenteredContainer>
        <PostList
          href={secondNavItem?.href}
          label={secondNavItem?.label}
          data={marketData}
          displayAll
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
      </CenteredContainer>
      {children}
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  margin-top: 40px;
`

const Container = styled.div`
  width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  gap: 20px;
`

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1100px;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  gap: 20px;
`
