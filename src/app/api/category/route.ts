import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

async function GET() {
  const mainCategories = await prisma.mainCategory.findMany()
  const subCategories = await prisma.subCategory.findMany()

  const categories = mainCategories.map((mainCategory) => {
    const relatedSubCategories = subCategories.filter(
      (subCategory) => subCategory.mainCategoryId === mainCategory.id,
    )

    return {
      ...mainCategory,
      subCategories: relatedSubCategories,
    }
  })

  return NextResponse.json(
    { message: '로그인 완료', categories },
    { status: 200 },
  )
}

export { GET }
