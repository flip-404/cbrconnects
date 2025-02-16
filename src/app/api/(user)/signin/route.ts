import { NextResponse } from 'next/server'
import supabase from '@/libs/supabaseClient'

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

  if (user?.id) {
    const userInfo = await prisma.userInfo.findUnique({
      where: {
        user_id: user?.id,
      },
    })('\n\n', userInfo, '\n\n')

    if (userInfo)
      return NextResponse.json(
        { message: '로그인 완료', userInfo: { ...userInfo, email, password } },
        { status: 200 },
      )
  }
  return NextResponse.json({ message: '로그인 실패', error }, { status: 500 })
}
export { POST }
