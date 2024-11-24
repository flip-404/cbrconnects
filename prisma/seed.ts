const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const mainCategories = [
    { name: 'community' },
    { name: 'job' },
    { name: 'market' },
    { name: 'rentshare' },
    { name: 'business' },
  ]

  // Sub Categories
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
  }

  const createdMain = await prisma.mainCategory.create({
    data: { name: 'notice' },
  })

  await prisma.subCategory.create({
    data: {
      name: 'notification',
      mainCategoryId: createdMain.id,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
