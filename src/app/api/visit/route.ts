import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

async function GET() {
  try {
    const visit = await prisma.visit.update({
      where: {
        id: 1,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({ visit }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
export { GET }
