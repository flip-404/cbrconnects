import prisma from '@/libs/prisma'
import { MainCategory, Prisma, SubCategory } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type GetPostQuery = {
  mainCategory?: MainCategory
  subCategory?: SubCategory
  postId?: string
  authorId?: string
}

const getPostQueryParams = (url: URL): GetPostQuery => {
  const mainCategory = url.searchParams.get('mainCategory') as MainCategory
  const subCategory = url.searchParams.get('subCategory') as SubCategory
  const postId = url.searchParams.get('postId') as string | undefined

  return { mainCategory, subCategory, postId }
}

const fetchPostByPostId = async (postId: number) => {
  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  })

  return updatedPost
}

const fetchPosts = async (
  whereQuery: Prisma.PostWhereInput,
  page: number,
  limit: number,
) => {
  return prisma.post.findMany({
    where: whereQuery,
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  })
}

const fetchPostCount = async (whereQuery: Prisma.PostWhereInput) => {
  return prisma.post.count({
    where: whereQuery,
  })
}

async function GET(request: NextRequest) {
  const startTime = performance.now()
  console.log('엥')

  const url = new URL(request.url)
  const { mainCategory, subCategory, postId } = getPostQueryParams(url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '40', 10)

  if (postId) {
    try {
      const postIdNumber = parseInt(postId, 10)
      const post = await fetchPostByPostId(postIdNumber)
      if (!post) {
        return new NextResponse(JSON.stringify({ error: 'Post not found' }), {
          status: 404,
        })
      }
      const endTime = performance.now()
      console.log(`fetchPosts duration: ${endTime - startTime} ms`)
      console.log('뭐여')
      return new NextResponse(JSON.stringify(post), { status: 200 })
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: 'Failed to fetch post' }),
        { status: 500 },
      )
    }
  }

  const whereQuery: Prisma.PostWhereInput = {
    ...(mainCategory ? { mainCategory } : {}),
    ...(subCategory ? { subCategory } : {}),
  }

  try {
    const posts = await fetchPosts(whereQuery, page, limit)
    const totalCount = await fetchPostCount(whereQuery)

    return new NextResponse(JSON.stringify({ posts, totalCount }), {
      status: 200,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify([]), { status: 500 })
  }
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
    return new NextResponse(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 },
    )
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
        mainCategory,
        subCategory,
        thumbnail,
        isNotice,
        searchTitle: title,
        searchContent: content,
        searchFullText: `${title} ${content}`,
      },
    })
    return new NextResponse(JSON.stringify(post), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 })
  }
}

async function PUT(request: NextRequest) {
  const body = await request.json()

  const {
    postId,
    title,
    content,
    userId,
    mainCategory,
    subCategory,
    thumbnail,
    isNotice,
  } = body

  if (!title || !content || !userId || !mainCategory || !postId) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 },
    )
  }

  try {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        title,
        content,
        authorId: userId,
        mainCategory,
        subCategory,
        thumbnail,
        isNotice,
        searchTitle: title,
        searchContent: content,
        searchFullText: `${title} ${content}`,
      },
    })
    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 })
  }
}

async function DELETE(request: NextRequest) {
  const body = await request.json()

  const { postId } = body

  if (!postId) {
    return new NextResponse(JSON.stringify({ error: 'Missing postId' }), {
      status: 400,
    })
  }

  try {
    await prisma.post.delete({
      where: { id: Number(postId) },
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to delete post' }),
      {
        status: 500,
      },
    )
  }
}

export { GET, POST, PUT, DELETE }
