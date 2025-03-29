import { AnnounceSectionStyle } from './MobileHome.css'
import AnnounceBox from './AnnounceBox'

// 이거 포스트
export default async function AnnounceSection() {
  const [noticeRes, promotionRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?category=NOTICE`),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?category=PROMOTION`),
  ])

  const [noticeData, promotionData] = await Promise.all([noticeRes.json(), promotionRes.json()])

  return (
    <>
      <AnnounceBox posts={noticeData.posts} label="공지사항" emoji="📋" />
      <AnnounceBox posts={promotionData.posts} label="우리 가게 홍보" emoji="🦘" />
    </>
  )
}
