import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function getCommentsBypostId(postId: number) {
  return prisma.comment.findMany({
    where: { postId, parentId: null },
    include: {
      likes: true,
      author: {
        select: { id: true, nickname: true },
      },
      replies: {
        include: {
          likes: true,
          author: {
            select: { id: true, nickname: true },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'asc' },
  })
}

async function getCommentsByAuthorId(authorId: number) {
  return prisma.comment.findMany({
    where: { authorId },
    orderBy: { createdAt: 'asc' },
  })
}

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const postId = url.searchParams.get('postId')
  const authorId = url.searchParams.get('authorId')

  if (!postId && !authorId)
    return new NextResponse(JSON.stringify([]), { status: 400 })

  try {
    let comments
    if (postId) {
      comments = await getCommentsBypostId(parseInt(postId, 10))
      return new NextResponse(JSON.stringify(comments), { status: 200 })
    }
    if (authorId) {
      comments = await getCommentsByAuthorId(parseInt(authorId, 10))
      console.log('comments', comments)
      return new NextResponse(JSON.stringify(comments), { status: 200 })
    }
    return new NextResponse(JSON.stringify([]), { status: 400 })
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
        parentId: parentId || null,
      },
    })

    return new NextResponse(JSON.stringify(comment), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify([]), { status: 500 })
  }
}

async function PUT(request: NextRequest) {
  const body = await request.json()
  const { commentId, content } = body

  if (!commentId || !content) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 },
    )
  }

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    })

    return new NextResponse(JSON.stringify(updatedComment), { status: 200 })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Comment not found or could not be updated' }),
      { status: 500 },
    )
  }
}

async function DELETE(request: NextRequest) {
  const body = await request.json()
  const { commentId } = body

  if (!commentId) {
    return new NextResponse(JSON.stringify({ error: 'Missing commentId' }), {
      status: 400,
    })
  }

  try {
    await prisma.comment.delete({
      where: { id: commentId },
    })

    return new NextResponse(
      JSON.stringify({ message: 'Comment deleted successfully' }),
      { status: 200 },
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Comment not found or could not be deleted' }),
      { status: 500 },
    )
  }
}

export { GET, POST, PUT, DELETE }
