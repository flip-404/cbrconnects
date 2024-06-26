import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
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
      // 로그인하지 않으면 Token은 null이다!!!!
      // 그럼 구별할 수 있겠다 미들웨어에서. null일때는 그냥 냅두면 되잖아
      // 카카오 로그인 했을 때 accessToken을 박아줄 수 있다.
      // 하지만 ??? -> 추가 정보가 없을 때는 accessToken을 박아주지 않아야 한다.
      // 그리고 나서 나중에 미들웨어로 확인시에 accessToken이 없으면 ?? 추가 보충 업데이트 페이지로가서 회원가입 완료를 해줘야 한다
      // 그리고 나서 다음에 로그인 했을 때는 닉네임으로 찾아야하나.... -> 카카오 ID 3595326584이렇게 있음
      // 아니면 아이디도 받게 해서
      if (token.provider === 'kakao') {
        if (token.userId !== undefined) {
          // 추가 정보가 모두 기입되어 있을 시 로그인 완료
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: token.userId,
              kakaoId: token.id,
              authType: 'kakao',
            }),
          })

          const user = await res.json()
          if (user) {
            return { user, expires: session.expires }
          }
        } else {
          // 추가 정보가 기입되어 있지 않을 시 빈껍데기 로그인
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

        // 후에 추가정보를 입력해서 가입했다고 가정하고, 여기서 아이디가 있으면 아이디랑 일치하는 걸 찾으면 돼
        // 여기서 jwt
      }

      session.user = token as any
      return session
    },
  },
})

export { handler as GET, handler as POST }
