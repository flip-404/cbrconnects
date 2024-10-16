'use client'

import styled from 'styled-components'
import { formatDateToFullYear } from '@/utils/formatDate'
import { PostWithRelations } from '@/types'

export default function MainPost({
  handleMoveToPost,
  post,
  index,
}: {
  handleMoveToPost: (postId: number) => void
  post: PostWithRelations
  index: number
}) {
  return (
    <Post key={post.id} onClick={() => handleMoveToPost(post.id)}>
      <Number>{index + 1}</Number>
      <Content>
        <Title>{post.title}</Title>
        <Detail>{formatDateToFullYear(post.createdAt)}</Detail>
      </Content>
    </Post>
  )
}

const Post = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 18px 20px 18px;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid #d5d5d580;
  }
`

const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e2e8fd;
  width: 28px;
  height: 28px;
  border-radius: 999px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Title = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #222222;
`

const Detail = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  color: #878787;
`
