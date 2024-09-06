'use client'

import styled from 'styled-components'
import buildQuery from '@/utils/queryUtils'
import fetcher from '@/utils/fetcher'
import { PostWithRelations } from '@/types'
import useSWR from 'swr'
import { useState } from 'react'
import LeftArrowIcon from '@/assets/leftArrow_icon.svg'
import RightArrowIcon from '@/assets/rightArrow_icon.svg'
import PostListItem from './PostListItem'

function TempPostList({
  mainCategory,
  subCategory,
}: {
  mainCategory: string
  subCategory: string
}) {
  const [page, setPage] = useState(1)
  const limit = subCategory !== 'all' ? 10 : 6

  const query = buildQuery({
    mainCategory,
    subCategory: subCategory !== 'all' && subCategory,
    page: `${page}`,
    limit: `${limit}`,
  })

  const { data } = useSWR(`/api/posts${query ? `?${query}` : ''}`, fetcher)
  const { posts, totalCount } = data || { posts: [], totalCount: 0 }

  return (
    <Container>
      {posts?.map((post: PostWithRelations) => (
        <PostListItem key={post.id} post={post} />
      ))}

      {subCategory !== 'all' && (
        <Pagination>
          <PaginationButton
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <LeftArrowIcon />
          </PaginationButton>
          {[...Array(4)].map((_, idx) => {
            const pageNumber = Math.floor((page - 1) / 4) * 4 + idx + 1
            if (Math.floor(totalCount / 10 + 1) >= pageNumber)
              return (
                <PaginationNumber
                  key={pageNumber}
                  type="button"
                  disabled={page === pageNumber}
                  onClick={() => {
                    setPage(pageNumber)
                  }}
                >
                  {pageNumber}
                </PaginationNumber>
              )
          })}

          <PaginationButton
            disabled={page === Math.floor(totalCount / 10 + 1)}
            type="button"
            onClick={() => setPage(page + 1)}
          >
            <RightArrowIcon />
          </PaginationButton>
        </Pagination>
      )}
    </Container>
  )
}

export default TempPostList

const Container = styled.div`
  flex: 1;
  position: relative;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 0px;
  width: 100%;
  height: 500px;
  padding-bottom: 100px;
`
const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`

const PaginationButton = styled.button<{ disabled: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0px;
`

const PaginationNumber = styled.button<{ disabled: boolean }>`
  background: ${(props) => (props.disabled ? '#E8E8E8' : 'transparent')};
  border: transparent;
  border-radius: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: Open Sans;
  font-size: 13px;
  font-weight: 600;
  padding: 3px 8px;
`
