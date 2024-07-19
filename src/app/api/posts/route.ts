import prisma from '@/libs/prisma'
import { MainCategory, Prisma, SubCategory } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type GetPostQuery = {
  mainCategory?: MainCategory
  subCategory?: SubCategory
  postId?: string
}

const getPostQueryParams = (url: URL): GetPostQuery => {
  const mainCategory = url.searchParams.get('mainCategory') as MainCategory
  const subCategory = url.searchParams.get('subCategory') as SubCategory
  const postId = url.searchParams.get('postId') as string | undefined

  return { mainCategory, subCategory, postId }
}

const fetchPostById = async (postId: number) => {
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

const fetchPosts = async (whereQuery: Prisma.PostWhereInput) => {
  return prisma.post.findMany({
    where: whereQuery,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  })
}

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const { mainCategory, subCategory, postId } = getPostQueryParams(url)
  if (postId) {
    try {
      const postIdNumber = parseInt(postId, 10)
      const post = await fetchPostById(postIdNumber)
      if (!post) {
        return new NextResponse(JSON.stringify({ error: 'Post not found' }), {
          status: 404,
        })
      }

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
    const posts = await fetchPosts(whereQuery)
    return new NextResponse(JSON.stringify(posts), { status: 200 })
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
    console.log(error)
    return new NextResponse(JSON.stringify({ error }), { status: 500 })
  }
}

export { GET, POST }
