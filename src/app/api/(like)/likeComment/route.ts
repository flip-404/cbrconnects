import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function POST(request: NextRequest) {
  const { commentId, userId } = await request.json()

  if (!commentId || !userId) {
    return NextResponse.json(
      { error: 'Comment ID and User ID are required' },
      { status: 400 },
    )
  }

  try {
    await prisma.commentLike.create({
      data: {
        commentId,
        userId,
      },
    })

    return NextResponse.json(
      { message: 'Comment liked successfully' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

async function DELETE(request: NextRequest) {
  const url = new URL(request.url)
  const commentLikeId = url.searchParams.get('commentLikeId')

  if (!commentLikeId) {
    return NextResponse.json(
      { error: 'Comment ID and User ID are required' },
      { status: 400 },
    )
  }

  try {
    await prisma.commentLike.delete({
      where: {
        id: Number(commentLikeId),
      },
    })

    return NextResponse.json(
      { message: 'Comment unliked successfully' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
export { POST, DELETE }
