import { signJwtAccessToken } from '@/libs/jwt'
import prisma from '@/libs/prisma'
import * as bcrypt from 'bcrypt'

export interface SignInForm {
  userId: string
  password: string
  authType: 'credentials' | 'kakao' | 'google'
  kakaoId?: string
  googleId?: string
}

type RequestBody = SignInForm

async function POST(request: Request) {
  const body: RequestBody = await request.json()

  if (body.authType === 'credentials') {
    const user = await prisma.user.findFirst({
      where: {
        userId: body.userId,
      },
    })
    if (user && (await bcrypt.compare(body.password, user.password))) {
      const { password, ...userWithoutPass } = user
      const accessToken = signJwtAccessToken(userWithoutPass)
      const result = {
        ...userWithoutPass,
        accessToken,
      }
      return new Response(JSON.stringify(result))
    }
  } else if (body.authType === 'kakao') {
    const user = await prisma.user.findFirst({
      where: {
        userId: body.userId,
        kakaoId: body.kakaoId,
      },
    })
    if (user && (await bcrypt.compare(body.password, user.password))) {
      const { password, ...userWithoutPass } = user
      const accessToken = signJwtAccessToken(userWithoutPass)
      const result = {
        ...userWithoutPass,
        accessToken,
      }
      return new Response(JSON.stringify(result))
    }
  }

  return new Response(JSON.stringify(null))
}

export { POST }
