import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

async function GET(request: Request) {}

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
