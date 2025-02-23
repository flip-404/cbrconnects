import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { view_count: { increment: 1 } },
      include: {
        author: {
          select: {
            id: true,
            nickname: true,
            profile_image: true,
          },
        },
        comments: {
          where: { parent_id: null },
          orderBy: { created_at: 'asc' },
          select: {
            id: true,
            content: true,
            created_at: true,
            author: {
              select: {
                nickname: true,
                profile_image: true,
              },
            },
            replies: {
              orderBy: { created_at: 'asc' },
              include: { author: true },
            },
          },
        },
        likes: true,
      },
    })

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(
      {
        id: post.id,
        title: post.title,
        content: post.content,
        created_at: post.created_at,
        view_count: post.view_count,
        category: post.category,
        author: post.author,
        comments: post.comments,
        likes_count: post.likes.length,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error },
      { status: 500 },
    )
  }
}
