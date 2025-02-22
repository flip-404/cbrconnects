import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function getCommentsBypostId(postId: number) {
  return prisma.comment.findMany({
    where: { postId, parentId: null },
    include: {
      likes: true,
      author: {
        select: { id: true, nickname: true, profileImage: true },
      },
      replies: {
        include: {
          likes: true,
          author: {
            select: { id: true, nickname: true, profileImage: true },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'asc' },
  })
}

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const postId = url.searchParams.get('postId')

  if (!postId) return new NextResponse(JSON.stringify([]), { status: 400 })

  try {
    let comments
    if (postId) {
      comments = await getCommentsBypostId(parseInt(postId, 10))
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

  console.log('\n\n', parentId, '\n\n')

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

  console.log('\n\n', commentId, content, '\n\n')

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
  const url = new URL(request.url)
  const commentId = url.searchParams.get('commentId')

  if (!commentId) {
    return new NextResponse(JSON.stringify({ error: 'Missing commentId' }), {
      status: 400,
    })
  }

  try {
    await prisma.comment.delete({
      where: { id: parseInt(commentId, 10) },
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
