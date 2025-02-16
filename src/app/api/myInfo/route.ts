import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const authorId = url.searchParams.get('authorId') as string | undefined
  if (!authorId)
    return new NextResponse(JSON.stringify([]), {
      status: 404,
    })

  try {
    const [posts, comments] = await Promise.all([
      prisma.post.findMany({
        where: {
          authorId: parseInt(authorId, 10),
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.comment.findMany({
        where: {
          authorId: parseInt(authorId, 10),
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      }),
    ])
    return new NextResponse(JSON.stringify({ posts, comments }), {
      status: 200,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ posts: [], comments: [] }), {
      status: 500,
    })
  }
}

async function POST(request: NextRequest) {
  const url = new URL(request.url)
  return new NextResponse(JSON.stringify({ url }), {
    status: 500,
  })
}

export { GET, POST }
