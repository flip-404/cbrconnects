import prisma from '@/libs/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const searchTerm = url.searchParams.get('searchTerm') || ''
  const searchType = url.searchParams.get('searchType') || 'fulltext'
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '10', 10)

  let posts = []

  const whereQuery: Prisma.PostWhereInput = {
    ...(searchType === 'title' && {
      searchTitle: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    }),
    ...(searchType === 'content' && {
      searchContent: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    }),
    ...(searchType === 'fulltext' && {
      searchFullText: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    }),
  }

  try {
    posts = await prisma.post.findMany({
      where: {
        ...whereQuery,
      },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const totalCount = await prisma.post.count({
      where: {
        ...whereQuery,
      },
    })

    return new NextResponse(JSON.stringify({ posts, totalCount }), {
      status: 200,
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch posts' }),
      { status: 500 },
    )
  }
}

export { GET }
