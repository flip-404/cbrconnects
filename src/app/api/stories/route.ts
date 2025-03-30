import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const twentyFourHoursAgo = new Date()
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

    const stories = await prisma.story.findMany({
      where: {
        created_at: {
          gte: twentyFourHoursAgo,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
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

    return NextResponse.json({ stories })
  } catch (error) {
    return NextResponse.json(
      { error: '스토리를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}

async function POST(request: NextRequest) {
  const body = await request.json()
  const { author_id, content, link, image } = body

  if (!author_id) {
    return NextResponse.json({ error: '작성자 ID가 필요합니다.' }, { status: 400 })
  }
  if (!content) {
    return NextResponse.json({ error: '내용이 필요합니다.' }, { status: 400 })
  }

  try {
    const newStory = await prisma.story.create({
      data: {
        author_id,
        content,
        link: link || null,
        image: image || null,
        views: 0,
      },
    })

    return NextResponse.json(
      {
        message: '스토리가 성공적으로 등록되었습니다.',
        story: newStory,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('스토리 생성 오류:', error)
    return NextResponse.json(
      { error: '스토리를 생성하는 중 오류가 발생했습니다.' },
      { status: 500 },
    )
  }
}

export { POST }
