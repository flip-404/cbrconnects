'use client'

import styled from 'styled-components'
import { CommentWithRelations } from '@/types'
import { useState } from 'react'
import CommentBox from './CommentBox'
import WriteCommentBox from './WriteCommentBox'
import LoginRequiredNotice from './LoginRequiredNotice'

function CommentSection({
  handdleLikeComment,
  comments,
  handdleWriteComment,
  isLoggedIn,
}: {
  handdleLikeComment: (commentId: number, parentId: null | number) => void
  comments?: CommentWithRelations[]
  handdleWriteComment: (content: string, parentId: number | null) => void
  isLoggedIn: boolean
}) {
  const [commentToReply, setCommentToReply] = useState<null | number>(null)

  if (!comments)
    return (
      <Container>아직 댓글이 없어요! 첫 댓글의 주인공이 되어주세요</Container>
    )

  const selectReplyComment = (commentId: number) => {
    setCommentToReply(commentId)
  }

  return (
    <Container>
      {comments.map((comment: CommentWithRelations) => (
        <CommentBox
          handdleLikeComment={handdleLikeComment}
          selectReplyComment={selectReplyComment}
          handdleWriteComment={handdleWriteComment}
          commentToReply={commentToReply}
          key={comment.id}
          comment={comment}
        />
      ))}

      {isLoggedIn ? (
        <WriteCommentBox
          handdleWriteComment={handdleWriteComment}
          parentId={null}
        />
      ) : (
        <LoginRequiredNotice />
      )}
    </Container>
  )
}

export default CommentSection

const Container = styled.section``
