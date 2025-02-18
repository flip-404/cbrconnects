import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { NextResponse } from 'next/server'

export type NewsItem = {
  title: string
  image: string
  link: string
}

async function GET() {
  const URL = 'https://www.sbs.com.au/language/korean/ko'

  const { data } = await axios.get(URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    },
  })

  console.log('Crawling data...', data)
  const $ = cheerio.load(data)
  const newsList: NewsItem[] = []

  $("div[data-testid='mock-podcast-episode-card']").each((_, element) => {
    let image = $(element).find('img').attr('src')
    if (!image) {
      return
    }

    const title = $(element).find('h3').text().trim()
    let link = $(element).find('a').attr('href') || ''

    if (link && !link.startsWith('http')) {
      link = `https://www.sbs.com.au${link}`
    }

    if (image && !image.startsWith('http')) {
      image = `https://www.sbs.com.au${image}`
    }

    if (title && link) {
      newsList.push({ title, image, link })
    }

    console.log('Title:', title)
    console.log('Image:', image)
    console.log('Link:', link)
  })

  return NextResponse.json(
    { message: '뉴스 크롤링 완료', newsList: newsList.slice(0, 10) },
    { status: 200 },
  )
}

export { GET }
