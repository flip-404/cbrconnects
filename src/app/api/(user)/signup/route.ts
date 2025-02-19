import * as bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import supabase from '@/libs/supabaseClient'
import prisma from '@/libs/prisma'

export interface SignUpBody {
  email: string
  password: string
  nickname: string
  profileImage: string | null
  provider?: string
}

type RequestBody = SignUpBody

async function POST(request: Request) {
  const { email, password, nickname, profileImage, provider }: RequestBody =
    await request.json()

  if (provider === 'kakao') {
    const res = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    })

    const { data } = await supabase.auth.getUser()
    const session = await supabase.auth.getSession()

    console.log('\n\nres', res, '\n\n')
    console.log('\n\ndata', data, '\n\n')
    console.log('\n\nsession', session, '\n\n')

    return NextResponse.json({ message: '회원가입 완료' }, { status: 200 })
  } else {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname, profile_image: profileImage },
      },
    })
    console.log('email', email)
    console.log('password', password)
    console.log('\n\n', data)
    console.log('\n\n', error)
    if (!error)
      return NextResponse.json({ message: '회원가입 완료' }, { status: 200 })
    else return NextResponse.json({ message: '회원가입 실패' }, { status: 400 })
  }
}
export { POST }
