import Link from 'next/link'
import { GET_Posts } from '@/types/newIndex'
import { AnnounceSectionStyle } from './MobileHome.css'

export default async function AnnounceBox({
  posts,
  label,
  emoji,
}: {
  posts: GET_Posts[]
  label: string
  emoji?: string
}) {
  return (
    <div className={AnnounceSectionStyle.container}>
      <h2 className={AnnounceSectionStyle.label}>
        {emoji}&nbsp;
        {label}
      </h2>

      <ul className={AnnounceSectionStyle.posts}>
        {posts.slice(0, 3).map((post) => (
          <li key={post.id} className={AnnounceSectionStyle.listitem}>
            <Link className={AnnounceSectionStyle.post} href={`/post?postId=${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
