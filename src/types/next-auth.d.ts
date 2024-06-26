import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      email: string
      userName: string
      userId: string
      userGroup: string
      nickname: string
      gender: string
      dateOfBirth: Date
      accessToken: string
      authType: string
      kakaoId: string | null
      googleId: string | null
    }
  }
}
