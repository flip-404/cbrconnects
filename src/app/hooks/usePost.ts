import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { PostWithRelations } from '@/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useUser from './useUser'

export default function usePost(postId: string | null) {
  const { user } = useUser()
  const router = useRouter()
  const [loadingModal, setLoadingModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const {
    data: post,
    error,
    mutate,
    isLoading: isPostLoading,
  } = useSWR<PostWithRelations>(
    postId ? `/api/posts?postId=${postId}` : null,
    fetcher,
  )

  const handleLikePost = async () => {
    if (!user || !post) return

    const isLiked = post.likes.some((like) => like.userId === user.id)
    const updatedLikes = isLiked
      ? post.likes.filter((like) => like.userId !== user.id)
      : [...post.likes, { id: Math.random(), postId: post.id, userId: user.id }]

    mutate({ ...post, likes: updatedLikes }, false)

    // 광클시 에러나는거 수정
    await fetch('/api/likePost', {
      method: isLiked ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postLikeId: isLiked
          ? post.likes.find((like) => like.userId === user.id)?.id
          : null,
        postId: post.id,
        userId: user.id,
      }),
    })

    mutate()
  }

  const handleDeletePost = async () => {
    setDeleteModal(false)
    setLoadingModal(true)

    await fetch(`/api/posts`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: post?.id }),
    })

    setLoadingModal(false)
    router.back()
  }

  return {
    post,
    error,
    handleLikePost,
    handleDeletePost,
    loadingModal,
    deleteModal,
    setDeleteModal,
    isPostLoading,
  }
}
