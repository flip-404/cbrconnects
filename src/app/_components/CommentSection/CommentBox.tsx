import { CommentWithRelations } from '@/types'
import formatDate from '@/utils/formatData'
import styled from 'styled-components'
import LikeIcon from '@/assets/like_icon.svg'
import { useSession } from 'next-auth/react'
import WriteCommentBox from './WriteCommentBox'

function CommentBox({
  handdleLikeComment,
  selectReplyComment,
  handdleWriteComment,
  commentToReply,
  comment,
  parentId = null,
}: {
  handdleLikeComment: (commmentId: number, parentId: null | number) => void
  selectReplyComment?: (commmentId: number) => void
  handdleWriteComment?: (content: string, parentId: null | number) => void
  commentToReply?: null | number
  comment: CommentWithRelations
  parentId?: null | number
}) {
  const { data: session } = useSession()

  const isLiked = comment.likes?.some(
    (like) => like.userId === session?.user.id,
  )
  return (
    <Container>
      <AuthorProfile />
      <CommentWrapper>
        <CommentAuthor>{comment.author.nickname}</CommentAuthor>
        <CommentContent>{comment.content}</CommentContent>
        <CommentDetail>
          <Date>{formatDate(comment.createdAt)}</Date>
          {selectReplyComment && (
            <Reply
              onClick={() => {
                selectReplyComment(comment.id)
              }}
            >
              답글쓰기
            </Reply>
          )}

          <LikeWrapper $isLiked={isLiked}>
            <LikeIcon
              onClick={() => {
                handdleLikeComment(comment.id, parentId)
              }}
              width={24}
              height={24}
            />{' '}
            {comment.likes?.length}
          </LikeWrapper>
        </CommentDetail>
        {comment.replies?.length !== 0 &&
          comment.replies?.map((reply) => (
            <CommentBox
              key={reply.id}
              comment={reply}
              handdleLikeComment={handdleLikeComment}
              parentId={comment.id}
            />
          ))}
        {commentToReply === comment.id && (
          <WriteCommentBox
            handdleWriteComment={handdleWriteComment}
            parentId={comment.id}
          />
        )}
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
  width: 100%;
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
