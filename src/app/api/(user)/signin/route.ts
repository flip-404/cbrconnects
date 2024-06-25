import { signJwtAccessToken } from '@/libs/jwt'
import prisma from '@/libs/prisma'
import * as bcrypt from 'bcrypt'

export interface SignInForm {
  userId: string
  password: string
}

type RequestBody = SignInForm

async function POST(request: Request) {
  const body: RequestBody = await request.json()

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
  return new Response(JSON.stringify(null))
}

export { POST }
