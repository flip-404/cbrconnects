import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  if (token === null) return NextResponse.next()
  if (token && !token.accessToken) {
    console.log('카카오 이지만 accessToken이 없습니다')
    return NextResponse.redirect(new URL('/complete-profile', request.url))
    // return NextResponse.next()
  }

  // 추가 정보 입력창
  // return NextResponse.redirect(new URL('/signin', request.url))
}

export const config = {
  matcher: ['/write:path*'],
}
