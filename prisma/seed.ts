const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // 1. Main Category 추가
  for (const category of [
    { name: 'community' },
    { name: 'job' },
    { name: 'market' },
    { name: 'rentshare' },
    { name: 'business' },
    { name: 'notice' },
  ]) {
    await prisma.mainCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  // 2. Sub Category 추가
  const subCategories = {
    community: ['freeboard', 'club', 'news', 'yesmigration', 'parcel'],
    job: ['offer', 'search'],
    rentshare: ['rent', 'share'],
    business: [
      'institutions',
      'construction',
      'education',
      'dessert',
      'restaurant',
      'market',
      'marketing',
      'logistics',
      'real_estate',
      'bakery_cafe',
      'beauty',
      'automotive',
      'fitness',
      'clinic',
      'apparel',
    ],
    notice: ['notice', 'event'],
  }

  for (const [mainCategoryName, subCategoryList] of Object.entries(
    subCategories,
  )) {
    const mainCategory = await prisma.mainCategory.findUnique({
      where: { name: mainCategoryName },
    })

    if (mainCategory) {
      for (const subCategoryName of subCategoryList) {
        await prisma.subCategory.upsert({
          where: { name: subCategoryName },
          update: {},
          create: {
            name: subCategoryName,
            mainCategoryId: mainCategory.id,
          },
        })
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
