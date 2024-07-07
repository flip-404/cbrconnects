import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function POST(request: NextRequest) {
  const { postId, userId } = await request.json()

  if (!postId || !userId) {
    return NextResponse.json(
      { error: 'Post ID and User ID are required' },
      { status: 400 },
    )
  }

  try {
    // Create a new like
    await prisma.postLike.create({
      data: {
        postId,
        userId,
      },
    })

    return NextResponse.json(
      { message: 'Post liked successfully' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

async function DELETE(request: NextRequest) {
  const { postId, userId, postLikeId } = await request.json()

  if (!postId || !userId || !postLikeId) {
    return NextResponse.json(
      { error: 'Post ID and User ID are required' },
      { status: 400 },
    )
  }

  try {
    await prisma.postLike.delete({
      where: {
        id: Number(postLikeId),
      },
    })

    return NextResponse.json(
      { message: 'Post unliked successfully' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
export { POST, DELETE }
