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
  const URL =
    'https://www.sbs.com.au/language/korean/ko/collection/news-and-features'

  const { data } = await axios.get(URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    },
  })

  const $ = cheerio.load(data)
  const newsList: NewsItem[] = []

  $('div.SBS_ShelfItem').each((_, element) => {
    const link = $(element).find('a').attr('href')
    if (!link) {
      return
    }

    const title = $(element).find('h3').text().trim()
    let image = $(element).find('img').attr('src')
    const fullLink = link.startsWith('http')
      ? link
      : `https://www.sbs.com.au${link}`
    const fullImage =
      image && !image.startsWith('http')
        ? `https://www.sbs.com.au${image}`
        : image

    if (title && fullLink && fullImage) {
      newsList.push({ title, image: fullImage, link: fullLink })
    }
  })

  return NextResponse.json(
    { message: '뉴스 크롤링 완료', newsList: newsList.slice(0, 10) },
    { status: 200 },
  )
}

export { GET }
