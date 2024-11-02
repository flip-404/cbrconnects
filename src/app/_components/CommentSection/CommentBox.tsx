'use client'

import { CommentWithRelations } from '@/types'
import { formatDateToFullYear } from '@/utils/formatDate'
import styled from 'styled-components'
import LikeIcon from '@/assets/desktop/like_icon.svg'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import WriteCommentBox from './WriteCommentBox'
import MoreMenu from '../MoreMenu'
import NotificationModal from '../NotificationModal'

interface CommentBoxProps {
  handleLikeComment: (commentId: number, parentId: null | number) => void
  selectReplyComment?: (commentId: number) => void
  handleWriteComment?: (
    content: string,
    parentId: null | number,
    type: 'edit' | 'write',
  ) => void
  handleEditComment: (content: string, commentId: number) => void
  handleMoreMenu: (commentId: null | number) => void
  onEditMode: (commentId: null | number) => void
  offEditMode?: () => void
  isEditMode: number | null
  commentToReply?: null | number
  openMoreMenu: null | number
  comment: CommentWithRelations
  parentId?: null | number
}

function CommentBox({
  handleLikeComment,
  selectReplyComment,
  handleWriteComment,
  handleEditComment,
  handleMoreMenu,
  onEditMode,
  offEditMode,
  isEditMode,
  commentToReply,
  openMoreMenu,
  comment,
  parentId = null,
}: CommentBoxProps) {
  const { data: session } = useSession()
  const [deleteModal, setDeleteModal] = useState(false)
  const isLiked = comment.likes?.some(
    (like) => like.userId === session?.user.id,
  )

  const handleDeletePost = async () => {
    setDeleteModal(false)
    await fetch(`/api/comments`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId: comment.id }),
    })
  }

  const renderWriteCommentBox = (isEdit: boolean, content: string) => (
    <WriteCommentBox
      key={comment.id}
      handleWriteComment={handleWriteComment}
      handleEditComment={handleEditComment}
      parentId={parentId}
      commentId={comment.id}
      offEditMode={offEditMode}
      isEditMode={isEdit}
      prevContent={content}
    />
  )

  const renderCommentBody = () => (
    <>
      <CommentItem $isReply={parentId !== null}>
        <AuthorProfile />
        <ContentSection>
          <CommentHeader>
            <div>
              <span>{comment.author.nickname}</span>
              {formatDateToFullYear(comment.createdAt, true)}
            </div>
            <MoreMenu
              targetId={comment.id}
              handleMoreMenu={handleMoreMenu}
              currentId={openMoreMenu}
              handleEditButton={() => onEditMode(comment.id)}
              handleDeleteButton={() => setDeleteModal(true)}
            />
          </CommentHeader>
          <CommentBody>{comment.content}</CommentBody>
          <CommentFooter>
            {selectReplyComment && (
              <Reply onClick={() => selectReplyComment(comment.id)}>
                답글 남기기
              </Reply>
            )}
            <LikeWrapper $isLiked={isLiked}>
              <LikeIcon
                onClick={() => handleLikeComment(comment.id, parentId)}
              />{' '}
              {comment.likes?.length}
            </LikeWrapper>
          </CommentFooter>
        </ContentSection>
      </CommentItem>
      {commentToReply === comment.id && renderWriteCommentBox(false, '')}
    </>
  )

  const renderReplies = () =>
    comment.replies?.map((reply) =>
      isEditMode === reply.id ? (
        renderWriteCommentBox(true, reply.content)
      ) : (
        <CommentBox
          key={reply.id}
          comment={reply}
          handleLikeComment={handleLikeComment}
          handleEditComment={handleEditComment}
          handleMoreMenu={handleMoreMenu}
          onEditMode={onEditMode}
          offEditMode={offEditMode}
          isEditMode={isEditMode}
          openMoreMenu={openMoreMenu}
          parentId={comment.id}
        />
      ),
    )

  return (
    <Container>
      <CommentWrapper>
        {isEditMode === comment.id
          ? renderWriteCommentBox(true, comment.content)
          : renderCommentBody()}
        {renderReplies()}
      </CommentWrapper>
      {deleteModal && (
        <NotificationModal
          label="정말 삭제하시겠습니까?"
          onCheck={handleDeletePost}
          onCheckLabel="삭제"
          onClose={() => setDeleteModal(false)}
          onCloseLabel="취소"
        />
      )}
    </Container>
  )
}

export default CommentBox

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  gap: 1rem;
`

const CommentItem = styled.div<{ $isReply: boolean }>`
  display: flex;
  gap: 30px;
  padding: ${(props) => (props.$isReply ? '24px 60px' : '24px 10px')};
  border-bottom: 1px solid #ccc;
`

const AuthorProfile = styled.div`
  margin: 6px;
  width: 39px;
  height: 39px;
  background-color: #e1e1e1;
  border-radius: 990px;
`

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.3rem;
`

const Reply = styled.div`
  cursor: pointer;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
`

const LikeWrapper = styled.div<{ $isLiked: boolean }>`
  cursor: pointer;
  display: flex;
  gap: 5px;
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

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
  span {
    color: #222222;
    &::after {
      content: '|';
      margin: 0 6px;
      color: #d9d9d9;
    }
  }
`

const CommentBody = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #222222;

  @media (max-width: 768px) {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    color: #14171c;
  }
`

const CommentFooter = styled.div`
  margin-top: 5px;
  display: flex;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #878787;
  gap: 10px;
`
