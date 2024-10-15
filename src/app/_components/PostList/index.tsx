'use client'

import styled from 'styled-components'
import { PostWithRelations } from '@/types'
import PostListItem from './PostListItem'
import PostListItemSkeleton from './PostListItemSkeleton'

function PostList({
  posts,
  isLoading,
}: {
  posts: PostWithRelations[]
  isLoading: boolean
}) {
  if (isLoading) {
    // Show 10 skeletons if loading
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
    <Container>
      {posts?.map((post: PostWithRelations) => (
        <PostListItem key={post.id} post={post} />
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
  height: 500px;
  min-height: 408px;
`

const Container = styled.div`
  flex: 1;
  position: relative;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: 13px 0px;
  gap: 26px;
  width: 100%;
  height: 500px;
  min-height: 408px;
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
