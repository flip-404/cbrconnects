import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url)

  const page = url.searchParams.get('page') ?? '1'
  const limit = url.searchParams.get('limit') ?? '16'

  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        created_at: 'desc',
      },
      skip: (parseInt(page, 10) - 1) * parseInt(limit, 10),
      take: parseInt(limit, 10),
      select: {
        id: true,
        title: true,
        category: true,
        thumbnail: false,
        created_at: true,
        updated_at: true,
        author_id: true,
        comments: {
          select: {
            id: true,
          },
        },
        author: {
          select: {
            nickname: true,
          },
        },
      },
    })

    const formattedPosts = posts.map((post) => ({
      ...post,
      comment_count: post.comments.length,
      author_name: post.author.nickname,
    }))

    return NextResponse.json({ posts: formattedPosts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export { GET }
