import * as bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import supabase from '@/libs/supabaseClient'
import prisma from '@/libs/prisma'

export interface SignUpBody {
  email: string
  password: string
  nickname: string
  profileImage: string | null
}

type RequestBody = SignUpBody

async function POST(request: Request) {
  const { email, password, nickname, profileImage }: RequestBody =
    await request.json()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname, profileImage },
    },
  })

  if (data) {
    const { user } = data
    const { error: profileError } = await supabase
      .from('UserInfo')
      .upsert({ user_id: user?.id, nickname, profileImage })

    if (profileError) {
      console.log('Error inserting profile data:', profileError)
    }

    if (!error)
      return NextResponse.json(
        { message: '회원가입 완료', data },
        { status: 200 },
      )
    return NextResponse.json(
      { message: '회원가입 실패', error },
      { status: 500 },
    )
  }
}
export { POST }
