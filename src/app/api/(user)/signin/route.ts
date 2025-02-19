import { NextResponse } from 'next/server'
import supabase from '@/libs/supabaseClient'
import prisma from '@/libs/prisma'

export interface SignInBody {
  email: string
  password: string
}

type RequestBody = SignInBody

async function POST(request: Request) {
  const { email, password }: RequestBody = await request.json()
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // if (user?.id) {
  //   const userInfo = await prisma.userInfo.findUnique({
  //     where: {
  //       id: user?.id,
  //     },
  //   })

  //   if (userInfo)
  //     return NextResponse.json(
  //       { message: '로그인 완료', userInfo: { ...userInfo, email, password } },
  //       { status: 200 },
  //     )
  // }
  return NextResponse.json({ message: '로그인 실패' }, { status: 200 })
}
export { POST }
