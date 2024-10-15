'use client'

import PromotionList from '@/app/_components/PromotionList'
import Sidebar from '@/app/_components/Sidebar'
import SubCategoryBar from '@/app/_components/SubCategoryBar'
import PostList from '@/app/_components/PostList'
import NavsData, { NavsDataType } from '@/mocks/NavsData'
import fetcher from '@/utils/fetcher'
import buildQuery from '@/utils/queryUtils'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import PostPagination from '@/app/_components/PostPagination'

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
  const [page, setPage] = useState(1)
  const limit = 10

  const query = buildQuery({
    mainCategory: firstNavItem.id,
    subCategory: subCategory === 'all' ? false : subCategory,
    page: `${page}`,
    limit: `${limit}`,
  })

  const { data, isLoading } = useSWR(
    `/api/posts${query ? `?${query}` : ''}`,
    fetcher,
  )
  const { posts, totalCount } = data || { posts: [], totalCount: 0 }

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum)
  }

  return (
    <LayoutWrapper>
      <BodySection>
        <SubCategoryBar
          pathname={pathname}
          subCategory={subCategory}
          changeSubCategory={setSubCategory}
        />
        <PostList posts={posts} isLoading={isLoading} />
        <PostPagination
          curPage={page}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
        />
        <PromotionList />
      </BodySection>
      <Sidebar />
      {children}
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  margin-top: 8px;
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
