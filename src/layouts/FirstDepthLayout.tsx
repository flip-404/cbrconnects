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
      <Container>
        <FixedPostList href="/posts" label="공지사항" />
        <FixedPostList href="/posts" label="최근 게시물" />
      </Container>
      <CenteredContainer>
        {firstNavItem.submenu?.length !== 0 ? (
          firstNavItem.submenu!.map((secondNavItem) => (
            <PostList
              key={secondNavItem.id}
              href={secondNavItem.href}
              label={secondNavItem.label}
              data={[]}
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
            data={[]}
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 1100px;
  justify-items: center;
  align-items: center;
  gap: 20px;
`
