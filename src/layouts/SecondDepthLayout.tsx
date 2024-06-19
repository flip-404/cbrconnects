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
  const firstNavItem: NavsDataType = NavsData.find(
    (item) => item.href === `/${communityPath}`,
  )!

  const secondNavItem: NavsDataType = firstNavItem.submenu!.find(
    (item) => item.href === pathname,
  )!

  return (
    <LayoutWrapper>
      <Container>
        <FixedPostList href="/community/announcement" label="공지사항" />
        <FixedPostList href="/community/announcement" label="최근 게시물" />
      </Container>
      <CenteredContainer>
        <PostList
          href={secondNavItem?.href}
          label={secondNavItem?.label}
          data={marketData}
          displayAll={false}
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
  grid-template-columns: repeat(2, 1fr);
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
