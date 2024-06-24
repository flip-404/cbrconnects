import prisma from '@/libs/prisma'

export interface SignInForm {
  userId: string
  password: string
}

type RequestBody = SignInForm

async function GET(request: Request) {
  const body: RequestBody = await request.json()
}

async function POST(request: Request) {
  const body: RequestBody = await request.json()
}

export { GET, POST }
