import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

async function POST(request: Request) {
  const body = await request.json()
  const { userId, postId } = body
  try {
    const existingLike = await prisma.postlike.findUnique({
      where: {
        user_id_post_id: {
          user_id: userId,
          post_id: postId,
        },
      },
    })

    if (existingLike) {
      return NextResponse.json({ message: 'Already liked this post' }, { status: 400 })
    }

    const newLike = await prisma.postlike.create({
      data: {
        post_id: postId,
        user_id: userId,
      },
    })
    await prisma.post.update({
      where: { id: postId },
      data: {
        view_count: { increment: 1 },
      },
    })

    return NextResponse.json({ message: 'LIKED SECCESS', newLike }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export { POST }
