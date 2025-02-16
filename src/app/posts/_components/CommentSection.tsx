'use client'

import { CommentWithRelations, PostWithRelations } from '@/types'
import NewWriteCommentBox from './WriteInput'
import Comment from './Comment'
import { useState } from 'react'
import { CommentProvider, useComment } from '@/contexts/commentContext'
import styled from 'styled-components'

interface CommentSectionProps {
  post: PostWithRelations
  comments?: CommentWithRelations[]
}

function CommentSection({ post, comments }: CommentSectionProps) {
  const { selectedReplyComment } = useComment()

  return (
    <>
      <NewWriteCommentBox post={post} parentId={null} />
      {comments?.map((comment) => {
        return (
          <>
            <Comment post={post} comment={comment} />
            <ReplySection>
              {comment.replies.map((reply) => {
                return <Comment post={post} comment={reply} />
              })}
              {comment.id === selectedReplyComment && (
                <NewWriteCommentBox post={post} parentId={comment.id} />
              )}
            </ReplySection>
          </>
        )
      })}
    </>
  )
}

export default CommentSection

const ReplySection = styled.div`
  background-color: #f9f9f9;
  padding: 0px 50px;
`
