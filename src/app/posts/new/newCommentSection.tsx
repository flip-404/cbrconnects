'use client'

import { CommentWithRelations, PostWithRelations } from '@/types'
import NewWriteCommentBox from './WriteInput'
import Comment from './Comment'
import { useState } from 'react'
import { CommentProvider, useComment } from '@/contexts/commentContext'
import styled from 'styled-components'

interface NewCommentSectionProps {
  post: PostWithRelations
  comments?: CommentWithRelations[]
}

function NewCommentSection({ post, comments }: NewCommentSectionProps) {
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

export default NewCommentSection

const ReplySection = styled.div`
  background-color: #f9f9f9;
  padding-left: 50px;
`
