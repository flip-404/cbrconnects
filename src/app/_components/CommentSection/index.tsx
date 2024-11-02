'use client'

import styled from 'styled-components'
import { CommentWithRelations } from '@/types'
import { useState } from 'react'
import { useMediaQuery } from '@mui/material'
import CommentBox from './CommentBox'
import WriteCommentBox from './WriteCommentBox'
import LoginRequiredNotice from './LoginRequiredNotice'

interface CommentSectionProps {
  handleLikeComment: (commentId: number, parentId: null | number) => void
  comments?: CommentWithRelations[]
  handleWriteComment: (
    content: string,
    parentId: number | null,
    type: 'edit' | 'write',
  ) => void
  handleEditComment: (content: string, commentId: number) => void
  isLoggedIn: boolean
  postAuthorId: number
}

function CommentSection({
  handleLikeComment,
  comments,
  handleWriteComment,
  handleEditComment,
  isLoggedIn,
  postAuthorId,
}: CommentSectionProps) {
  const [commentToReply, setCommentToReply] = useState<null | number>(null)
  const [openMoreMenu, setOpenMoreMenu] = useState<null | number>(null)
  const [isEditMode, setIsEditMode] = useState<null | number>(null)
  const isMobile = useMediaQuery('(max-width:768px)')

  if (!comments)
    return (
      <Container>아직 댓글이 없어요! 첫 댓글의 주인공이 되어주세요</Container>
    )

  const toggleMoreMenu = (commentId: number | null) => {
    setOpenMoreMenu((prev) => (prev === commentId ? null : commentId))
  }

  const renderWriteCommentSection = () => {
    if (isLoggedIn)
      return (
        <WriteCommentBox
          handleWriteComment={handleWriteComment}
          parentId={null}
          commentId={null}
          isEditMode={false}
        />
      )

    if (isMobile) {
      return (
        <WriteCommentBox
          handleWriteComment={handleWriteComment}
          parentId={null}
          commentId={null}
          isEditMode={false}
          disabled
        />
      )
    }

    return <LoginRequiredNotice />
  }

  const renderCommentList = () =>
    comments.map((comment) => (
      <CommentBox
        key={comment.id}
        comment={comment}
        handleLikeComment={handleLikeComment}
        selectReplyComment={setCommentToReply}
        handleWriteComment={handleWriteComment}
        handleEditComment={handleEditComment}
        handleMoreMenu={toggleMoreMenu}
        onEditMode={setIsEditMode}
        offEditMode={() => setIsEditMode(null)}
        isEditMode={isEditMode}
        commentToReply={commentToReply}
        openMoreMenu={openMoreMenu}
        postAuthorId={postAuthorId}
      />
    ))

  return (
    <Container onClick={() => toggleMoreMenu(null)}>
      {renderWriteCommentSection()}
      {renderCommentList()}
    </Container>
  )
}

export default CommentSection

const Container = styled.section`
  @media (max-width: 768px) {
    border-bottom: 1px solid #ccc;
  }
`
