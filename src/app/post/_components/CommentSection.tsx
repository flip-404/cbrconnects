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
  const [count, setCount] = useState()

  const { selectedReplyComment } = useComment()

  return (
    <Cotaniner>
      <Count>댓글 {comments?.length}개</Count>
      {comments?.map((comment) => {
        return (
          <>
            <Comment post={post} comment={comment} />
            <ReplySection>
              {comment.replies?.map((reply) => {
                return <Comment post={post} comment={reply} />
              })}
              {comment.id === selectedReplyComment && (
                <NewWriteCommentBox post={post} parentId={comment.id} />
              )}
            </ReplySection>
          </>
        )
      })}
      <NewWriteCommentBox post={post} parentId={null} />
    </Cotaniner>
  )
}

export default CommentSection

const Cotaniner = styled.div`
  width: 700px;
`

const Count = styled.p`
  margin: 60px 0 20px 0;
  font-size: 28px;
  font-weight: 700;
`

const ReplySection = styled.div`
  margin-left: 10px;
`
