import { headers } from 'next/headers'
import AnnounceBox from './AnnounceBox'

// 이거 포스트
export default async function AnnounceSection() {
  const headersList = headers()
  const host = headersList.get('host') || ''
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const res = await fetch(`${protocol}://${host}/api/recent`)
  const [noticeRes, promotionRes] = await Promise.all([
    fetch(`${protocol}://${host}/api/posts?category=NOTICE`),
    fetch(`${protocol}://${host}/api/posts?category=PROMOTION`),
  ])

  const [noticeData, promotionData] = await Promise.all([noticeRes.json(), promotionRes.json()])

  return (
    <>
      <AnnounceBox posts={noticeData.posts} label="공지사항" emoji="📋" />
      <AnnounceBox posts={promotionData.posts} label="우리 가게 홍보" emoji="🦘" />
    </>
  )
}
