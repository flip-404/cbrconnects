import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

async function GET(request: Request) {
  const url = new URL(request.url)
  const page = url.searchParams.get('page') ?? '1'
  const limit = url.searchParams.get('limit') ?? '20'

  try {
    const totalCount = await prisma.chat.count()
    const chats = await prisma.chat.findMany({
      orderBy: {
        created_at: 'desc',
      },
      skip: (parseInt(page, 10) - 1) * parseInt(limit, 10),
      take: parseInt(limit, 10),
      select: {
        content: true,
        created_at: true,
        author: {
          select: {
            id: true,
            nickname: true,
            profile_image: true,
          },
        },
      },
    })

    return NextResponse.json({ message: 'CHAT SECCESS', chats, totalCount }, { status: 200 })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

async function POST(request: Request) {
  const body = await request.json()
  const { userId, content } = body
  try {
    await prisma.chat.create({
      data: {
        author_id: userId,
        content,
      },
    })

    return NextResponse.json({ message: 'CHAT SECCESS' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export { GET, POST }
