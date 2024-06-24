/* eslint-disable import/prefer-default-export */
import client from '@/libs/prisma'

async function GET(request: Request) {
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')
  const email = url.searchParams.get('email')
  const nickname = url.searchParams.get('nickname')

  let exists
  if (userId) {
    exists = await client.user.findFirst({
      where: { userId },
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
    ? Response.json({ data: { exists: true } })
    : Response.json({ data: { exists: false } })
}

export { GET }
