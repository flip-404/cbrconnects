'use client'

import { CommentWithRelations, PostWithRelations } from '@/types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import useUser from '@/hooks/useUser'
import api from '@/libs/axiosInstance'
import { useComment } from '@/contexts/commentContext'
import CommentHeader from './CommentHeader'
import EditMode from './EditMode'
import ViewMode from './ViewMode'

interface CommentProps {
  post: PostWithRelations
  comment: CommentWithRelations
}

function Comment({ post, comment }: CommentProps) {
  const { selectedEditComment, selectReplyComment, selectEditComment } =
    useComment()
  const [editText, setEditText] = useState<string>(comment.content)
  const { user } = useUser()
  const isMyComment = comment.authorId === user?.id
  const isEditMode = selectedEditComment === comment.id

  const handleEdit = (): void => {
    selectEditComment(null)
    api.put('/comments', { content: editText, commentId: comment.id })
  }

  const handleDelete = (): void => {
    api.delete(`/comments?commentId=${comment.id}`)
  }

  return (
    <CommentItem $hasReply={Boolean(comment.replies)} $isReply={true}>
      <ProfileWrapper>
        {comment.author.profileImage && (
          <AuthorProfile src={comment.author.profileImage} />
        )}
      </ProfileWrapper>
      <ContentSection>
        <CommentHeader
          comment={comment}
          isMyComment={isMyComment}
          isEditMode={isEditMode}
          selectEditComment={selectEditComment}
          handleDelete={handleDelete}
        />

        {isEditMode ? (
          <EditMode
            editText={editText}
            setEditText={setEditText}
            handleEdit={handleEdit}
          />
        ) : (
          <ViewMode
            comment={comment}
            editText={editText}
            selectReplyComment={selectReplyComment}
          />
        )}
      </ContentSection>
    </CommentItem>
  )
}

export default Comment

const CommentItem = styled.div<{ $isReply: boolean; $hasReply: boolean }>`
  display: flex;
  gap: 16px;
  padding: 24px 0px 24px 10px;
  border-bottom: none;
  @media (max-width: 768px) {
    gap: 10px;
    border-bottom: none;
    padding: ${(props) =>
      props.$isReply ? '12px 0px 12px 60px' : '24px 10px'};
  }
`

const ProfileWrapper = styled.div`
  border: none;
  width: 39px;
  height: 39px;
  background-color: #e1e1e1;
  border-radius: 990px;
`

const AuthorProfile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 990px;
`

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
