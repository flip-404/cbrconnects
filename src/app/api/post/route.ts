import { boardLinks } from '@/app/NewComponent/NewHeader'
import prisma from '@/libs/prisma'
import supabase from '@/libs/supabaseClient'
import { userinfo } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

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

export { POST }
