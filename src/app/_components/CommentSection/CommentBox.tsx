import { CommentWithRelations } from '@/types'
import { formatDateToMonth } from '@/utils/formatDate'
import styled from 'styled-components'
import LikeIcon from '@/assets/like_icon.svg'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import WriteCommentBox from './WriteCommentBox'
import MoreMenu from '../MoreMenu'
import NotificationModal from '../NotificationModal'

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
}: {
  handleLikeComment: (commmentId: number, parentId: null | number) => void
  selectReplyComment?: (commmentId: number) => void
  handleWriteComment?: (
    content: string,
    parentId: null | number,
    type: 'edit' | 'write',
  ) => void
  handleEditComment: (content: string, commentId: number) => void
  handleMoreMenu: (commmentId: null | number) => void
  onEditMode: (commmentId: null | number) => void
  offEditMode?: () => void
  isEditMode: number | null
  commentToReply?: null | number
  openMoreMenu: null | number
  comment: CommentWithRelations
  parentId?: null | number
}) {
  const { data: session } = useSession()
  const [deleteModal, setDeleteModal] = useState(false)
  const isLiked = comment.likes?.some(
    (like) => like.userId === session?.user.id,
  )

  const handleDeletePost = async () => {
    setDeleteModal(false)

    await fetch(`/api/comments`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentId: comment.id,
      }),
    })
  }

  return (
    <Container>
      <AuthorProfile />
      <CommentWrapper>
        {isEditMode === comment.id ? (
          <WriteCommentBox
            key={comment.id}
            handleWriteComment={handleWriteComment}
            handleEditComment={handleEditComment}
            parentId={null}
            commentId={comment.id}
            offEditMode={offEditMode}
            isEditMode
            prevContent={comment.content}
          />
        ) : (
          <>
            {' '}
            <CommentAuthor>{comment.author.nickname}</CommentAuthor>
            <CommentContent>{comment.content}</CommentContent>
            <CommentDetail>
              <Date>{formatDateToMonth(comment.createdAt)}</Date>
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
                    handleLikeComment(comment.id, parentId)
                  }}
                  width={24}
                  height={24}
                />{' '}
                {comment.likes?.length}
              </LikeWrapper>
              <MoreMenu
                targetId={comment.id}
                handleMoreMenu={handleMoreMenu}
                currentId={openMoreMenu}
                handleEditButton={() => {
                  onEditMode(comment.id)
                }}
                handleDeleteButton={() => {
                  setDeleteModal(true)
                }}
              />
            </CommentDetail>
          </>
        )}

        {comment.replies?.length !== 0 &&
          comment.replies?.map((reply) =>
            isEditMode === reply.id ? (
              <WriteCommentBox
                key={reply.id}
                handleWriteComment={handleWriteComment}
                handleEditComment={handleEditComment}
                parentId={comment.id}
                commentId={reply.id}
                offEditMode={offEditMode}
                isEditMode
                prevContent={reply.content}
              />
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
          )}
        {commentToReply === comment.id && (
          <WriteCommentBox
            handleWriteComment={handleWriteComment}
            parentId={comment.id}
            isEditMode={false}
          />
        )}
      </CommentWrapper>
      {deleteModal && (
        <NotificationModal
          label="정말 삭제하시겠습니까?"
          onCheck={handleDeletePost}
          onCheckLabel="삭제"
          onClose={() => {
            setDeleteModal(false)
          }}
          onCloseLabel="취소"
        />
      )}
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
  position: relative;
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
