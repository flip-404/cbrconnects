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

  for (const main of mainCategories) {
    const createdMain = await prisma.mainCategory.create({
      data: { name: main.name },
    })

    const subs = subCategories[main.name as keyof typeof subCategories]
    if (subs) {
      for (const sub of subs) {
        await prisma.subCategory.create({
          data: {
            name: sub,
            mainCategoryId: createdMain.id,
          },
        })
      }
    }
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
