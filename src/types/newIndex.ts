import { postlike, userinfo } from '@prisma/client'

// GET 'chat'
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

// GET 'messages'
export type GET_Messages = {
  id: number
  content: string
  created_at: string
  sender: userinfo
  sender_id: string
  receiver: userinfo
  receiver_id: string
}

// GET 'stories'
export interface GET_Stories {
  id: number
  author: userinfo
  author_id: string
  content: string
  link: string | null
  image: string | null
  views: number
  created_at: string
}

// GET 'stories/comments'
export interface GET_StoryComments {
  id: number
  author: userinfo
  author_id: string
  content: string
  link: string | null
  image: string | null
  views: number
  created_at: string
}
