import { postlike, userinfo } from '@prisma/client'

// GET 'posts'
export type GET_chat = {
  id: number
  content: string
  created_at: string
  author: userinfo
}

// GET 'posts'
export type GET_Posts = {
  id: number
  title: string
  content: string
  view_count: number
  category: string
  thumbnail: string | null
  created_at: string
  updated_at: string
  author_id: number
  comment_count: number
  like_count: number
  author_name: string
  likes: postlike[]
}
