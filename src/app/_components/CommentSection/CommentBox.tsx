import { CommentWithRelations } from '@/types'
import formatDate from '@/utils/formatData'
import styled from 'styled-components'
import LikeIcon from '@/assets/like_icon.svg'
import { useSession } from 'next-auth/react'

function CommentBox({
  handdleLikeComment,
  comment,
}: {
  handdleLikeComment: (commmentId: number) => void
  comment: CommentWithRelations
}) {
  const { data: session } = useSession()
  const isLiked = comment.likes.some((like) => like.userId === session?.user.id)
  return (
    <Container>
      <AuthorProfile />
      <CommentWrapper>
        <CommentAuthor>{comment.author.nickname}</CommentAuthor>
        <CommentContent>{comment.content}</CommentContent>
        <CommentDetail>
          <Date>{formatDate(comment.createdAt)}</Date>
          <Reply>답글쓰기</Reply>
          <LikeWrapper $isLiked={isLiked}>
            <LikeIcon
              onClick={() => {
                handdleLikeComment(comment.id)
              }}
              width={24}
              height={24}
            />{' '}
            {comment.likes.length}
          </LikeWrapper>
        </CommentDetail>
      </CommentWrapper>
    </Container>
  )
}

export default CommentBox

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 14px 20px;
  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`

const AuthorProfile = styled.div`
  width: 36px;
  height: 36px;
  background-color: #e1e1e1;

  border-radius: 990px;
`

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const CommentContent = styled.div`
  font-size: 15px;
  font-weight: 500;
`
const CommentAuthor = styled.div`
  font-size: 13px;
  font-weight: 700;
`

const CommentDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 13px;
  font-weight: 400;
`

const Date = styled.div`
  font-size: 13px;
  font-weight: 400;
`

const Reply = styled.div`
  cursor: pointer;

  font-size: 13px;
  font-weight: 400;
`

const LikeWrapper = styled.div<{ $isLiked: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;

  path {
    stroke: ${(props) => props.$isLiked && 'red'};
    fill: ${(props) => props.$isLiked && 'red'};
  }

  &:hover {
    path {
      stroke: red;
      fill: red;
    }
  }
`
