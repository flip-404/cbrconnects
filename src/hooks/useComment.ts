import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { CommentWithRelations } from '@/types'
import useUser from './useUser'

export default function useComment(postId: string | null) {
  const { user } = useUser()
  const { data: comments, mutate } = useSWR<CommentWithRelations[]>(
    postId ? `/api/comments?postId=${postId}` : null,
    fetcher,
  )

  const handleLikeComment = (commentId: number, parentId: number | null) => {
    if (!user || !comments) return

    let updatedComments

    if (parentId) {
      const parentComment = comments.find((comment) => comment.id === parentId)
      const targetReply = parentComment?.replies.find((reply) => reply.id === commentId)
      isLiked = targetReply?.likes.find((like) => like.userId === user?.id)

      const updatedReplies = parentComment?.replies.map((reply) => {
        const updatedLikes = isLiked
          ? reply.likes.filter((like) => like.userId !== user?.id)
          : [...reply.likes, { id: Math.random(), commentId, userId: user?.id }]
        return reply.id === commentId ? { ...reply, likes: updatedLikes } : reply
      })

      updatedComments = comments.map((comment) =>
        comment.id === parentId ? { ...comment, replies: updatedReplies } : comment,
      )
    } else {
      const targetComment = comments.find((comment) => comment.id === commentId)
      isLiked = targetComment?.likes.find((like) => like.userId === user?.id)

      updatedComments = comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: isLiked
                ? comment.likes.filter((like) => like.userId !== user?.id)
                : [...comment.likes, { id: Math.random(), commentId, userId: user?.id }],
            }
          : comment,
      )
    }

    mutate(updatedComments as CommentWithRelations[], false)

    fetch('/api/likeComment', {
      method: isLiked ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commentLikeId: isLiked ? isLiked.id : null,
        commentId,
        userId: user?.id,
      }),
    })

    mutate()
  }

  const handleWriteComment = (content: string, parentId: number | null) => {
    const newComment = {
      author: { nickname: user?.nickname },
      content,
      createdAt: new Date(),
      likes: [],
      id: Math.random(),
      parentId,
    }

    const updatedComments = parentId
      ? comments!.map((comment) =>
          comment.id === parentId
            ? { ...comment, replies: [...comment.replies, newComment] }
            : comment,
        )
      : [...comments!, newComment]

    mutate(updatedComments as CommentWithRelations[], false)

    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        postId: Number(postId),
        authorId: user?.id,
        parentId,
      }),
    })
  }

  const handleEditComment = (content: string, commentId: number) => {
    fetch('/api/comments', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId, content }),
    }).then(() => {
      mutate()
    })
  }

  return {
    comments,
    handleLikeComment,
    handleWriteComment,
    handleEditComment,
  }
}
