import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: {
          label: '아이디',
          type: 'text',
        },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: credentials?.userId,
            password: credentials?.password,
            authType: 'credentials',
          }),
        })
        const user = await res.json()

        if (user) {
          return user
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.provider = account.provider
      }
      return { ...token, ...user }
    },

    async session({ session, token }) {
      if (token.provider === 'kakao') {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            kakaoId: token.id,
            userName: token.name,
            authType: 'kakao',
          }),
        })

        const user = await res.json()
        if (user) return { user, expires: session.expires }
        return {
          user: {
            userName: token.name,
            profile: token.picture,
            kakaoId: token.id,
            authType: 'kakao',
          },
          expires: session.expires,
        }
      }
      if (token.provider === 'google') {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: token.name,
            email: token.email,
            googleId: token.id,
            authType: 'google',
          }),
        })

        const user = await res.json()
        if (user) {
          return { user, expires: session.expires }
        }

        return {
          user: {
            userName: token.name,
            email: token.email,
            profile: token.picture,
            googleId: token.id,
            authType: 'google',
          },
          expires: session.expires,
        }
      }

      session.user = token as any
      return session
    },
  },
})

export { handler as GET, handler as POST }
