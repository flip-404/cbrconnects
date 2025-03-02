'use client'

import { CommentWithRelations, PostWithRelations } from '@/types'
import { useComment } from '@/contexts/commentContext'
import styled from 'styled-components'
import Comment from './Comment'
import NewWriteCommentBox from './WriteInput'

interface CommentSectionProps {
  post: PostWithRelations
  comments?: CommentWithRelations[]
}

function CommentSection({ post, comments }: CommentSectionProps) {
  const { selectedReplyComment } = useComment()

  return (
    <Cotaniner>
      <Count>{comments?.length ? `댓글 ${comments?.length}개` : '첫 댓글을 작성해 보세요'}</Count>
      {comments?.map((comment) => {
        return (
          <>
            <Comment post={post} comment={comment} />
            <ReplySection
              $visible={comment.replies.length !== 0 || comment.id === selectedReplyComment}
            >
              {comment.replies?.map((reply) => {
                return <Comment key={reply.id} post={post} comment={reply} />
              })}
              {comment.id === selectedReplyComment && (
                <NewWriteCommentBox post={post} parentId={comment.id} />
              )}
            </ReplySection>
          </>
        )
      })}
      <NewWriteCommentBox post={post} parentId={null} />
    </Cotaniner>
  )
}

export default CommentSection

const Cotaniner = styled.div`
  width: 700px;
`

const Count = styled.p`
  margin: 60px 0 20px 0;
  font-size: 28px;
  font-weight: 700;
`

const ReplySection = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  margin-left: 10px;
  padding: 5px 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
`
