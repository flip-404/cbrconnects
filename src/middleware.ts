/* eslint-disable consistent-return */
// import { NextResponse, type NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt'

export async function middleware() {
  // request: NextRequest
  // const token = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET,
  // })
  // if (token === null)
  //   return NextResponse.redirect(new URL('/signin', request.url))
  // if (token && !token.accessToken) {
  //   return NextResponse.redirect(new URL('/complete-profile', request.url))
  //   // return NextResponse.next()
  // }
}

export const config = {
  matcher: ['/write:path*'],
}
