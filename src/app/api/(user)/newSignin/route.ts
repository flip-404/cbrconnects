import { NextResponse } from 'next/server'
import supabase from '@/libs/supabaseClient'

export interface SignInBody {
  email: string
  password: string
}

type RequestBody = SignInBody

async function POST(request: Request) {
  const { email, password }: RequestBody = await request.json()
  const res = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (res)
    return NextResponse.json({ message: '회원가입 완료', res }, { status: 200 })
  return NextResponse.json({ message: '회원가입 실패', res }, { status: 500 })
}

export { POST }
