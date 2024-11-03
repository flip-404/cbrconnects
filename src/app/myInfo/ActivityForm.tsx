'use client'

import { CommentWithRelations, PostWithRelations } from '@/types'
import styled from 'styled-components'
import { formatDateToFullYear } from '@/utils/formatDate'
import extractTextFromHtml from '@/utils/extractTextFromHtml'
import { useRouter } from 'next/navigation'

type ActivityFormProps = {
  data: PostWithRelations[] | CommentWithRelations[]
  type: string
}

function ActivityForm({ data, type }: ActivityFormProps) {
  const router = useRouter()

  const handleMoveToPost = (postId: number) => {
    router.push(`/posts?postId=${postId}`)
  }
  return (
    <Container>
      <Count>총 {data.length}개</Count>
      {data.map((item) => {
        const contentText = extractTextFromHtml(item.content)
        const truncatedContent =
          contentText.length > 50
            ? `${contentText.substring(0, 70)}...`
            : contentText
        return (
          <Post
            key={item.id}
            onClick={() => {
              handleMoveToPost(
                type === 'POST'
                  ? (item as PostWithRelations).id
                  : (item as CommentWithRelations).post.id,
              )
            }}
          >
            <PostHeader>
              <span>
                {type === 'POST'
                  ? (item as PostWithRelations).title
                  : (item as CommentWithRelations).post.title}
              </span>
              {formatDateToFullYear(item.createdAt)}
            </PostHeader>
            <Content>{truncatedContent}</Content>
          </Post>
        )
      })}
    </Container>
  )
}

export default ActivityForm

const Container = styled.div`
  min-width: 890px;
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
  cursor: pointer;
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
