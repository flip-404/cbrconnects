'use client'

import styled from 'styled-components'
import { Comment } from '@prisma/client'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import CommentBox from './CommentBox'
import WriteCommentBox from './WriteCommentBox'
import LoginRequiredNotice from './LoginRequiredNotice'

function CommentSection({ postId }: { postId: number }) {
  const { data: comments, mutate } = useSWR(
    `/api/comments?postId=${postId}`,
    fetcher,
  )

  const { data: session } = useSession()

  const handdleWriteComment = (content: string, parentId?: number) => {
    const newComment = {
      author: { nickname: session?.user.nickname },
      content,
      createdAt: Date.now(),
      likes: [],
    }
    mutate([...comments, newComment], false)

    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        postId,
        authorId: session?.user.id,
        parentId,
      }),
    })
  }

  if (!comments)
    return (
      <Container>아직 댓글이 없어요! 첫 댓글의 주인공이 되어주세요</Container>
    )

  return (
    <Container>
      {comments.map((comment: Comment) => (
        <CommentBox key={comment.id} content={comment} />
      ))}

      {session?.user.accessToken ? (
        <WriteCommentBox handdleWriteComment={handdleWriteComment} />
      ) : (
        <LoginRequiredNotice />
      )}
    </Container>
  )
}

export default CommentSection

const Container = styled.section``
