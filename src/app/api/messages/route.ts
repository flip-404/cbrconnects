import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const type = url.searchParams.get('type')

    if (!userId || !type) {
      return NextResponse.json({ message: 'userId와 type은 필수 값입니다.' }, { status: 400 })
    }

    if (type === 'received') {
      const receivedMessages = await prisma.message.findMany({
        where: {
          receiver_id: userId,
        },
        include: {
          sender: true,
        },
      })
      return NextResponse.json(receivedMessages, { status: 200 })
    }

    if (type === 'sent') {
      const sentMessages = await prisma.message.findMany({
        where: {
          sender_id: userId,
        },
        include: {
          receiver: true,
        },
      })
      return NextResponse.json(sentMessages, { status: 200 })
    }

    return NextResponse.json({ message: '메시지 조회 중 오류가 발생했습니다.' }, { status: 400 })
  } catch (error) {
    console.error('메시지 조회 중 오류 발생:', error)
    return NextResponse.json({ message: '메시지 조회 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

async function POST(request: Request) {
  try {
    const { content, senderId, receiverId } = await request.json()
    if (!content || !senderId || !receiverId) {
      return NextResponse.json({ message: '필수 값이 누락되었습니다.' }, { status: 400 })
    }

    const newMessage = await prisma.message.create({
      data: {
        content,
        sender_id: senderId,
        receiver_id: receiverId,
      },
    })

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error('메시지 전송 실패:', error)
    return NextResponse.json({ message: '메시지 전송 중 오류가 발생했습니다.' }, { status: 500 })
  }
}

export { GET, POST }
