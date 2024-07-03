import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const postId = url.searchParams.get('postId')

  if (!postId) return new NextResponse(JSON.stringify([]), { status: 400 })
  const postIdNumber = parseInt(postId, 10)

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: postIdNumber },
      include: {
        likes: true,
        author: {
          select: { id: true, nickname: true },
        },
        replies: {
          include: {
            author: {
              select: { id: true, nickname: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    return new NextResponse(JSON.stringify(comments), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify([]), { status: 500 })
  }
}

async function POST(request: NextRequest) {
  const body = await request.json()

  const { postId, authorId, content, parentId } = body

  if (!postId || !authorId || !content) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 },
    )
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        postId,
        authorId,
        content,
        parentId: parentId || null, // 부모 댓글이 없는 경우 null로 설정
      },
    })
    return new NextResponse(JSON.stringify(comment), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify([]), { status: 500 })
  }
}
export { GET, POST }
