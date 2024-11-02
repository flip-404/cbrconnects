'use client'

import { PostWithRelations } from '@/types'
import styled from 'styled-components'
import { formatDateToFullYear } from '@/utils/formatDate'
import { extractTextFromHtml } from '@/utils/extractTextFromHtml'

type MyPostsProps = {
  posts: PostWithRelations[]
}

function MyPosts({ posts }: MyPostsProps) {
  return (
    <Container>
      <Count>총 {posts.length}개</Count>
      {posts.map((post) => {
        const contentText = extractTextFromHtml(post.content)
        const truncatedContent =
          contentText.length > 50
            ? contentText.substring(0, 70) + '...'
            : contentText

        return (
          <Post key={post.id}>
            <PostHeader>
              <span>{post.title}</span>
              {formatDateToFullYear(post.createdAt)}
            </PostHeader>
            <Content>{truncatedContent}</Content>
          </Post>
        )
      })}
    </Container>
  )
}

export default MyPosts

const Container = styled.div`
  max-width: 890px;
  border: 1px solid #e0e3e8;
  border-radius: 8px;
  padding: 42px 94px 42px 42px;
  display: flex;
  flex-direction: column;
`

const Count = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #878787;
  border-bottom: 1px solid #d9d9d9;
`

const Post = styled.div`
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid #a2acb9;
`

const PostHeader = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #505d6f;

  span {
    &::after {
      content: '|';
      margin: 0 6px;
      color: #d9d9d9;
    }
  }
`

const Content = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  color: #14171c;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
  white-space: normal;
`
