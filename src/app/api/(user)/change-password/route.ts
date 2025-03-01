/* eslint-disable import/prefer-default-export */
import * as bcrypt from 'bcrypt'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

type PasswordChangeBody = {
  userAuthId: string
  prevPassword: string
  newPassword: string
}

async function PATCH(request: Request) {
  const body: PasswordChangeBody = await request.json()

  const user = await prisma.user.findUnique({
    where: { id: parseInt(body.userAuthId, 10) },
  })

  if (!user) {
    return NextResponse.json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 })
  }

  const isPasswordValid = await bcrypt.compare(body.prevPassword, user.password)
  if (!isPasswordValid) {
    return NextResponse.json({ message: '기존 비밀번호가 잘못되었습니다.' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(body.newPassword, 10)

  await prisma.user.update({
    where: { id: parseInt(body.userAuthId, 10) },
    data: { password: hashedPassword },
  })

  return NextResponse.json({ message: '비밀번호 변경 완료' }, { status: 200 })
}

export { PATCH }
