import Link from 'next/link'
import { recentSectionStyle } from './MobileHome.css'
import { GET_Posts } from '@/types/newIndex'
import RecentSectionLinks from './RecentSectionLinks'

export default async function RecentSection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recent`)
  const data = await res.json()
  const { posts = [] } = data

  return (
    <ul className={recentSectionStyle.container}>
      {posts.slice(0, 5).map((post: GET_Posts) => (
        <li key={post.id} className={recentSectionStyle.listitem}>
          <Link href={`/post?postId=${post.id}`} key={post.id} className={recentSectionStyle.post}>
            <div>
              <span className={recentSectionStyle.category}>{post.category}</span>
              <h3 className={recentSectionStyle.title}>{post.title}</h3>
            </div>
            <span className={recentSectionStyle.detail}>
              {post.comment_count} · {post.author_name}
            </span>
          </Link>
        </li>
      ))}
      <RecentSectionLinks />
    </ul>
  )
}
