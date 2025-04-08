import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: Request) {
  const url = new URL(request.url)
  const storyId = url.searchParams.get('storyId')

  if (!storyId) {
    return NextResponse.json({ error: '스토리 ID가 필요합니다.' }, { status: 400 })
  }

  const comments = await prisma.story_comment.findMany({
    where: { story_id: parseInt(storyId, 10) },
    orderBy: { created_at: 'asc' },
    include: {
      author: {
        select: {
          id: true,
          nickname: true,
          profile_image: true,
        },
      },
    },
  })

  if (comments) return NextResponse.json({ comments }, { status: 201 })
  return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
}

async function POST(request: NextRequest) {
  const body = await request.json()
  const { content, storyId, userId } = body

  if (!content || !storyId || !userId) {
    return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 })
  }

  const comment = await prisma.story_comment.create({
    data: {
      content,
      story_id: storyId,
      author_id: userId,
    },
  })

  if (comment) return NextResponse.json({ comment }, { status: 201 })
  return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
}

export { GET, POST }
