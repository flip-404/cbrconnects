'use client'

import styled from 'styled-components'
import { PostWithRelations } from '@/types'
import PostListItem from './PostListItem'
import PostListItemSkeleton from './PostListItemSkeleton'

function PostList({
  posts,
  isLoading,
  isBusiness = false,
}: {
  posts: PostWithRelations[]
  isLoading: boolean
  isBusiness?: boolean
}) {
  if (isLoading) {
    return (
      <SkeletonContainer>
        {Array.from({ length: 10 }, (_, index) => (
          <PostListItemSkeleton key={index} />
        ))}
      </SkeletonContainer>
    )
  }
  if (!posts) return '불러오는 중 입니다'
  if (posts.length === 0) return <NoPosts>아직 게시글이 없어요</NoPosts>
  return (
    <Container $isBusiness={isBusiness}>
      {posts?.map((post: PostWithRelations) => (
        <PostListItem isBusiness={isBusiness} key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default PostList

const SkeletonContainer = styled.div`
  flex: 1;
  position: relative;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: 13px 0px;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 12px;
  }
`

const Container = styled.div<{ $isBusiness: boolean }>`
  flex: 1;
  position: relative;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.$isBusiness ? '0px' : '13px 0px')};
  gap: 26px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 12px;
    height: auto;
  }
`

const NoPosts = styled.span`
  flex: 1;
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
