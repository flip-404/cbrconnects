'use client'

import { PostWithRelations } from '@/types'
import fetcher from '@/utils/fetcher'
import parse from 'html-react-parser'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'

function Posts() {
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const { data: post, error } = useSWR<PostWithRelations>(
    `/api/posts?postId=${postId}`,
    fetcher,
  )

  if (error) return <div>Failed to load post</div>
  if (!post) return <div>Loading...</div>

  return (
    <div>
      <h1>{post?.title}</h1>
      <div>{parse(post!.content)}</div>
    </div>
  )
}

export default Posts
