/* eslint-disable import/prefer-default-export */
import prisma from '@/libs/prisma'
import { MainCategory } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const fetchPostsByCategories = async (
  categories: MainCategory[],
  limit: number,
) => {
  const postsByCategory = await Promise.all(
    categories.map(async (category) => {
      const posts = await prisma.post.findMany({
        where: { mainCategory: category },
        orderBy: { createdAt: 'desc' },
        take: limit,
      })
      return { [category]: posts }
    }),
  )

  return Object.assign({}, ...postsByCategory)
}

const fetchAllPosts = async (limit: number) => {
  const allPosts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  return allPosts
}

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') || '10', 10)

  const categories: MainCategory[] = ['community', 'job', 'market', 'rentshare']

  try {
    // Execute both fetch functions concurrently
    const [postsByCategory, allPosts] = await Promise.all([
      fetchPostsByCategories(categories, limit),
      fetchAllPosts(limit),
    ])

    postsByCategory.all = allPosts

    return new NextResponse(JSON.stringify(postsByCategory), {
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
