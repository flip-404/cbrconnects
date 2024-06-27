import * as bcrypt from 'bcrypt'
import prisma from '@/libs/prisma'

export interface SignUpForm {
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
}

type RequestBody = SignUpForm

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
    },
  })
  const { password, ...result } = user

  if (user) return new Response(JSON.stringify(result))
  return new Response(JSON.stringify(null))
}

export { POST }
