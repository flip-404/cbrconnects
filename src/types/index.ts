import { Post, PostLike, User } from '@prisma/client'

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
