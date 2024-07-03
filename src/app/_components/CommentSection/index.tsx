'use client'

import styled from 'styled-components'
import { CommentWithRelations } from '@/types'
import CommentBox from './CommentBox'
import WriteCommentBox from './WriteCommentBox'
import LoginRequiredNotice from './LoginRequiredNotice'

function CommentSection({
  comments,
  handdleWriteComment,
  isLoggedIn,
}: {
  comments: CommentWithRelations[]
  handdleWriteComment: (content: string, parentId?: number) => void
  isLoggedIn: boolean
}) {
  if (!comments)
    return (
      <Container>아직 댓글이 없어요! 첫 댓글의 주인공이 되어주세요</Container>
    )

  return (
    <Container>
      {comments.map((comment: CommentWithRelations) => (
        <CommentBox key={comment.id} content={comment} />
      ))}

      {isLoggedIn ? (
        <WriteCommentBox handdleWriteComment={handdleWriteComment} />
      ) : (
        <LoginRequiredNotice />
      )}
    </Container>
  )
}

export default CommentSection

const Container = styled.section``
