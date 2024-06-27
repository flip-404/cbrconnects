import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const mainCategory = url.searchParams.get('mainCategory')
  const subCategory = url.searchParams.get('subCategory')

  let whereQuery = {}

  if (mainCategory && subCategory) {
    whereQuery = {
      mainCategory,
      subCategory,
    }
  } else if (mainCategory) {
    whereQuery = {
      mainCategory,
    }
  }

  const posts = await prisma.post.findMany({
    where: whereQuery,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      comments: true,
      likes: true,
    },
  })

  return new NextResponse(JSON.stringify(posts), { status: 200 })
}

async function POST(request: NextRequest) {
  const body = await request.json()

  const {
    title,
    content,
    userId,
    mainCategory,
    subCategory,
    thumbnail,
    isNotice,
  } = body

  if (!title || !content || !userId || !mainCategory) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
    })
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,
        mainCategory,
        subCategory,
        thumbnail,
        isNotice,
      },
    })
    return new NextResponse(JSON.stringify(post), { status: 201 })
  } catch (error) {
    console.error(error)
    return new NextResponse(
      JSON.stringify({ error: 'Failed to create post' }),
      {
        status: 500,
      },
    )
  }
}

export { GET, POST }
