'use client'

import styled from 'styled-components'
import { PostWithRelations } from '@/types'
import LeftArrowIcon from '@/assets/leftArrow_icon.svg'
import RightArrowIcon from '@/assets/rightArrow_icon.svg'
import PostListItem from './PostListItem'

function TempPostList({
  posts,
  page,
  totalCount,
  onPageChage,
}: {
  posts: PostWithRelations[]
  page: number
  totalCount: number
  onPageChage: (pageNum: number) => void
}) {
  if (!posts) return '불러오는 중 입니다'
  if (posts.length === 0) return <NoPosts>아직 게시글이 없어요</NoPosts>
  return (
    <Container>
      {posts?.map((post: PostWithRelations) => (
        <PostListItem key={post.id} post={post} />
      ))}

      <Pagination>
        <PaginationButton
          type="button"
          disabled={page === 1}
          onClick={() => onPageChage(page - 1)}
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
                  onPageChage(pageNumber)
                }}
              >
                {pageNumber}
              </PaginationNumber>
            )
          return null
        })}

        <PaginationButton
          disabled={page === Math.floor(totalCount / 10 + 1)}
          type="button"
          onClick={() => onPageChage(page + 1)}
        >
          <RightArrowIcon />
        </PaginationButton>
      </Pagination>
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
  min-height: 408px;
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

const NoPosts = styled.span`
  display: flex;
  color: #999999;
  justify-content: center;
  align-items: center;
  font-family: Apple SD Gothic Neo;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  min-height: 578px;
`
