/* eslint-disable import/prefer-default-export */
import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

type Catgory = { name: string; categoryId: number }

const fetchPostsByCategories = async (categories: Catgory[], limit: number) => {
  const postsByCategory = await Promise.all(
    categories.map(async ({ categoryId, name }) => {
      const posts = await prisma.post.findMany({
        where: { mainCategoryId: categoryId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: {
          mainCategory: true,
          subCategory: true,
        },
      })
      return { [name]: posts }
    }),
  )

  return Object.assign({}, ...postsByCategory)
}

const fetchAllPosts = async (limit: number) => {
  const allPosts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      mainCategory: true,
      subCategory: true,
    },
  })

  return allPosts
}

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') || '10', 10)

  const categories = [
    { categoryId: 1, name: 'community' },
    { categoryId: 2, name: 'job' },
    { categoryId: 3, name: 'market' },
    { categoryId: 4, name: 'rentshare' },
    { categoryId: 5, name: 'business' },
  ]

  try {
    const [postsByCategory, allPosts] = await Promise.all([
      fetchPostsByCategories(categories, limit),
      fetchAllPosts(limit),
    ])

    console.log('postsByCategory', postsByCategory)
    console.log('allPosts', allPosts)

    return new NextResponse(
      JSON.stringify({ ...postsByCategory, all: allPosts }),
      {
        status: 200,
      },
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch posts' }),
      { status: 500 },
    )
  }
}

export { GET }
