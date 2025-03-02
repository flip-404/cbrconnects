import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

async function GET(request: Request) {
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')
  if (userId) {
    const user = await prisma.userinfo.findUnique({
      where: { id: userId },
    })
    if (user) {
      return NextResponse.json({ message: '유저 조회 완료', user }, { status: 200 })
    }
  }
  return NextResponse.json({ message: '유저 조회 실패' }, { status: 400 })
}

async function PUT(request: Request) {
  const body = await request.json()
  const { userId, nickname, profileImage, description } = body

  const updatedUser = await prisma.userinfo.update({
    where: { id: userId },
    data: {
      nickname,
      profile_image: profileImage,
      description,
    },
  })
  if (updatedUser) {
    return NextResponse.json({ message: '프로필 수정 완료' }, { status: 200 })
  }
  return NextResponse.json({ message: '프로필 수정 실패' }, { status: 400 })
}
export { GET, PUT }
