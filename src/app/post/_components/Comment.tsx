'use client'

import { CommentWithRelations, PostWithRelations } from '@/types'
import styled from 'styled-components'
import { use, useEffect, useState } from 'react'
import useUser from '@/hooks/useUser'
import api from '@/libs/axiosInstance'
import { useComment } from '@/contexts/commentContext'
import CommentHeader from './CommentHeader'
import EditMode from './EditMode'
import Link from 'next/link'
import EmptyIcon from '@/assets/empty_profile.svg'

interface CommentProps {
  post: PostWithRelations
  comment: CommentWithRelations
}

function Comment({ post, comment }: CommentProps) {
  const { selectedReplyComment, selectedEditComment, selectReplyComment, selectEditComment } =
    useComment()
  const [editText, setEditText] = useState<string>('')
  const { user } = useUser()
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
      <div>
        <Link href="profile">
          <EmptyIcon /> {comment.author.nickname}
        </Link>
        {isEditMode && (
          <button
            onClick={() => {
              selectEditComment(null)
              setEditText('')
            }}
          >
            취소
          </button>
        )}
      </div>
      {isEditMode ? (
        <EditMode editText={editText} setEditText={setEditText} handleEdit={handleEdit} />
      ) : (
        <>
          <p>
            {comment.content}
            <span>
              {comment.created_at.toString()}
              {user?.id === comment.author.id && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      selectEditComment(comment.id)
                      setEditText(comment.content)
                    }}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete()
                    }}
                  >
                    삭제
                  </button>
                </>
              )}
            </span>
          </p>
          {!comment.parent_id && (
            <button
              onClick={() => {
                selectedReplyComment === comment.id
                  ? selectReplyComment(null)
                  : selectReplyComment(comment.id)
              }}
            >
              댓글
            </button>
          )}
        </>
      )}
    </CommentItem>
  )
}

export default Comment

const CommentItem = styled.div<{ $isReply: boolean; $hasReply: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  & > div {
    display: flex;
    justify-content: space-between;

    & > a {
      text-decoration: none;
      color: black;
      display: flex;
      align-items: center;
      font-size: 15px;
      font-weight: 600;

      & > svg {
        width: 30px;
        height: 30px;
      }

      &:hover {
        opacity: 0.7;
      }
    }

    & > button {
      all: unset;
      color: #3c3c4366;
      font-size: 14px;
      cursor: pointer;
    }
  }

  & > p {
    margin: 0;
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.26px;
    line-height: 27.2px;

    & > span {
      font-size: 11px;
      font-weight: 400;
      color: #3c3c434d;

      & > button {
        all: unset;
        cursor: pointer;
        margin-left: 5px;
        color: #6983e8;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  & > button {
    all: unset;
    cursor: pointer;
    margin-top: 5px;
    color: #3c3c4366;
    font-size: 13px;
    font-weight: 600;
  }
`
