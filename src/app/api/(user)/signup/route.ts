import * as bcrypt from 'bcrypt'
import prisma from '@/libs/prisma'

export interface SignUpForm {
  userId: string
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
}

type RequestBody = SignUpForm

async function POST(request: Request) {
  const body: RequestBody = await request.json()
  const { year, month, day } = body.dateOfBirth
  const dateOfBirth = new Date(`${year}-${month}-${day}`)

  try {
    const user = await prisma.user.create({
      data: {
        userId: body.userId,
        userName: body.userName,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        nickname: body.nickname,
        gender: body.gender,
        dateOfBirth,
      },
    })
    const { password, ...result } = user
    return new Response(JSON.stringify(result))
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: (error as Error).message,
        stack: (error as Error).stack,
      }),
      { status: 500 },
    )
  }
}

export { POST }
