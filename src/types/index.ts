import { Comment, CommentLike, Post, PostLike, User } from '@prisma/client'

export type CategoryLink = {
  href: string
  label: string
  id: string
}

export type PostWithRelations = Post & {
  comments: Comment[]
  likes: PostLike[]
  author: User
}

export type CommentWithRelations = Comment & {
  author: User
  likes: CommentLike[]
  replies: CommentWithRelations[]
}

export type CommentResponse = {
  id: number
  content: string
  createdAt: Date
  author: User
  postId: number
  parentId: number
  likes: CommentLike[]
  replies: CommentWithRelations[]
}
