import prisma from '@/libs/prisma'
import { CategoryType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const category = url.searchParams.get('category') as CategoryType
  const search_filter = url.searchParams.get('search_filter')
  const search_keyword = url.searchParams.get('search_keyword')

  if (!category)
    return new NextResponse(JSON.stringify({ message: '카테고리가 없습니다.' }), { status: 500 })

  const whereCondition: any = {
    category,
  }

  if (search_filter && search_keyword)
    whereCondition[search_filter] = {
      contains: search_keyword,
      mode: 'insensitive',
    }

  try {
    const totalPosts = await prisma.post.count({
      where: whereCondition,
    })

    return NextResponse.json({ totalPosts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export { GET }
