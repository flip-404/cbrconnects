import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

async function GET() {
  try {
    console.log('prisma.visit', prisma.visit)
    const visit = await prisma.visit.findFirst()
    const testUser = await prisma.userInfo.findFirst()

    // const visit = await prisma.visit.update({
    //   where: {
    //     id: 1,
    //   },
    //   data: {
    //     count: {
    //       increment: 1,
    //     },
    //   },
    // })

    console.log('visit', visit)
    console.log('testUser', testUser)

    return NextResponse.json({ testUser }, { status: 200 })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
export { GET }
