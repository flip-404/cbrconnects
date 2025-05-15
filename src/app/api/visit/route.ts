import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

async function GET() {
  try {
    const visit = await prisma.visit.update({
      where: { id: 1 },
      data: { count: { increment: 1 } },
    })

    const res = NextResponse.json({ visit }, { status: 200 })

    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.headers.set('Pragma', 'no-cache')
    res.headers.set('Expires', '0')
    res.headers.set('Surrogate-Control', 'no-store')

    return res
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export { GET }
