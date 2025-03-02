/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const posts = []
  for (let i = 0; i < 180; i++) {
    posts.push({
      title: `게시물 제목 ${i + 1}`,
      content: `게시물 내용 ${i + 1}`,
      category: 'FREEBOARD', // 카테고리
      search_title: `search_title ${i + 1}`,
      search_content: `search_content ${i + 1}`,
      search_full_text: `search_full_text ${i + 1}`,
      search_author: 'author_name', // 작성자 이름 (가정)
      author_id: '434a78c9-d652-4ee5-a826-9f87106ca8cc', // 제공된 user ID
    })
  }

  // 게시물 삽입
  await prisma.post.createMany({
    data: posts,
  })

  console.log('게시물 180개가 생성되었습니다!')
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
