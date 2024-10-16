'use client'

import styled from 'styled-components'
import { CommentWithRelations } from '@/types'
import { useState } from 'react'
import CommentBox from './CommentBox'
import WriteCommentBox from './WriteCommentBox'
import LoginRequiredNotice from './LoginRequiredNotice'

function CommentSection({
  handleLikeComment,
  comments,
  handleWriteComment,
  handleEditComment,
  isLoggedIn,
}: {
  handleLikeComment: (commentId: number, parentId: null | number) => void
  comments?: CommentWithRelations[]
  handleWriteComment: (
    content: string,
    parentId: number | null,
    type: 'edit' | 'write',
  ) => void
  handleEditComment: (content: string, commentId: number) => void
  isLoggedIn: boolean
}) {
  const [commentToReply, setCommentToReply] = useState<null | number>(null)
  const [openMoreMenu, setOpenMoreMenu] = useState<null | number>(null)
  const [isEditMode, setIsEditMode] = useState<null | number>(null)
  if (!comments)
    return (
      <Container>아직 댓글이 없어요! 첫 댓글의 주인공이 되어주세요</Container>
    )

  const selectReplyComment = (commentId: number) => {
    setCommentToReply(commentId)
  }

  const handleMoreMenu = (commentId: number | null) => {
    setOpenMoreMenu(commentId === openMoreMenu ? null : commentId)
  }

  const onEditMode = (commentId: number | null) => {
    setIsEditMode(commentId)
  }

  const offEditMode = () => {
    setIsEditMode(null)
  }

  return (
    <Container
      onClick={() => {
        handleMoreMenu(null)
      }}
    >
      {isLoggedIn ? (
        <WriteCommentBox
          handleWriteComment={handleWriteComment}
          parentId={null}
          commentId={null}
          isEditMode={false}
        />
      ) : (
        <LoginRequiredNotice />
      )}
      {comments.map((comment: CommentWithRelations) => (
        <CommentBox
          handleLikeComment={handleLikeComment}
          selectReplyComment={selectReplyComment}
          handleWriteComment={handleWriteComment}
          handleEditComment={handleEditComment}
          handleMoreMenu={handleMoreMenu}
          onEditMode={onEditMode}
          isEditMode={isEditMode}
          offEditMode={offEditMode}
          commentToReply={commentToReply}
          openMoreMenu={openMoreMenu}
          key={comment.id}
          comment={comment}
        />
      ))}
    </Container>
  )
}

export default CommentSection

const Container = styled.section``
