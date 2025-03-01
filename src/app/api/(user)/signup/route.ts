import { NextResponse } from 'next/server'
import supabase from '@/libs/supabaseClient'

export interface SignUpBody {
  email: string
  password: string
  passwordCheck: string
  nickname: string
  profileImage: string | null
  provider?: string
  description?: string
}

type RequestBody = SignUpBody

async function POST(request: Request) {
  const { email, password, nickname, description, profileImage, provider }: RequestBody =
    await request.json()

  if (provider === 'kakao') {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    })

    return NextResponse.json({ message: '회원가입 완료' }, { status: 200 })
  }

  console.log('\n\n\n', description)
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname, profile_image: profileImage, description },
    },
  })
  if (!error) return NextResponse.json({ message: '회원가입 완료' }, { status: 200 })
  console.log(error)
  return NextResponse.json({ message: '회원가입 실패', error }, { status: 400 })
}
export { POST }
