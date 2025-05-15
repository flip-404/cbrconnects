import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function GET() {
  try {
    const visit = await prisma.visit.update({
      where: { id: 1 },
      data: { count: { increment: 1 } },
    })

    const res = NextResponse.json({ visit }, { status: 200 })

    return res
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export { GET }
