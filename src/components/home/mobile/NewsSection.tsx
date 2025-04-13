import Link from 'next/link'
import { NewsItem } from '@/app/api/news/route'
import { headers } from 'next/headers'
import { newsSectionStyle } from './MobileHome.css'

export default async function NewsSection() {
  const headersList = headers()
  const host = headersList.get('host') || ''
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const res = await fetch(`${protocol}://${host}/api/news`)
  const data = await res.json()
  const { newsList = [] } = data

  return (
    <ul className={newsSectionStyle.container}>
      {newsList.slice(0, 8).map((news: NewsItem) => (
        <li
          key={news.link}
          className={newsSectionStyle.news}
          style={{
            backgroundImage: `url(${news.image})`,
          }}
        >
          <Link className={newsSectionStyle.link} href={news.link} target="_blank">
            {news.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
