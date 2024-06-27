import { signJwtAccessToken } from '@/libs/jwt'
import prisma from '@/libs/prisma'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'

export interface SignInForm {
  userAuthId: string
  userName: string
  password: string
  email: string
  authType: string
  kakaoId?: string
  googleId?: string
}

type RequestBody = SignInForm

async function findUserByCredentials(userAuthId: string, userName: string) {
  return prisma.user.findFirst({
    where: { userAuthId, userName },
  })
}

async function findUserByKakao(userName: string, kakaoId?: string) {
  return prisma.user.findFirst({
    where: { kakaoId, userName },
  })
}

async function findUserByGoogle(
  userName: string,
  email: string,
  googleId?: string,
) {
  return prisma.user.findFirst({
    where: { userName, email, googleId },
  })
}

function createResponse(user: User) {
  const { password, ...userWithoutPass } = user
  const accessToken = signJwtAccessToken(userWithoutPass)
  return new Response(JSON.stringify({ ...userWithoutPass, accessToken }))
}

async function POST(request: Request) {
  const body: RequestBody = await request.json()
  let user

  switch (body.authType) {
    case 'credentials':
      user = await findUserByCredentials(body.userAuthId, body.userName)
      if (user && (await bcrypt.compare(body.password, user.password))) {
        return createResponse(user)
      }
      break

    case 'kakao':
      user = await findUserByKakao(body.userName, body.kakaoId)
      if (user) {
        return createResponse(user)
      }
      break

    case 'google':
      user = await findUserByGoogle(body.userName, body.email, body.googleId)
      if (user) {
        return createResponse(user)
      }
      break

    default:
      return new Response(JSON.stringify(null))
  }

  return new Response(JSON.stringify(null))
}

export { POST }
