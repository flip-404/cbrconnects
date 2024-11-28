'use client'

import PromotionList from '@/app/_components/PromotionList'
import Sidebar from '@/app/_components/Sidebar'
import PostList from '@/app/_components/PostList'
import NavsData from '@/mocks/NavsData'
import fetcher from '@/utils/fetcher'
import buildQuery from '@/utils/queryUtils'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import PostPagination from '@/app/_components/PostPagination'
import { useMediaQuery } from '@mui/material'
import MobileSubHeader from '@/app/_components/MobileSubHeader'
import type { NavsDataType } from '@/mocks/NavsData'
import LeftSidebar from '../_components/PostList/LeftSidebar'

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const firstNavItem = NavsData.find((item) => item.href === pathname)!
  const [subCategory, setSubCategory] = useState<null | NavsDataType>(null)
  const [page, setPage] = useState(1)
  const isMobile = useMediaQuery('(max-width:768px)')
  const limit = 10
  const query = buildQuery({
    mainCategoryId: firstNavItem.id.toString(),
    subCategoryId: subCategory === null ? '' : subCategory.id.toString(),
    page: `${page}`,
    limit: `${limit}`,
  })

  const onChangeSubCate = (subCate: null | NavsDataType) => {
    setSubCategory(subCate)
  }

  const { data, isLoading } = useSWR(
    `/api/posts${query ? `?${query}` : ''}`,
    fetcher,
  )
  const { posts, totalCount } = data || { posts: [], totalCount: 0 }

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum)
  }

  return isMobile ? (
    <LayoutWrapper>
      <MobileSubHeader pathname={pathname} />
      <Wrapper>
        <LeftSidebar
          subCategory={subCategory}
          onChangeSubCate={onChangeSubCate}
        />
        <PostList isBusiness posts={posts} isLoading={isLoading} />
      </Wrapper>
      <PostPagination
        curPage={page}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
      />
      <PromotionList />
      {children}
    </LayoutWrapper>
  ) : (
    <LayoutWrapper>
      <BodySection>
        <Wrapper>
          <LeftSidebar
            subCategory={subCategory}
            onChangeSubCate={onChangeSubCate}
          />
          <PostList isBusiness posts={posts} isLoading={isLoading} />
        </Wrapper>
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
  margin-top: 80px;
  display: flex;
  gap: 70px;
  padding-left: 320px;
  padding-bottom: 100px;

  @media (max-width: 768px) {
    display: block;
    margin-top: 118px;
    padding-left: 0;
    padding-bottom: 100px;
  }
`

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 50vw;
`

const Wrapper = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    padding-left: 10px;
  }
`
