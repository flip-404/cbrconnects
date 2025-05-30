'use client'

import { CommentWithRelations } from '@/types'
import styled from 'styled-components'
import { useState } from 'react'
import useUser from '@/hooks/useUser'
import api from '@/libs/axiosInstance'
import { useComment } from '@/contexts/commentContext'
import Link from 'next/link'
import EmptyIcon from '@/assets/empty_profile.svg'
import Image from 'next/image'
import { formatPostDate } from '@/utils/formatDate'
import EditMode from './EditMode'

interface CommentProps {
  comment: CommentWithRelations
}

function Comment({ comment }: CommentProps) {
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
    <CommentItem $hasReply={Boolean(comment.replies)} $isReply>
      <AuthorProfile>
        <Link href={`/profile?userId=${comment.author.id}`}>
          {comment.author.profile_image ? (
            <Image src={comment.author.profile_image} alt="프로필 사진" width={30} height={30} />
          ) : (
            <EmptyIcon />
          )}
          {comment.author.nickname}
        </Link>
        {isEditMode && (
          <button
            type="button"
            onClick={() => {
              selectEditComment(null)
              setEditText('')
            }}
          >
            취소
          </button>
        )}
      </AuthorProfile>
      {isEditMode ? (
        <EditMode editText={editText} setEditText={setEditText} handleEdit={handleEdit} />
      ) : (
        <>
          <p>
            {comment.content}
            <div>
              {formatPostDate(comment.created_at)}
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
            </div>
          </p>
          {!comment.parent_id && (
            <button
              type="button"
              onClick={() => {
                if (selectedReplyComment === comment.id) {
                  selectReplyComment(null)
                } else {
                  selectReplyComment(comment.id)
                }
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
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  & > div {
  }

  & > p {
    margin: 0;
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.26px;
    line-height: 27.2px;
    white-space: pre-wrap;
    word-break: break-word;

    & > div {
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

const AuthorProfile = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  & > a {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;

    & > img {
      border-radius: 4px;
      margin-right: 5px;
    }

    & > svg {
      width: 30px;
      height: 30px;
      margin-right: 5px;
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
`
