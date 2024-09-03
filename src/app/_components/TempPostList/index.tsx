'use client'

import styled from 'styled-components'
import buildQuery from '@/utils/queryUtils'
import fetcher from '@/utils/fetcher'
import { PostWithRelations } from '@/types'
import useSWR from 'swr'
import { useState } from 'react'
import PostListItem from './PostListItem'
import LeftArrowIcon from '@/assets/leftArrow_icon.svg'
import RightArrowIcon from '@/assets/rightArrow_icon.svg'

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

  const { data: posts } = useSWR<Array<PostWithRelations>>(
    `/api/posts${query ? `?${query}` : ''}`,
    fetcher,
  )

  return (
    <Container>
      {posts?.map((post) => <PostListItem key={post.id} post={post} />)}

      {subCategory !== 'all' && (
        <Pagination>
          <PaginationButton
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <LeftArrowIcon />
            {[...Array(4)].map((_, idx) => {
              const pageNumber = Math.floor((page - 1) / 4) * 4 + idx + 1
              return (
                <PaginationNumber
                  key={pageNumber}
                  type="button"
                  disabled={page === pageNumber}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationNumber>
              )
            })}
          </PaginationButton>
          <PaginationButton
            disabled={page === 4}
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
const Pagination = styled.div``

const PaginationButton = styled.button<{ disabled: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
`

const PaginationNumber = styled.button<{ disabled: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
`
