import prisma from '@/libs/prisma'
import { CategoryType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const category = url.searchParams.get('category') as CategoryType

  if (!category)
    return new NextResponse(JSON.stringify({ message: '카테고리가 없습니다.' }), { status: 500 })

  try {
    const totalPosts = await prisma.post.count({
      where: {
        category,
      },
    })

    return NextResponse.json({ totalPosts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export { GET }
