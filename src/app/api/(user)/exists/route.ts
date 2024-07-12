// 리턴값 확인 완료
/* eslint-disable import/prefer-default-export */
import client from '@/libs/prisma'

async function GET(request: Request) {
  const url = new URL(request.url)
  const userAuthId = url.searchParams.get('userAuthId')
  const email = url.searchParams.get('email')
  const nickname = url.searchParams.get('nickname')

  let exists
  if (userAuthId) {
    exists = await client.user.findFirst({
      where: { userAuthId },
    })
  } else if (email) {
    exists = await client.user.findFirst({
      where: { email },
    })
  } else if (nickname) {
    exists = await client.user.findFirst({
      where: { nickname },
    })
  }

  return exists
    ? Response.json({ exists: true })
    : Response.json({ exists: false })
}

export { GET }
