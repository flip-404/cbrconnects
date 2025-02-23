import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

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
  const { post_id, author_id, content, parent_id } = body

  if (!post_id || !author_id || !content) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 },
    )
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        post_id,
        author_id,
        content,
        parent_id: parent_id || null,
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
