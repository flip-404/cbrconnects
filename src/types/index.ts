import { CategoryType, comment, post, postlike, userinfo } from '@prisma/client'

export type CategoryLink = {
  href: string
  label: string
  id: string
}

export type PostWithRelations = post & {
  comments: CommentWithRelations[]
  likes: postlike[]
  author: userinfo
  category: CategoryType
}

export type CommentWithRelations = comment & {
  author: userinfo
  replies: CommentWithRelations[]
  post: post
}

export type CommentResponse = {
  id: number
  content: string
  createdAt: Date
  author: userinfo
  postId: number
  parentId: number
  replies: CommentWithRelations[]
}
