/* eslint-disable no-plusplus */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient, MainCategory, SubCategory } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const posts = []
  const now = new Date()
  const oneYearAgo = new Date(now)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  // 무작위 날짜 생성 함수
  function getRandomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    )
  }

  // 무작위 제목 및 내용 생성 함수
  function getRandomText(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  // 게시물 85개 생성
  for (let i = 0; i < 85; i++) {
    const title = `Post Title ${i + 1}`
    const content = `This is the content of post ${i + 1}. ${getRandomText(100)}`

    const thumbnail =
      Math.random() < 0.5
        ? 'https://imagedelivery.net/H829JwCpSRZuNsyFvxdguA/bbd3462c-9ef6-4be1-a01b-1becf4020f00/public'
        : null

    const createdAt = getRandomDate(oneYearAgo, now)

    const isNotice = i < 3

    posts.push({
      title,
      content,
      thumbnail,
      createdAt,
      isNotice,
      mainCategory: MainCategory.community,
      subCategory: SubCategory.freeboard,
      authorId: 22,
      searchTitle: title,
      searchContent: content,
      searchFullText: `${title} ${content}`,
    })
  }

  await prisma.post.createMany({ data: posts })
}

main()
  .then(() => {
    console.log('Seeding completed successfully.')
  })
  .catch((e) => {
    console.error('Seeding failed:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
