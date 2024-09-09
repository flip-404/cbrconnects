// 리턴값 확인 완료
import * as bcrypt from 'bcrypt'
import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export interface SignUpBody {
  userAuthId: string
  userName: string
  email: string
  password: string
  passwordCheck: string
  nickname: string
  gender: string
  dateOfBirth: {
    year: string
    month: string
    day: string
  }
  authType: string
  kakaoId: string | null
  googleId: string | null
  profileImage: string | null
}

type RequestBody = SignUpBody

async function POST(request: Request) {
  const body: RequestBody = await request.json()
  const { year, month, day } = body.dateOfBirth
  const dateOfBirth = new Date(`${year}-${month}-${day}`)

  const user = await prisma.user.create({
    data: {
      userAuthId: body.userAuthId,
      userName: body.userName,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      nickname: body.nickname,
      gender: body.gender,
      dateOfBirth,
      kakaoId: body.authType === 'kakao' ? body.kakaoId : null,
      googleId: body.authType === 'google' ? body.googleId : null,
      authType: body.authType,
      profileImage: body.profileImage ? body.profileImage : null,
    },
  })

  if (user)
    return NextResponse.json({ message: '회원가입 완료' }, { status: 200 })
  return NextResponse.json({ message: '회원가입 실패' }, { status: 500 })
}

export { POST }
