import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function POST(request: NextRequest) {
  const body = await request.json()
  const { post_id: postId, author_id: authorId, content, parent_id: parentId } = body

  if (!postId || !authorId || !content) {
    return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        post_id: postId,
        author_id: authorId,
        content,
        parent_id: parentId || null,
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
    return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
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

    return new NextResponse(JSON.stringify({ message: 'Comment deleted successfully' }), {
      status: 200,
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Comment not found or could not be deleted' }),
      { status: 500 },
    )
  }
}

export { POST, PUT, DELETE }
