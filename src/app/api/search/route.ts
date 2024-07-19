import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

async function GET() {
  return new NextResponse(JSON.stringify([]), { status: 500 })
}

async function POST(request: NextRequest) {
  const body = await request.json()

  const { searchTerm, searchType } = body

  let posts = []

  switch (searchType) {
    case 'title':
      posts = await prisma.post.findMany({
        where: {
          searchTitle: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        include: {
          author: true,
          comments: true,
          likes: true,
        },
      })
      break
    case 'content':
      posts = await prisma.post.findMany({
        where: {
          searchContent: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        include: {
          author: true,
          comments: true,
          likes: true,
        },
      })
      break
    default:
      posts = await prisma.post.findMany({
        where: {
          searchFullText: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        include: {
          author: true,
          comments: true,
          likes: true,
        },
      })
      break
  }
  return new NextResponse(JSON.stringify(posts), { status: 201 })
}

export { GET, POST }
