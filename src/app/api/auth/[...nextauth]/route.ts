import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'
import GoogleProvider from 'next-auth/providers/google'

const authorizeUser = async (credentials: any, authType: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userAuthId: credentials?.userAuthId,
      password: credentials?.password,
      authType,
    }),
  })
  return res.json()
}

const fetchUser = async (token: any, authType: string, additionalData: any) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...additionalData,
      authType,
    }),
  })
  return res.json()
}

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
        userAuthId: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials, req) {
        return authorizeUser(credentials, 'credentials')
      },
    }),
  ],
  pages: { signIn: '/signin' },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.provider = account.provider
      }
      return { ...token, ...user }
    },
    async session({ session, token }) {
      if (token.provider === 'credentials') {
        session.user = token as any
        return session
      }

      let user
      if (token.provider === 'kakao') {
        user = await fetchUser(token, 'kakao', {
          kakaoId: token.id,
          userName: token.name,
        })
      } else if (token.provider === 'google') {
        user = await fetchUser(token, 'google', {
          userName: token.name,
          email: token.email,
          googleId: token.id,
        })
      }

      if (user) {
        return { user, expires: session.expires }
      }

      return {
        user: {
          userName: token.name,
          profile: token.picture,
          ...(token.provider === 'kakao'
            ? { kakaoId: token.id }
            : { googleId: token.id, email: token.email }),
          authType: token.provider,
        },
        expires: session.expires,
      }
    },
  },
})

export { handler as GET, handler as POST }
