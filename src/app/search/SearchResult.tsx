'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import Sidebar from '../_components/Sidebar'
import PostList from '../_components/PostList'
import PostPagination from '../_components/PostPagination'

function SearchResult() {
  const params = useSearchParams()
  const searchTerm = params.get('searchTerm')
  const searchType = params.get('searchType')
  const [page, setPage] = useState(1)
  const limit = 10

  const query = new URLSearchParams({
    searchTerm: searchTerm || '',
    searchType: searchType || '',
    page: page.toString(),
    limit: limit.toString(),
  }).toString()

  const { data, isLoading } = useSWR(`/api/search?${query}`, fetcher)
  const { posts, totalCount } = data || { posts: [], totalCount: 0 }

  console.log('posts, totalCount', posts, totalCount)

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum)
  }

  return (
    <LayoutWrapper>
      <BodySection>
        <Title>
          {`'${searchTerm}'`}의 검색결과 <span> {posts.length}</span>
        </Title>
        <PostList posts={posts} isLoading={isLoading} />
        <PostPagination
          curPage={page}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
        />
      </BodySection>

      <Sidebar />
    </LayoutWrapper>
  )
}

export default SearchResult

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

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 800;
  color: #222222;

  span {
    color: #878787;
  }
`
