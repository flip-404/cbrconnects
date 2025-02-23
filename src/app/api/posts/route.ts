import prisma from '@/libs/prisma'
import { CategoryType } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest) {
  const url = new URL(request.url)

  const category = url.searchParams.get('category') as CategoryType
  const page = url.searchParams.get('page') ?? '1'

  console.log('\n\ncategory', category)

  if (!category)
    return new NextResponse(
      JSON.stringify({ message: '카테고리가 없습니다.' }),
      { status: 500 },
    )

  try {
    const posts = await prisma.post.findMany({
      where: {
        category: category,
      },
      orderBy: {
        created_At: 'desc',
      },
      skip: (parseInt(page) - 1) * 16,
      take: 16,
      select: {
        id: true,
        title: true,
        content: true,
        view_count: true,
        category: true,
        thumbnail: true,
        created_At: true,
        updated_At: true,
        search_title: true,
        search_content: true,
        search_full_text: true,
        search_author: true,
        author_Id: true,
        comments: {
          select: {
            id: true,
          },
        },
        author: {
          select: {
            nickname: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
      },
    })

    const formattedPosts = posts.map((post) => ({
      ...post,
      comment_count: post.comments.length,
      like_count: post.likes.length,
      author_name: post.author.nickname,
    }))

    return NextResponse.json({ posts: formattedPosts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

async function POST(request: NextRequest) {
  const body = await request.json()
  const { user, title, content, category, thumbnail } = body

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        category: category,
        thumbnail,
        author_Id: user.id,
        search_title: title,
        search_content: content,
        search_full_text: `${title} ${content}`,
        search_author: `${user.nickname}`,
      },
    })

    return new NextResponse(JSON.stringify(post), { status: 201 })
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({ error }), { status: 500 })
  }
}

export { GET, POST }
